import { JsonValue } from '@prisma/client/runtime/library';

export type TProduct = {
  id: string;
  name: string;
  gender: string;
  brand: string;
  stock: number | null;
  // style: string[];
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
  comment: string | null;
  stars: number;
  date: string;
  customerName: string;
};
export type SigleProductProps = {
  product: TProduct;
  reviews: TReviwes[];
  relatedProducts: any[];
};
export type TProductModal = {
  title: string;
  price: number;
  image: string;
  description: string;
};
