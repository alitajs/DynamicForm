import { Rule } from 'rc-field-form/es/interface';
import { IAliasProps, BaseComponentProps } from '../../PropsType';

export interface IDataItem {
  [key: string]: string | number;
}

export interface INomarPickerProps extends BaseComponentProps {
  data: IDataItem[];
  onChange?: (currentActiveLink: string | number) => void;
  coverStyle?: React.CSSProperties;
  placeholder?: string;
  initValue?: string | number;
  labelNumber?: number;
  onClick?: (val: string | number | undefined) => void;
  alias?: IAliasProps;
  extra?: string | React.ReactNode;
  defaultValue?: string;
  clear?: boolean;
  customTitle?: React.ReactNode;
  insistOpenModal?: boolean;
  arrow?: boolean;
}
