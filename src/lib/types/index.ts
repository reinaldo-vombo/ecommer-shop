import { ReactNode } from 'react';

export type LayoutProp = {
  children: ReactNode;
};
export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: number;
};
export type TState = {
  message: string;
  error?: boolean;
  status: number;
  success?: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};
export type TUpadateState = {
  message: string;
  error?: boolean;
  status: number;
  success?: boolean;
  fields?: Record<string, string>;
  issues?: string[];
};
