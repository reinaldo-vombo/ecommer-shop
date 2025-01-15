'use server';

import React from 'react';
import { z } from 'zod';
import { transporter } from '../smtp/config';
import { prisma } from '../db/client';
import ResetPasswordEmail from '../email/ResetPassword';
import { TState } from '../types';
import { render } from '@react-email/components';
// import { writeFile, mkdir, access, constants } from 'fs/promises';
// import { storage } from '@/lib/firebase';
// import { join } from 'path';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import bcrypt from 'bcrypt';
import { resetPasswordSchema } from '../validation/auth';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/config';
import { customerPasswordSchema, customerSchema } from '../validation/customer';
// import { PATH } from '../helper';
import cloudinary from '../storege/cloudinary';

type UpdateData = z.infer<typeof customerSchema>;
type UpdatePass = z.infer<typeof customerPasswordSchema>;

async function uploadToCloudinary(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'users' }, // Optional: Organize files in a folder
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image to Cloudinary'));
          } else {
            resolve(result?.secure_url || '');
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Error in uploadToCloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}
// async function saveFileLocally(file: File): Promise<string> {
//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const uploadDir = join(process.cwd(), 'uploads');
//   try {
//     await access(uploadDir, constants.F_OK);
//   } catch {
//     await mkdir(uploadDir, { recursive: true });
//   }

//   const filePath = join(uploadDir, file.name);
//   await writeFile(filePath, buffer);
//   return `${PATH}${file.name}`;
// }
async function saveFile(file: File): Promise<string> {
  return uploadToCloudinary(file);
  // return saveFileLocally(file);
}

export async function updateCustomer(prevState: TState, Data: UpdateData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      error: true,
      status: 404,
      message: 'Não autorizado',
    };
  }
  const { name, email, avatar } = Data;
  //stpe to handle file in production and development

  try {
    let avatarUrl: string | undefined;

    if (avatar && avatar[0]) {
      const file = avatar[0] as File;
      avatarUrl = await saveFile(file);
    }

    const customer = await prisma.customers.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        ...(avatarUrl && { avatar: avatarUrl }),
      },
    });
    revalidatePath('/');
    return {
      sucess: true,
      status: 200,
      message: 'Dados atualizados',
      fields: customer, 
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: 'Oucorreu um erro ao atualizar',
    };
  }
}
export async function updateCustomerPassWord(
  prevState: TState,
  Data: UpdatePass
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      error: true,
      status: 404,
      message: 'Não autorizado',
    };
  }
  const { new_password, old_password } = Data;
  if (old_password !== new_password) {
    return {
      error: true,
      status: 401,
      message: 'As palavra-passe não coincidem',
    };
  }
  const hashedPassword = await bcrypt.hash(new_password, 10);

  try {
    await prisma.customers.update({
      where: { id: session.user.id },
      data: {
        name: session.user.name,
        email: session.user.email,
        password: hashedPassword,
      },
    });
    revalidatePath('/');
    return {
      sucess: true,
      status: 200,
      message: 'Dados atualizados',
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: 'Oucorreu um erro ao atualizar',
    };
  }
}

export async function recoverPassword(prevState: TState, data: FormData) {
  const email = data.get('email')?.toString();
  if (!email) {
    return {
      error: true,
      status: 404,
      message: 'O email é obrigatório',
    };
  }

  try {
    // Check if the email belongs to a user
    const user = await prisma.customers.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        error: true,
        status: 404,
        message: 'O email não pertence a nenhum usuário',
      };
    }
    const confirmationCode = Math.floor(
      10000 + Math.random() * 90000
    ).toString();
    const codeExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.users.update({
      where: { id: user.id },
      data: { confirmationCode, codeExpiresAt },
    });
    const emailHtml = render(
      React.createElement(ResetPasswordEmail, {
        name: user.name,
        otpCode: confirmationCode,
      })
    );

    // Send the recovery email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: process.env.SMTP_SUBJECT || 'Password Recovery',
      html: await emailHtml,
    });

    console.log('Email sent: ', info.messageId);

    return {
      success: true,
      status: 200,
      message: 'Email enviado com sucesso, verifique a sua caixa de entrada',
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Failed to create content interaction:', error);
    }
    console.log(error);
    return {
      error: true,
      status: 500,
      message: 'Ocorreu um erro inesperado',
    };
  }
}
export async function resetPassword(prevState: TState, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = resetPasswordSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      error: true,
      status: 404,
      message: 'Codigo invalido',
    };
  }
  const { code, newPassword, confirmPassword } = parsed.data;

  if (newPassword !== confirmPassword) {
    return {
      error: true,
      status: 404,
      message: 'As palavras-passe não coincidem',
      fields: parsed.data,
    };
  }
  try {
    // Find the user by confirmation code and ensure it's valid
    const user = await prisma.customers.findFirst({
      where: {
        confirmationCode: code,
        codeExpiresAt: { gte: new Date() }, // Ensure code hasn't expired
      },
    });

    if (!user) {
      return {
        error: true,
        status: 404,
        message: 'Código inválido ou expirado',
      };
    }

    // Hash the new password securely
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the confirmation code
    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        confirmationCode: null,
        codeExpiresAt: null,
      },
    });

    return {
      success: true,
      status: 200,
      message: 'Palavra-passe alterada com sucesso',
    };
  } catch (error) {
    console.error('Error resetting password:', error);
    return {
      error: true,
      status: 500,
      message: 'Ocorreu um erro inesperado',
    };
  }
}
