import React, { FC } from 'react';
import { TextareaItem } from 'antd-mobile-v2';
import classnames from 'classnames';
import Field from '../Field';
import Title from '../Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { allPrefixCls } from '../../const';
import { INomarTextAreaProps } from './interface';
import './index.less';

const DformTextArea: FC<INomarTextAreaProps> = (props) => {
  const {
    coverStyle,
    required = false,
    fieldProps,
    rules = [],
    rows = 3,
    title,
    positionType = 'vertical',
    hasStar = true,
    extra = '',
    subTitle,
    hidden = false,
    onBlur,
    editable = true,
    className = '',
    defaultValue,
    errorValue,
    formFlag = true,
    labelNumber = 7,
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
      fieldProps={fieldProps}
    />
  );

  const inputOnBlur = (val: string | undefined) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

  return (
    <Title independentProps={props} formFlag={formFlag} type="area">
      <div
        className={classnames({
          [`${allPrefixCls}-area`]: true,
          [`${allPrefixCls}-vertical-area`]: isVertical,
          [`${allPrefixCls}-disabled`]: !editable,
        })}
      >
        <Field
          type="area"
          title={title}
          required={required}
          rules={rules}
          name={fieldProps}
          shouldUpdate={(prevValue: any, nextValue: any) => {
            return prevValue !== nextValue;
          }}
          initialValue={defaultValue}
          formFlag={formFlag}
          params={{
            hidden,
          }}
        >
          <TextareaItem
            {...otherProps}
            title={titleDiv()}
            editable={editable}
            style={{
              textAlign: rows === 1 ? 'right' : 'left',
              ...coverStyle,
            }}
            className={className}
            rows={rows}
            onBlur={(val) => {
              inputOnBlur(val);
            }}
          />
        </Field>
      </div>
    </Title>
  );
};

DformTextArea.displayName = 'dformTextArea';
export default DformTextArea;
