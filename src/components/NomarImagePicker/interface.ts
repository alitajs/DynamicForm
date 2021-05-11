import { ImagePickerPropTypes } from 'antd-mobile/es/image-picker/PropsType';
import { Rule } from 'rc-field-form/es/interface';

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
}

export interface ImagePickerGroupProps {
  initValue: any[];
  onChange: (files: ImageFile[], operationType: string, index: number | undefined) => void;
  limitSize?: number | undefined;
  compressRatio?: number;
}
