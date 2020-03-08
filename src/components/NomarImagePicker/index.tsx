import React, { FC, useState } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import { ImagePicker } from 'antd-mobile';
import { ImagePickerPropTypes } from 'antd-mobile/es/image-picker/PropsType';
import Field from '../Field';
import '../../styles/index.less';

export interface INomarImagePickerProps extends ImagePickerPropTypes {
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  hasStar?: boolean;
}

const NomarImagePicker: FC<INomarImagePickerProps> = props => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    hasStar = true,
    onChange,
    ...otherProps
  } = props;
  const [fileList, setFileList] = useState([]);

  const fileChange = (files: any, type: string, index: number | undefined) => {
    setFileList(files);
    if (onChange) onChange(files, type, index);
  };

  return (
    <>
      <p className="alitajs-dform-vertical-title">
        {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
        <span id={fieldProps} className="alitajs-dform-title">
          {title}
        </span>
      </p>
      <Field
        name={fieldProps}
        rules={rules || [{ required, message: `请选择${title}` }]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          setFileList(nextValue && nextValue[fieldProps as any]);
          return prevValue !== nextValue;
        }}
      >
        <ImagePicker {...otherProps} files={fileList} onChange={fileChange} />
      </Field>
    </>
  );
};

export default NomarImagePicker;
