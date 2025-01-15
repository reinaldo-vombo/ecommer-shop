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
    style: Array.isArray(product.style) ? (product.style as string[]) : [],
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
export const getProductReviews = async (productId: string) => {
  try {
    const reviews = await prisma.reviews.findMany({
      where: { productId },
      include: {
        customer: true, // Include related customer data
      },
    });
  
    return reviews.map((review) => ({
      id: review.id,
      comment: review.comment,
      stars: review.stars,
      date: new Date(review.createdAt).toLocaleDateString('pt-BR'),
      customerName: review.customer.name, // Assuming customer has a `name` field
    }));
  } catch (error) {
    console.error('Error fetching product from server reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
}
export const getRelatedProducts = async (
  productId: string,
  productType: string,
  productBrand: string
) => {
  console.log(productId, productType, productBrand);
  
  const relatedProducts = await prisma.products.findMany({
    where: {
      // type: productType, 
      brand: productBrand,
      id: {
        not: productId, 
      },
    },
    take: 4,
  });

  return relatedProducts;
};
// export const getWishistProduct = async (productIds: string[]) => {
//   const favorite = await prisma.products.findMany({
//     where: {
//       id: { in: productIds },
//     },
//     select: {
//       id: true,
//       name: true,
//       price: true,
//       image: true,
//     },
//   });
//   return favorite;
// };

