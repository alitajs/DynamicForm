import { Rule } from 'rc-field-form/es/interface';
export interface INomarCustomPorps {
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: any) => void;
  customDomProps?: any;
  CustomDom?: any;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  extra?: string | React.ReactNode;
  defaultValue?: string;
  children: React.ReactElement;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  labelNumber?: number;
}

export interface CustomGroupProps {
  value?: any;
  onChange?: (res: any) => any;
  customDomProps?: any;
  CustomDom?: any;
  isVertical: boolean;
  cutomTitle: React.ReactNode;
  children?: any;
}
