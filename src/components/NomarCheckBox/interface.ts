import { Rule } from 'rc-field-form/es/interface';
import { IDataItem } from './checkBoxgroup';
import { IAliasProps } from '../../PropsType';

export interface INomarCheckBoxProps {
  title: string;
  rules?: Rule[];
  required?: boolean;
  data?: any;
  fieldProps: string;
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  className?: string;
  onChange?: (currentActiveLink: (string | number)[]) => void;
  disabled?: boolean;
  disableItem?: (items: IDataItem) => boolean;
  hidden?: boolean;
  chunk?: number;
  alias?: IAliasProps;
  defaultValue?: (string | number)[];
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}
