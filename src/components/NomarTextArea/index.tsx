import React, { FC } from 'react';
import { TextareaItem } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import { TextAreaItemPropsType } from 'antd-mobile/es/textarea-item/PropsType';
import classnames from 'classnames';
import Field from '../Field';
import { allPrefixCls } from '../../const/index';
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
}

const NomarTextArea: FC<INomarTextAreaProps> = (props) => {
  const {
    coverStyle,
    required = false,
    fieldProps,
    rules,
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
    ...otherProps
  } = props;

  // let autoFocusInst: { focus: () => void } | null = null;

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

  return (
    <div className={`${allPrefixCls}${isVertical ? '-vertical' : ''}-item`}>
      {!hidden && (
        <React.Fragment>
          {isVertical && (
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
              {extra !== '' && isVertical && (
                <div className={`${allPrefixCls}-extra`}>{extra}</div>
              )}
            </div>
          )}
          <div
            className={classnames({
              [`${allPrefixCls}-area`]: true,
              [`${allPrefixCls}-vertical-area`]: isVertical,
              [`${allPrefixCls}-disabled`]: !editable,
            })}
          >
            <Field
              name={fieldProps}
              rules={rules || [{ required, message: `请输入${title}` }]}
              shouldUpdate={(prevValue: any, nextValue: any) => {
                // if (autoFocusInst) autoFocusInst.focus();
                return prevValue !== nextValue;
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
        </React.Fragment>
      )}
    </div>
  );
};

export default NomarTextArea;
