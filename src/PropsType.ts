import React, { CSSProperties } from 'react';
import { InputItemPropsType } from 'antd-mobile-v2/es/input-item/PropsType';
import { DatePickerPropsType } from 'antd-mobile-v2/es/date-picker/PropsType';
import {
  Rule,
  FormInstance,
  Store,
  ValidateErrorEntity,
} from 'rc-field-form/es/interface';

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
    | 'group'
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
  // level?: number;
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
  extra?: string | React.ReactNode;
  initKey?: string | number;
  className?: string;
  groupProps?: GroupProps;
  fileProps?: any;
}

export interface TargetProps {
  targetField: string;
  targetValue?: any;
  targetContent?: any;
}

export interface RelativesItemProps {
  type: 'changeFormValue' | 'required' | 'hidden' | 'disabled' | 'custom';
  targetValue: any[];
  targetSet: TargetProps[];
}

export interface IFormRelativesProps {
  [key: string]: RelativesItemProps[];
}

export interface IDynamicFormProps {
  data?: IFormItemProps[]; // 动态表单数据
  form: FormInstance; // 表单对象
  relatives?: IFormRelativesProps; // 表单集联规则
  formsValues?: Store;
  allDisabled?: boolean; // 全部不可交互，展示状态
  onFinish?: (values: Store) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
  isDev?: boolean; // 手动声明是开发模式
  onValuesChange?: (values: any) => void; // 字段改变时抛出事件
  autoLineFeed?: boolean; // 当 title 过长自动增加 positionType 为 vertical
  failScroll?: boolean; // 当字段 rule 验证不通过后，是否滚动到 错误位置，默认开启
  sonFlag?: boolean;
  errorFlag?: boolean; // onFinishFailed 是否显示红色字体的错误提示
  isPc?: boolean; // 是否是 pc 端效果
}

export interface CardProps {
  leftView?: string | React.ReactNode;
  required?: boolean;
  title?: string | React.ReactNode;
  rightView?: string | React.ReactNode;
  classname?: React.CSSProperties;
  border?: boolean; // 是否带border边框   默认true
  extandPostion?: 'top' | 'bottom' | '';
  defaultExtand?: boolean;
  extandChange?: (res: boolean) => void;
}

export interface GroupProps extends CardProps {
  type?: 'empty' | 'card';
}

export interface NativeProps<S extends string = never> {
  className?: string;
  style?: CSSProperties & Partial<Record<S, string>>;
  tabIndex?: number;
}
