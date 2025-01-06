import { prisma } from './client';

export const getProducts = async () => {
  const products = await prisma.products.findMany({});
  return products.map((product) => ({
    ...product,
    style:
      typeof product.style === 'string'
        ? JSON.parse(product.style)
        : product.style,
    size:
      typeof product.size === 'string'
        ? JSON.parse(product.size)
        : product.size,
    category:
      typeof product.category === 'string'
        ? JSON.parse(product.category)
        : product.category,
    images:
      typeof product.images === 'string'
        ? JSON.parse(product.images)
        : product.images,
  }));
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

  return {
    ...product,
    style:
      typeof product.style === 'string'
        ? JSON.parse(product.style)
        : product.style,
    size:
      typeof product.size === 'string'
        ? JSON.parse(product.size)
        : product.size,
    category:
      typeof product.category === 'string'
        ? JSON.parse(product.category)
        : product.category,
    images:
      typeof product.images === 'string'
        ? JSON.parse(product.images)
        : product.images,
  };
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
