import React from "react";
import { ArrowUpDown, BookCheck, DollarSign, ShoppingBag } from 'lucide-react';
import { AdidasLogo, ConversLogo, NDLogo, NikeLogo, PumaLogo } from "@/assets/logos";

export const OVERVIEWS = [
   {
      id: '1',
      title: 'Orcamento ',
      total: 32499.0,
      new: 12.9,
      icon: React.createElement(DollarSign),
   },
   {
      id: '2',
      title: 'Productos',
      total: 32499.0,
      new: 12.9,
      icon: React.createElement(ShoppingBag),
   },
   {
      id: '3',
      title: 'Encomendas',
      total: 32499.0,
      new: 12.9,
      icon: React.createElement(BookCheck),
   },
   {
      id: '4',
      title: 'Rembolso',
      total: 32499.0,
      new: 12.9,
      icon: React.createElement(ArrowUpDown),
   },
];
export const NAV_ITEMS = [
   {
      shoes: [
         { id: 1, name: 'Todos os tenis', query: 'type=sapatos' },
         { id: 2, name: 'Estilo de vida', query: 'type=stilo-de-vida' },
         { id: 3, name: 'Corrida', query: 'type=corrida' },
         { id: 4, name: 'Footbol', query: 'type=football' },
         { id: 5, name: 'Basktbol', query: 'type=basketball' },
         { id: 6, name: 'Basktbol', query: 'type=treino-&-GYM' },
      ],
   },
   {
      close: [
         { id: 1, name: 'Todos os vestuários', query: 'type=todos' },
         { id: 2, name: 'Camisola', query: 'type=camisola' },
         { id: 3, name: 'Camisa', query: 'type=camisa' },
         { id: 4, name: 'Camisola de capuz', query: 'type=capuz' },
         { id: 5, name: 'Calças e legging', query: 'type=calsao' },
         { id: 6, name: 'Casacos', query: 'type=casacos' },
      ],
   },
   {
      acessories: [
         { id: 1, name: 'Todos os acessorios', query: 'type=all' },
         { id: 2, name: 'Meias', query: 'type=socks' },
         { id: 3, name: 'Muchilas e pasta', query: 'type=bags' },
         { id: 4, name: 'Chapeus', query: 'type=hats' },
         {
            id: 5,
            name: 'Equipamento desportivo',
            query: 'type=sport-equipmente',
         },
      ],
   },
];
export const GENDER = [
   { id: 1, name: 'Homem', value: 'Homem' },
   { id: 2, name: 'Mulher', value: 'Mulher' },
   { id: 3, name: 'Unisex', value: 'Unisex' },
   { id: 4, name: 'Criança', value: 'Criança' },
];
export const CATEGORIES = [
   { id: 1, name: 'Stilo de vida', value: 'stilo-de-vida' },
   { id: 2, name: 'Corrida', value: 'corrida' },
   { id: 3, name: 'Football', value: 'football' },
   { id: 4, name: 'Basketball', value: 'basketball' },
   { id: 5, name: 'Treino & GYM', value: 'treino-&-GYM' },
];
export const BRAND = [
   { id: 1, name: 'Nike', value: 'Nike' },
   { id: 2, name: 'Converse', value: 'Converse' },
   { id: 3, name: 'Adidas', value: 'Adidas' },
   { id: 4, name: 'Puma', value: 'Puma' },
   { id: 5, name: 'Nd', value: 'Nd' },
];
export const SIZES_NUMBER = [
   4, 4.5, 5, 5.5, 6,
   6.5, 7, 7.5, 8, 8.5,
   9, 9.5, 10, 10.5, 11,
   11.5, 12, 12.5, 13, 13.5,
   14, 14.5, 15, 15.5,
];
export const COLORES = [
   { id: 1, value: '#fff', name: 'Branco' },
   { id: 2, value: '#000', name: 'Preto' },
   { id: 3, value: '#1809e8', name: 'Azul' },
];
export const PRODUCT_TYPE = [
   { id: 1, value: 'Sapatos', name: 'Sapatos/Tenis' },
   { id: 2, value: 'Acessorios', name: 'Acessorios' },
   { id: 3, value: 'Roupas', name: 'Roupas' },
];
export const STATUS = [
   { id: 1, name: 'Publicado', value: 'Publicado' },
   { id: 2, name: 'Não Publicado', value: 'Não Publicado' },
];
export const initialState = {
   message: '',
   error: false,
   status: 0,
   success: undefined,
   fields: undefined,
   issues: []
}
export const SORT_ITEM = [
   { id: '1', name: 'Nome', key: 'name', query: 'sort_name' },
   { id: '2', name: 'Preço', key: 'price', query: 'sort_price' },
   { id: '3', name: 'Vendidos', key: 'sold', query: 'sort_sold' },
   { id: '4', name: 'Rembolsado', key: 'returned', query: 'sort_returned' },
]
export const FILTER_ITEMS = [
   { id: '1', name: 'Todos', key: 'all' },
   { id: '2', name: 'Novos', key: 'new' },
   { id: '3', name: 'Mais vendidos', key: 'mostSold' },
   { id: '4', name: 'Rembolsados', key: 'returned' },
]
export const SIZES = [
   "4", "4.5", "5", "5.5", "6",
   "6.5", "7", "7.5", "8", "8.5",
   "9", "9.5", "10", "10.5", "11",
   "11.5", "12", "12.5", "13", "13.5",
   "14", "14.5", "15", "15.5"
]
export const C_SIZES = ['sm', 'md', 'lg', 'xxl'];
export const PRICE = [
   { id: 1, name: 'Alto', value: 'high' },
   { id: 2, name: 'Medio', value: 'mid' },
   { id: 3, name: 'baixos', value: 'low' },
]
export const BRANDS_LOGOS = [
   { id: '1', value: 'Nike', logo: <NikeLogo width={40} height={40} /> },
   { id: '2', value: 'Converse', logo: <ConversLogo width={40} height={40} /> },
   { id: '3', value: 'Adidas', logo: <AdidasLogo width={40} height={40} /> },
   { id: '4', value: 'Puma', logo: <PumaLogo width={40} height={40} /> },
   { id: '5', value: 'Nd', logo: <NDLogo width={40} height={40} /> },
] 