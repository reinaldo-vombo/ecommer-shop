import { ReactNode } from 'react';

export type LayoutProp = {
  children: ReactNode;
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
