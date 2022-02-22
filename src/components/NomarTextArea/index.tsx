import React, { FC } from 'react';
import classNames from 'classnames';
import TextareaItem from './TextareaItem';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { allPrefixCls } from '../../const/index';
import { INomarTextAreaProps } from './interface';

import './index.less';

const DformTextArea: FC<INomarTextAreaProps> = (props) => {
  const {
    coverStyle,
    required = false,
    fieldProps,
    rules = [],
    rows = 2,
    title,
    positionType = 'horizontal',
    hasStar = true,
    extra = '',
    subTitle,
    hidden = false,
    onBlur,
    className = '',
    defaultValue,
    errorValue,
    titleProps,
    formFlag = false,
    onChange,
    labelNumber = 5,
    isPc = false,
    ...otherProps
  } = props;

  let isVertical = positionType === 'vertical';
  if (extra) isVertical = true;

  const titleDiv = () => (
    <HorizontalTitle
      required={required}
      hasStar={hasStar}
      title={title}
      labelNumber={labelNumber}
      isVertical={isVertical}
    />
  );

  const inputOnBlur = (val: string) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

  const areaChange = (e: string) => {
    if (onChange) onChange(e);
  };

  return (
    <Title
      independentProps={props}
      formFlag={formFlag}
      isPc={isPc}
      {...titleProps}
    >
      <Field
        name={fieldProps}
        rules={[{ required, message: `请输入${title}` }, ...(rules || [])]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          return prevValue !== nextValue;
        }}
        initialValue={defaultValue}
        formFlag={formFlag}
      >
        <TextareaItem
          {...otherProps}
          onChange={areaChange}
          rows={rows}
          coverStyle={coverStyle}
          isVertical={isVertical}
          title={titleDiv()}
          className={className}
          onBlur={(val) => {
            inputOnBlur(val);
          }}
        />
      </Field>
    </Title>
  );
};

DformTextArea.displayName = 'dformTextArea';
export default DformTextArea;
