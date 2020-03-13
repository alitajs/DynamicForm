import React, { FC, useState } from 'react';
import { Rule } from 'rc-field-form/es/interface';
// 所有需要从 rc-field-form 中导出的字段都可以在 dform 中导出
import { ImagePicker, Toast } from 'antd-mobile';
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
  limitSize?: number;
  subTitle?: string | React.ReactNode;
}

const NomarImagePicker: FC<INomarImagePickerProps> = props => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    hasStar = true,
    limitSize = 0,
    subTitle,
    ...otherProps
  } = props;
  const [fileList, setFileList] = useState([]);

  return (
    <div className="alitajs-dform-image-picker">
      <div className="alitajs-dform-vertical-title">
        {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
        <span id={fieldProps} className="alitajs-dform-title">
          {title}
        </span>
        {subTitle}
      </div>
      <Field
        name={fieldProps}
        rules={rules || [{ required, message: `请选择${title}` }]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          const files = nextValue[fieldProps] || [];
          if (files && files.length > fileList.length) {
            const lastFile = files[files.length - 1];
            const { file = {} } = lastFile;
            if (limitSize && file && file.size && file.size > limitSize) {
              Toast.fail('图片过大', 1);
              return false;
            }
          }
          setFileList((nextValue && nextValue[fieldProps as any]) || []);
          return prevValue !== nextValue;
        }}
      >
        <ImagePicker {...otherProps} files={fileList} />
      </Field>
    </div>
  );
};

export default NomarImagePicker;
