import { Dispatch, ReactNode, SetStateAction } from 'react';

export type TPoolTip = {
  button: any;
  children: ReactNode;
};

export type TSelect = {
  placeholder: string;
  className?: string;
  options: {
    id: number;
    name: string;
    value: string;
  }[];
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  value?: any;
};
export type SheetProps = {
  children: ReactNode;
  side: 'top' | 'bottom' | 'left' | 'right';
  trigger: any;
  className?: string;
  triggerClass?: string;
  label?: string;
  title?: string;
  onClick?: () => void;
  open?: boolean;
  onChange?: Dispatch<SetStateAction<boolean>>;
};
export type TDialog = {
  className?: string;
  action: () => void;
  trigger: ReactNode;
  title?: string;
  description?: string;
};
export type TCarousel = {
  chlidren: ReactNode;
  className?: string;
  data: any[];
};
export type TTooltip = {
  trigger: any;
  chlidren: ReactNode;
};
export type TAccordion = {
  id: string;
  title: string;
  content: any[];
};
export type TModalProps = {
  title: string;
  btn: any;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export type TProductPrevie = {
  images: {
    color: string;
    urls: string[];
  }[];
};
export type TFileUploder = {
  formField?: any;
  maxFiles?: number;
  color?: string;
  size?: 'small' | 'medium' | 'large';
};
export type TSelectProps = {
  placeholder: string;
  className?: string;
  options: {
    id: number;
    name: string;
    value: string;
  }[];
  multiple?: boolean;
  formField: any;
};
export type TSelectOption = {
  placeholder: string;
  className?: string;
  options: {
    id: number;
    name: string;
    value: string;
  }[];
};
export type TEditorProps = {
  formField?: any;
  height?: number;
};
export type TSlider = {
  images: { color: string; images: string[] }[];
  default: string[];
};
