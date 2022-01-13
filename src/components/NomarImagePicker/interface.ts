import { ImagePickerPropTypes } from 'antd-mobile-v2/es/image-picker/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import { ErrorValueProps } from '../../PropsType';

export interface ImageFile {
  url: string;
  [key: string]: any;
}

export interface INomarImagePickerProps extends ImagePickerPropTypes {
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  hasStar?: boolean;
  limitSize?: number;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  extra?: string | React.ReactNode;
  compressRatio?: number;
  className?: string;
  defaultValue?: any[] | undefined;
  titleProps?: any;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  maxLength?: number;
}

export interface ImagePickerGroupProps extends INomarImagePickerProps {
  value?: any[] | undefined;
  onChange: (
    files: ImageFile[],
    operationType: string,
    index: number | undefined,
  ) => void;
  limitSize?: number | undefined;
  compressRatio?: number;
}
