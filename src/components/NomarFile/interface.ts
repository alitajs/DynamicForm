import { Rule } from 'rc-field-form/es/interface';

export interface INomarFileItemProps {
  [key: string]: any;
}

export interface INomarFileProps {
  fieldProps: string;
  required?: boolean;
  title: string;
  rules?: Rule[];
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  extra?: string | React.ReactNode;
  uploadExtra?: string | React.ReactNode;
  hidden?: boolean;
  onClick?: (val: INomarFileItemProps) => void;
  onChange?: (
    val: INomarFileItemProps[],
    item: INomarFileItemProps,
    type: 'add' | 'delete',
  ) => void;
  upload: (res: any) => void;
  alias?: {
    id: string | number;
    title: string;
  };
  defaultValue?: INomarFileItemProps;
  titleProps?: any;
  fileProps?: any;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  disabled?: boolean;
  maxLength?: number;
  boxStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}
