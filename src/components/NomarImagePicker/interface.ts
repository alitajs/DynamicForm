import { ImagePickerPropTypes } from 'antd-mobile-v2/es/image-picker/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import { BaseComponentProps } from '../../PropsType';

export interface ImageFile {
  url: string;
  [key: string]: any;
}

type ImageType = ImagePickerPropTypes & BaseComponentProps;

export interface INomarImagePickerProps extends ImageType {
  coverStyle?: React.CSSProperties;
  limitSize?: number;
  hidden?: boolean;
  extra?: string | React.ReactNode;
  compressRatio?: number;
  defaultValue?: any[] | undefined;
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
