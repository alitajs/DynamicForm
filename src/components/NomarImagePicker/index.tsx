import React, { FC, useState } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import { ImagePicker, Toast } from 'antd-mobile';
import { ImagePickerPropTypes } from 'antd-mobile/es/image-picker/PropsType';
import Field from '../Field';
import { transformFile } from '../../utils';
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
  hidden?: boolean;
  extra?: string | React.ReactNode;
  compressRatio?: number;
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
    hidden = false,
    extra = '',
    compressRatio,
    onChange,
    ...otherProps
  } = props;
  const [fileList, setFileList] = useState([]);

  const imageChange = (files: any, operationType: string, index: number | undefined) => {
    if (files.length >= 0) {
      const lastFile = files[files.length - 1];
      const { file = {} } = lastFile;
      if (limitSize && file && file.size && file.size > limitSize) {
        return;
      }
    }
    if (onChange) onChange(files, operationType, index);
  };

  return (
    <React.Fragment>
      {!hidden && (
        <div className="alitajs-dform-image-picker">
          <div className="alitajs-dform-input-title">
            <div className="alitajs-dform-vertical-title">
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
                {title}
              </span>
              {subTitle}
            </div>
            {extra !== '' && <div className="alitajs-dform-extra">{extra}</div>}
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
                if (compressRatio && lastFile.url.indexOf('base64,') !== -1) {
                  transformFile(lastFile.file, compressRatio).then((newFile: any) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(newFile);
                    reader.onload = function({ target }) {
                      files[files.length - 1] = {
                        ...files[files.length - 1],
                        file: newFile,
                        url: target?.result,
                      };
                    };
                  });
                }
              }
              setFileList((nextValue && nextValue[fieldProps as any]) || []);
              return prevValue !== nextValue;
            }}
          >
            <ImagePicker {...otherProps} onChange={imageChange} files={fileList} />
          </Field>
        </div>
      )}
    </React.Fragment>
  );
};

export default NomarImagePicker;
