import React, { FC, useState, useEffect, useContext, useMemo } from 'react';
import {
  CardContext,
  CardContextProps,
  DformContext,
  DformContextProps,
} from '../../baseComponents/Context';
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
    fieldName,
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
    disabled = false,
    ...otherProps
  } = props;

  const { cDisabled } = useContext<CardContextProps>(CardContext);
  const [mregedDisabled, setMregedDisabled] = useState<boolean>(
    disabled || cDisabled,
  );
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const fieldKey = fieldName || fieldProps;

  useMemo(() => {
    if (cDisabled) return;
    if (changeForm[fieldKey]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldKey]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldKey], disabled, cDisabled]);

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
          name={fieldKey}
          initialValue={defaultValue}
          params={{
            hidden,
            formFlag,
          }}
          type="image"
        >
          <ImagePickerGroup
            {...otherProps}
            disabled={mregedDisabled}
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
