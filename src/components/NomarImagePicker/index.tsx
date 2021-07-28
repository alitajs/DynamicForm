import React, { FC, useState } from 'react';
import classnames from 'classnames';
import ImagePickerGroup from './imagePickerGroup';
import { ImageFile, INomarImagePickerProps } from './interface';
import Field from '../Field';
import { allPrefixCls } from '../../const/index';

const NomarImagePicker: FC<INomarImagePickerProps> = (props) => {
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

  const imageChange = (
    files: ImageFile[],
    operationType: string,
    index: number | undefined,
  ) => {
    if (onChange) onChange(files, operationType, index);
  };

  return (
    <div className={`${allPrefixCls}-vertical-item`}>
      {!hidden && (
        <React.Fragment>
          <div
            className={classnames({
              [`${allPrefixCls}-title`]: true,
              [`${allPrefixCls}-vertical-title`]: true,
            })}
          >
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
            {subTitle}
            {extra !== '' && (
              <div className={`${allPrefixCls}-extra`}>{extra}</div>
            )}
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
        </React.Fragment>
      )}
    </div>
  );
};

export default NomarImagePicker;
