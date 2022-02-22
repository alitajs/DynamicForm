import React, { FC } from 'react';
import ImagePickerGroup from './imagePickerGroup';
import { ImageFile, INomarImagePickerProps } from './interface';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
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
    titleProps,
    formFlag = false,
    labelNumber = 5,
    positionType = 'vertical',
    isPc,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

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
      formFlag={formFlag}
      isPc={isPc}
      {...{
        ...titleProps,
        positionType: isPc ? positionType : 'vertical',
      }}
    >
      <Field
        name={fieldProps}
        rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
        initialValue={defaultValue}
        formFlag={formFlag}
      >
        <ImagePickerGroup
          {...otherProps}
          positionType={positionType}
          value={defaultValue}
          onChange={imageChange}
          limitSize={limitSize}
        >
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={isVertical}
          />
        </ImagePickerGroup>
      </Field>
    </Title>
  );
};

DformImagePicker.displayName = 'dformImagePicker';
export default DformImagePicker;
