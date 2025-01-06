import { JsonValue } from '@prisma/client/runtime/library';

export type TProduct = {
  id: string;
  name: string;
  gender: string;
  brand: string;
  stock: number | null;
  style: string[];
  size: number[];
  // type: string;
  category: string[];
  price: number;
  type: string | null;
  gallery: JsonValue;
  image: string;
  images: {
    color: string;
    images: string[];
  }[];
  description: string;
  details: string | null;
  Reviews?: TReviwes[];
};

export type TProductProps = {
  props: TProduct;
};
export type TReviwes = {
  id: string;
  productId: string;
  product: string;
  customerId: string;
  customer: string;
  comment?: string;
  stars: number;
  createdAt: Date;
};
export type TProductModal = {
  title: string;
  price: number;
  image: string;
  description: string;
};
