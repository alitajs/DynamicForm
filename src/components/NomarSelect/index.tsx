import React, { FC } from 'react';
import { Picker, List } from 'antd-mobile';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import { allPrefixCls } from '../../const/index';
import Field from '../Field';
import './index.less';

export interface INomarSelectProps extends Omit<PickerPropsType, 'data'> {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: PickerPropsType['extra'];
  data?: PickerPropsType['data'];
  value?: PickerPropsType['value'];
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  onClick?: () => void;
  className?: string;
}

const NomarPicker: FC<INomarSelectProps> = (props) => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules,
    placeholder,
    data = [] as any,
    positionType = 'horizontal',
    hasStar = true,
    subTitle,
    hidden = false,
    onClick,
    className,
    extra,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

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
            className={`alitajs-dform${isVertical ? '-vertical' : ''}-select`}
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
          >
            <Field
              name={fieldProps}
              rules={rules || [{ required, message: `请选择${title}` }]}
            >
              <Picker
                cascade={false}
                {...otherProps}
                style={coverStyle}
                className={className}
                extra={placeholder}
                data={data}
                title={title}
              >
                <List.Item arrow="horizontal">
                  {!isVertical && (
                    <div className={`${allPrefixCls}-title`}>
                      {required && hasStar && (
                        <div className={`${allPrefixCls}-redStar`}>*</div>
                      )}
                      <div>{title}</div>
                    </div>
                  )}
                </List.Item>
              </Picker>
            </Field>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default NomarPicker;
