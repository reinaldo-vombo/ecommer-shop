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
