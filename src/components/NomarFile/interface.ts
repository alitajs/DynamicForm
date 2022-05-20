import { Rule } from 'rc-field-form/es/interface';
import { BaseComponentProps } from '../../PropsType';

export interface INomarFileItemProps {
  [key: string]: any;
}

export interface INomarFileProps extends BaseComponentProps {
  extra?: string | React.ReactNode;
  uploadExtra?: string | React.ReactNode;
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
  fileProps?: any;
  maxLength?: number;
}
