import { TProduct } from '@/components/shared/product/types';

export interface CartItem extends TProduct {
  quantity: number;
}
