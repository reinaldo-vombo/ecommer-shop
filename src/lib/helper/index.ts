export const PATH = '/api/uploads/';

export const getPriceRange = (price: string | null) => {
  switch (price) {
    case 'low':
      return [0, 10000];
    case 'mid':
      return [11000, 19000];
    case 'high':
      return [19000, Infinity];
    default:
      return [0, Infinity]; // Default to all products if no price filter is applied
  }
};
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
};
// //add product to wishlist
// export const addToWishlist = async (customerId: string, productId: string) => {
//   const response = await fetch('/api/customers/wishlist', {
//     method: 'POST',
//     body: JSON.stringify({ customerId, productId }),
//   });

//   const data = await response.json();
//   if (!data.success) {
//     console.error(data.error);
//   }
// };
// //add product to wishlist
// export const addToCart = async (customerId: string, productId: string) => {
//   const response = await fetch('/api/customers/cart', {
//     method: 'POST',
//     body: JSON.stringify({ customerId, productId }),
//   });

//   const data = await response.json();
//   if (!data.success) {
//     console.error(data.error);
//   }
// };
