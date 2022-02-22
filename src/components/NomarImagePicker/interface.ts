import { Rule } from 'rc-field-form/es/interface';

export interface ImageFile {
  url: string;
  [key: string]: any;
}

export interface INomarImagePickerProps {
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
  deletable?: boolean;
  selectable?: boolean;
  accept?: string;
  multiple?: boolean;
  capture?: any;
  showView?: boolean;
  onChange?: (
    files: Array<ImageFile>,
    operationType: string,
    index?: number,
  ) => void;
  onImageClick?: (index?: number, files?: Array<ImageFile>) => void;
  isPc?: boolean;
  labelNumber?: number;
  positionType?: 'horizontal' | 'vertical';
  disabled?: boolean;
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
