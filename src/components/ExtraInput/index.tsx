import React, { FC } from 'react';
import { InputItem, Picker, List } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import Field from '../Field';
import { NomarInput } from '..';
import classnames from 'classnames';
import '../../styles/index.less';

export interface IExtraInputProps extends InputItemPropsType {
  inputType?: InputItemPropsType['type'];
  fieldProps: string;
  fieldProps2?: string;
  placeholder2?: string;
  required?: boolean;
  rules?: [];
  title: string;
  coverStyle?: React.CSSProperties;
  extraType?: 'input' | 'select';
  positionType?: 'vertical' | 'horizontal';
  data?: any;
  hasStar?: boolean;
}

const ExtraInput: FC<IExtraInputProps> = props => {
  const {
    inputType = 'text',
    fieldProps,
    fieldProps2,
    title,
    required,
    rules,
    coverStyle,
    placeholder2,
    extraType = 'input',
    positionType = 'vertical',
    hasStar = true,
    data,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const extraDiv = () => {
    if (extraType === 'select') {
      return (
        <Field name={fieldProps2} rules={rules || [{ required, message: `请输入${title}` }]}>
          <Picker style={coverStyle} title={title} data={data} cascade={false} extra={placeholder2}>
            <List.Item arrow="horizontal"></List.Item>
          </Picker>
        </Field>
      );
    }

    return (
      <Field name={fieldProps2} rules={rules || [{ required, message: `请输入${title}` }]}>
        <InputItem {...otherProps} type={inputType} style={{ textAlign: 'right', ...coverStyle }} />
      </Field>
    );
  };

  return (
    <>
      {isVertical && (
        <p className="alitajs-dform-title-content alitajs-dform-range-date-picker-vertical-title">
          {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
          <span id={fieldProps} className="alitajs-dform-title">
            {title}
          </span>
        </p>
      )}
      <div
        className={classnames({
          'alitajs-dform-extra-input': true,
          'alitajs-dform-extra-horizontal': !isVertical,
        })}
      >
        <div className={`alitajs-dform-begin${isVertical ? '-vertical' : ''}-input`}>
          <NomarInput
            {...otherProps}
            required={required}
            rules={rules}
            coverStyle={{ textAlign: 'left', ...coverStyle }}
            fieldProps={fieldProps}
            title={title}
            extra=""
          />
        </div>
        {extraType === 'input' && <div className="alitajs-dform-line">~</div>}
        <div
          className={`alitajs-dform-end${isVertical ? '-vertical' : ''}-input`}
          style={{ width: isVertical ? '' : '' }}
        >
          {extraDiv()}
        </div>
      </div>
    </>
  );
};

export default ExtraInput;
