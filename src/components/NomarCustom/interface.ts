import { BaseComponentProps } from '../../PropsType';
export interface INomarCustomPorps extends BaseComponentProps {
  onChange?: (currentActiveLink: any) => void;
  customDomProps?: any;
  CustomDom?: any;
  extra?: string | React.ReactNode;
  defaultValue?: string;
  children: React.ReactElement;
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
