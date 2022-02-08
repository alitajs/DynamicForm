import React, { FC } from 'react';
import classNames from 'classnames';
import TextareaItem from './TextareaItem';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
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
    ...otherProps
  } = props;

  const labelCls = classNames({
    [`${allPrefixCls}-input-label-0`]: labelNumber === 0,
    [`${allPrefixCls}-input-label-2`]: labelNumber === 2,
    [`${allPrefixCls}-input-label-3`]: labelNumber === 3,
    [`${allPrefixCls}-input-label-4`]: labelNumber === 4,
    [`${allPrefixCls}-input-label-5`]: labelNumber === 5,
    [`${allPrefixCls}-input-label-6`]: labelNumber === 6,
    [`${allPrefixCls}-input-label-7`]: labelNumber === 7,
    [`${allPrefixCls}-input-label-auto`]: labelNumber > 7,
  });

  let isVertical = positionType === 'vertical';
  if (extra) isVertical = true;

  const titleDiv = () => (
    <div
      className={classNames(labelCls, {
        [`${allPrefixCls}-title`]: true,
      })}
    >
      {required && hasStar && (
        <div className={`${allPrefixCls}-redStar`}>*</div>
      )}
      <div>{title}</div>
    </div>
  );

  const inputOnBlur = (val: string) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

  const areaChange = (e: string) => {
    if (onChange) onChange(e);
  };

  return (
    <Title independentProps={props} formFlag={formFlag} {...titleProps}>
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
