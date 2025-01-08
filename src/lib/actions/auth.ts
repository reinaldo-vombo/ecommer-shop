'use server';

import { prisma } from '../db/client';
import bcrypt from 'bcrypt';
import { transporter } from '../smtp/config';
import { render } from '@react-email/render';
import ResetPasswordEmail from '@/lib/email/ResetPassword';
import React from 'react';
import { TState } from '../types';
import { resetPasswordSchema } from '../validation/auth';
import { registerSchema } from '../validation/auth';
import { z } from 'zod';

type Data = z.infer<typeof registerSchema>;

export async function register(prevState: TState, data: Data) {
  const { email, name, roleId, password, confirmPassword } = data;

  if (!name && !email && !password && confirmPassword) {
    return {
      error: true,
      status: 404,
      message: 'Por-favor preencha todos os campos',
    };
  }
  if (password !== confirmPassword) {
    return {
      error: true,
      status: 404,
      message: 'As palavra-passe não combinam',
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.customers.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: roleId || 4,
      },
    });
    // redirect('/');
    return {
      sucess: true,
      status: 200,
      message: 'Conta criada com sucesso',
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: 'Ocorreu um erro ao cadastrar',
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
    const user = await prisma.users.findUnique({
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
    const user = await prisma.users.findFirst({
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
