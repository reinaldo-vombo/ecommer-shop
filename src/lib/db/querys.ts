import { prisma } from './client';

export const getProducts = async () => {
  const posts = await prisma.products.findMany({});
  return posts;
};

// Sigle product by id
export const getProductById = async (id: string) => {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
export const getWishistProduct = async (productIds: string[]) => {
  const favorite = await prisma.products.findMany({
    where: {
      id: { in: productIds },
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });
  return favorite;
};
