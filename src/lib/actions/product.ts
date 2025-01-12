'use server';

import { z } from 'zod';
import { productSchema, updateProductSchema } from '../validation/product';
import { access, constants, unlink } from 'fs/promises';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { TState, TUpadateState } from '../types';
import { revalidatePath } from 'next/cache';
import { prisma } from '../db/client';
import { join } from 'path';
import { saveFile, saveFileLocally, uploadToCloudinary } from '../helper';

type ProductImage = {
  images: {
    color: string;
    images: string[];
  };
};
const PATH = '/api/uploads/';
type FeatureData = z.infer<typeof productSchema>;
type UpadateData = z.infer<typeof updateProductSchema>;

export async function createProduct(prevState: TState, data: FeatureData) {
  const price = parseFloat(data.price);
  const stock = parseInt(data.stock || '');
  if (isNaN(price)) {
    return {
      error: true,
      status: 400,
      message: 'Invalid price value. Must be a number.',
    };
  }
  if (!data.image || data.image.length === 0) {
    return {
      error: true,
      status: 400,
      message: 'Nenhum ficheiro carregado',
    };
  }

  console.log('data', data);
  try {
    const file = data.image[0] as File;
    const fileUrl = await saveFile(file);

    // Step 2: Save images in the colors array
    const updatedColors = [];
    for (const colorEntry of data.colors) {
      const { color, images } = colorEntry;

      if (!images || images.length === 0) {
        continue; // Skip if no images exist for this color
      }

      const savedImages = [];
      for (const imageFile of images as unknown as File[]) {
        try {
          const imageUrl = await saveFile(imageFile);
          savedImages.push(imageUrl);
        } catch (err) {
          console.error(`Failed to upload image for color ${color}`, err);
          return {
            error: {
              error: true,
              status: 404,
              message: `Failed to upload an image for color ${color}`,
            },
          };
        }
      }

      updatedColors.push({
        color,
        images: savedImages,
      });
    }
    await prisma.products.create({
      data: {
        name: data.name,
        description: data.description || '',
        image: fileUrl,
        images: updatedColors,
        status: 'Publicado',
        gender: data.gender,
        size: data.sizes as InputJsonValue,
        details: data.details,
        price,
        stock,
        brand: data.brand,
        category: data.category,
      },
    });
    revalidatePath('/');
    return {
      success: true,
      status: 200,
      message: 'Producto publicado',
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: 'Ocorreu um error ao publicar o producto',
    };
  }
}

export async function updateProduct(
  prevState: TUpadateState,
  data: UpadateData,
  id: string
) {
  const price = parseFloat(data.price);
  if (isNaN(price)) {
    return {
      error: true,
      status: 400,
      message: 'Invalid price value. Must be a number.',
    };
  }

  try {
    let fileUrl: string;

    if (typeof data.image === 'string') {
      // If image is already a URL, use it directly
      fileUrl = data.image;
    } else if (data.image && data.image[0]) {
      // If image is a file, process it
      const file = data.image[0] as File;
      // Save the file based on the environment
      fileUrl =
        process.env.NODE_ENV === 'production'
          ? await uploadToCloudinary(file)
          : await saveFileLocally(file);
    } else {
      return {
        error: true,
        status: 400,
        message: 'No image provided',
      };
    }

    // Step 2: Save images in the colors array
    const updatedColors = [];
    for (const colorEntry of data.colors) {
      const { color, images } = colorEntry;

      if (!images || images.length === 0) {
        continue; // Skip if no images exist for this color
      }

      const savedImages = [];
      for (const imageFile of images as unknown as (File | string)[]) {
        if (typeof imageFile === 'string') {
          savedImages.push(imageFile);
        } else {
          try {
            const imageUrl =
              process.env.NODE_ENV === 'production'
                ? await uploadToCloudinary(imageFile)
                : await saveFileLocally(imageFile);

            savedImages.push(imageUrl);
          } catch (err) {
            console.error(`Failed to upload image for color ${color}`, err);
            return {
              error: {
                error: true,
                status: 404,
                message: `Failed to upload an image for color ${color}`,
              },
            };
          }
        }
      }

      updatedColors.push({
        color,
        images: savedImages,
      });
    }

    await prisma.products.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || '',
        image: fileUrl,
        images: updatedColors,
        status: 'Publicado',
        gender: data.gender,
        size: data.sizes as InputJsonValue,
        details: data.details,
        price,
        brand: data.brand,
        category: data.category,
      },
    });
    revalidatePath('/');
    return {
      success: true,
      status: 200,
      message: 'Producto atualizado',
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: 'Ocorreu um error ao publicar o producto',
    };
  }
}
export async function deleteProduct(prevState: TState, id: string) {
  if (!id) {
    return {
      error: true,
      message: 'Este produto não existe',
    };
  }

  try {
    // Step 1: Fetch the product from the database
    const product = await prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      return {
        error: true,
        message: 'Produto não encontrado',
      };
    }

    // Step 2: Define a function to delete a file from the uploads folder
    async function deleteFile(filePath: string) {
      const fullPath = join(process.cwd(), 'uploads', filePath);
      try {
        // Check if the file exists before attempting to delete
        await access(fullPath, constants.F_OK);
        await unlink(fullPath); // Delete the file
        console.log(`Deleted file: ${fullPath}`);
      } catch (err) {
        console.warn(`Failed to delete file: ${fullPath}`, err);
      }
    }

    // Step 3: Delete the main product image
    if (product.image) {
      const mainImagePath = product.image.replace(`${PATH}`, ''); // Remove base path to get relative path
      await deleteFile(mainImagePath);
    }

    // Step 4: Delete images in the nested colors array structure
    if (product.images && Array.isArray(product.images)) {
      const imagesArray = product.images as ProductImage[];
      for (const colorEntry of imagesArray) {
        const { images } = colorEntry;

        if (images && Array.isArray(images)) {
          for (const imagePath of images) {
            if (imagePath) {
              const relativePath = imagePath.replace(`${PATH}`, ''); // Remove base path to get relative path
              await deleteFile(relativePath);
            }
          }
        }
      }
    }

    // Step 5: Delete the product from the database
    await prisma.products.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Produto excluir com sucesso',
    };
  } catch (error) {
    console.error('Erro ao excluir o produto:', error);
    return {
      error: true,
      message: 'Erro ao excluir o produto',
    };
  }
}
