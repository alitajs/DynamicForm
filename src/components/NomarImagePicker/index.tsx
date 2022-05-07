import React, { FC } from 'react';
import ImagePickerGroup from './imagePickerGroup';
import { ImageFile, INomarImagePickerProps } from './interface';
import Field from '../Field';
import Title from '../../baseComponents/Title';
import { allPrefixCls } from '../../const/index';
import './index.less';

const DformImagePicker: FC<INomarImagePickerProps> = (props) => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules = [],
    hasStar = true,
    limitSize = 0,
    subTitle,
    hidden = false,
    extra = '',
    onChange,
    defaultValue = [],
    boxStyle,
    titleStyle,
    formFlag = true,
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
      independentProps={props}
      type="image"
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <div className={`${allPrefixCls}-image`}>
        <Field
          title={title}
          required={required}
          rules={rules}
          name={fieldProps}
          initialValue={defaultValue}
          params={{
            hidden,
            formFlag,
          }}
          type="image"
        >
          <ImagePickerGroup
            {...otherProps}
            value={defaultValue}
            onChange={imageChange}
            limitSize={limitSize}
          />
        </Field>
      </div>
    </Title>
  );
};

DformImagePicker.displayName = 'dformImagePicker';
export default DformImagePicker;
