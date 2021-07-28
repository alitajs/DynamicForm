import { Rule } from 'rc-field-form/es/interface';

export interface INomarFileItemProps {
  id: string | number;
  title: string;
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
  hidden?: boolean;
  onClick?: (val: INomarFileItemProps) => void;
  onChange?: (val: INomarFileItemProps[], item: INomarFileItemProps) => void;
  upload: (res: any) => void;
  alias?: {
    id: string | number;
    title: string;
  };
}
