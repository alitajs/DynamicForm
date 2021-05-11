import React, { FC, useState } from 'react';

import ImagePickerGroup from './imagePickerGroup';
import { ImageFile, INomarImagePickerProps } from './interface';
import Field from '../Field';
import '../../styles/index.less';

const NomarImagePicker: FC<INomarImagePickerProps> = props => {
  const [initValue, setInitValue] = useState([]);
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
    onChange,
    ...otherProps
  } = props;

  const imageChange = (files: ImageFile[], operationType: string, index: number | undefined) => {
    if (onChange) onChange(files, operationType, index);
  };

  return (
    <React.Fragment>
      {!hidden && (
        <div className="alitajs-dform-image-picker">
          <div className="alitajs-dform-input-title">
            <div className="alitajs-dform-vertical-title">
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span className="alitajs-dform-title">
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
              setInitValue(nextValue && nextValue[fieldProps as any]);
              return prevValue !== nextValue;
            }}
          >
            <ImagePickerGroup
              {...otherProps}
              onChange={imageChange}
              initValue={initValue}
              limitSize={limitSize}
            />
          </Field>
        </div>
      )}
    </React.Fragment>
  );
};

export default NomarImagePicker;
