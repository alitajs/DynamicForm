import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import { Rule } from 'rc-field-form/es/interface';

export * from 'rc-field-form/es/interface';

export type InputEventHandler = (value?: string) => void;

export type StringAndUdfEvent = string | undefined;
export type StringEvent = string;

export type ClickEvent = React.MouseEvent<HTMLElement>;

export type ErrorValueProps = { [key: string]: string | undefined };

export interface IAliasProps {
  label: string;
  value: string | number;
}

export interface IFormItemProps {
  type:
    | 'input'
    | 'select'
    | 'area'
    | 'date'
    | 'switch'
    | 'extraInput'
    | 'radio'
    | 'rangeDatePicker'
    | 'coverRadio'
    | 'image'
    | 'custom'
    | 'multiplePicker'
    | 'addressPicker'
    | 'text'
    | 'picker'
    | 'file'
    | 'checkbox';
  title: string;
  fieldProps: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  data?: any[];
  inputType?: InputItemPropsType['type'];
  modeType?: DatePickerPropsType['mode'];
  fieldProps2?: string;
  placeholder2?: string;
  rules?: Rule[];
  extraType?: 'input' | 'select';
  editable?: boolean;
  rows?: number;
  labelNumber?: number;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  firstProps?: any;
  secondProps?: any;
  radioType?: 'vertical' | 'horizontal';
  selectable?: boolean;
  limitSize?: number;
  CustomDom?: any;
  customDomProps?: any;
  subTitle?: string | React.ReactNode;
  maxValueLength?: number;
  onBlur?: (value?: string) => void;
  level?: number;
  onChangeLevel?: (val: any) => void;
  placeholderList?: string[];
  chunk?: number;
  leftContent?: string | React.ReactNode;
  rightContent?: string | React.ReactNode;
  onClick?: any;
  height?: number | string;
  noData?: string | React.ReactNode;
  loading?: boolean;
  alias?: IAliasProps;
  maxLine?: number;
  compressRatio?: number;
  onChange?: (val: (string | number)[] | string | number | boolean) => void;
  hidden?: boolean;
  defaultValue?: any;
  coverStyle?: React.CSSProperties;
  renderHeader?: string | React.ReactNode;
  initKey?: string | number;
  className?: string;
}
