import { IAliasProps, BaseComponentProps } from '../../PropsType';

export interface RadioItem {
  [key: string]: string | number;
}

export interface INomarRadioProps extends BaseComponentProps {
  placeholder?: string;
  data?: RadioItem[] | [];
  coverStyle?: React.CSSProperties;
  radioType?: 'horizontal' | 'vertical';
  onChange?: (currentActiveLink: string | number | undefined) => void;
  alias?: IAliasProps;
  allowUnChecked?: boolean;
  labelNumber?: number;
  extra?: string | React.ReactNode;
  defaultValue?: string;
}
