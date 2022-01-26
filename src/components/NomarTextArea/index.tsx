import React, { FC } from 'react';
import { TextareaItem } from 'antd-mobile-v2';
import { Rule } from 'rc-field-form/es/interface';
import { TextAreaItemPropsType } from 'antd-mobile-v2/es/textarea-item/PropsType';
import classnames from 'classnames';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import { allPrefixCls } from '../../const/index';

import NewTextareaItem from './TextareaItem';

import './index.less';

export interface INomarTextAreaProps extends TextAreaItemPropsType {
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  extra?: React.ReactNode | string;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  defaultValue?: string;
  errorValue?: any;
  titleProps?: any;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}

const DformTextArea: FC<INomarTextAreaProps> = (props) => {
  const {
    coverStyle,
    required = false,
    fieldProps,
    rules = [],
    rows = 3,
    title,
    positionType = 'horizontal',
    hasStar = true,
    extra = '',
    subTitle,
    hidden = false,
    onBlur,
    editable = true,
    className = '',
    defaultValue,
    errorValue,
    titleProps,
    formFlag = false,
    onChange,
    ...otherProps
  } = props;

  let isVertical = positionType === 'vertical';
  if (extra) isVertical = true;

  const titleDiv = () => (
    <div className={`${allPrefixCls}-title`}>
      {required && hasStar && (
        <div className={`${allPrefixCls}-redStar`}>*</div>
      )}
      <div>{title}</div>
    </div>
  );

  const inputOnBlur = (val: string | undefined) => {
    // window.scrollTo(0, 0);
    if (onBlur) onBlur(val);
  };

  const areaChange = (e: string) => {
    if (onChange) onChange(e);
  };

  return (
    <Title independentProps={props} formFlag={formFlag} {...titleProps}>
      <div
        className={classnames({
          [`${allPrefixCls}-area`]: true,
          [`${allPrefixCls}-vertical-area`]: isVertical,
          [`${allPrefixCls}-disabled`]: !editable,
        })}
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
          <NewTextareaItem onChange={areaChange} />
        </Field>
      </div>
    </Title>
  );
};

export default DformTextArea;
