import React, { FC } from 'react';
import { TextareaItem } from 'antd-mobile-v2';
import classnames from 'classnames';
import Field from '../Field';
import Title from '../../baseComponents/Title';
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
    labelNumber = 7,
    boxStyle,
    titleStyle,
    formFlag = true,
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
      titleStyle={titleStyle}
    />
  );

  const inputOnBlur = (val: string | undefined) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

  return (
    <Title
      independentProps={props}
      type="area"
      style={boxStyle}
      titleStyle={titleStyle}
    >
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
          params={{
            hidden,
            formFlag,
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
