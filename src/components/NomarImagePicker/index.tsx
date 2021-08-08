import React, { FC, useState } from 'react';
import classnames from 'classnames';
import ImagePickerGroup from './imagePickerGroup';
import { ImageFile, INomarImagePickerProps } from './interface';
import Field from '../Field';
import { allPrefixCls } from '../../const/index';
import Title from '../Title';

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
    <Title
      positionType="vertical"
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      extra={extra}
    >
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
    </Title>
  );
};

export default NomarImagePicker;
