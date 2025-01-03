export interface CartItem extends Product {
  quantity: number;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}
