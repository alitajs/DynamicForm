import React, { FC, useState } from 'react';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import classnames from 'classnames';
import { Rule } from 'rc-field-form/es/interface';
import PickerGroup from '../NomarPicker/NomarPickerGroup';
import Field from '../Field';
import { StringAndUdfEvent } from '../../PropsType';
import { InputItem } from '..';
import { allPrefixCls } from '../../const/index';
import './index.less';

export interface IExtraInputProps {
  fieldProps: string;
  fieldProps2?: string;
  required?: boolean;
  rules?: Rule[];
  title: string;
  coverStyle?: React.CSSProperties;
  extraType?: 'input' | 'select';
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  firstProps?: InputItemPropsType;
  secondProps?: any;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
}

const ExtraInput: FC<IExtraInputProps> = (props) => {
  const [pickerInitValue, setPickerInitValue] = useState(undefined);
  const {
    fieldProps,
    fieldProps2,
    title,
    required,
    rules,
    coverStyle,
    extraType = 'input',
    positionType = 'vertical',
    hasStar = true,
    firstProps,
    secondProps,
    subTitle,
    hidden = false,
  } = props;

  const isVertical = positionType === 'vertical';

  const inputOnBlur = (val: string | undefined) => {
    // window.scrollTo(0, 0);
    if (firstProps && firstProps.onBlur) firstProps.onBlur(val);
  };

  const fieldChange = (values: any, flag: string) => {
    if (flag === 'init') return;
    if (secondProps && secondProps?.onChange && values !== pickerInitValue) {
      secondProps.onChange(values);
    }
  };

  const extraDiv = () => {
    if (extraType === 'select') {
      return (
        <Field
          name={fieldProps2}
          rules={rules || [{ required, message: `请选择${title}` }]}
          shouldUpdate={(prevValue: any, nextValue: any) => {
            setPickerInitValue(nextValue && nextValue[fieldProps2 as any]);
            return prevValue !== nextValue;
          }}
        >
          <PickerGroup
            {...secondProps}
            initValue={pickerInitValue}
            onChange={fieldChange}
            labelNumber={0}
            title={title}
          />
        </Field>
      );
    }

    return (
      <Field
        name={fieldProps2}
        rules={rules || [{ required, message: `请输入${title}` }]}
      >
        <InputItem
          labelNumber={0}
          style={{ textAlign: 'right', ...coverStyle }}
          {...secondProps}
        />
      </Field>
    );
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
            </div>
          )}
          <div
            className={classnames({
              [`${allPrefixCls}-extra-input`]: true,
              [`${allPrefixCls}-extra-horizontal`]: !isVertical,
            })}
          >
            <div
              className={`${allPrefixCls}-begin${
                isVertical ? '-vertical' : ''
              }-input`}
            >
              <Field
                name={fieldProps}
                rules={rules || [{ required, message: `请输入${title}` }]}
              >
                <InputItem
                  {...firstProps}
                  extra=""
                  coverStyle={{
                    textAlign: 'center',
                    ...coverStyle,
                  }}
                  onBlur={(val: StringAndUdfEvent) => {
                    inputOnBlur(val);
                  }}
                  isVertical={isVertical}
                >
                  {!isVertical && (
                    <div className={`${allPrefixCls}-title`}>
                      {required && hasStar && (
                        <div className={`${allPrefixCls}-redStar`}>*</div>
                      )}
                      <div>{title}</div>
                    </div>
                  )}
                </InputItem>
              </Field>
            </div>
            {extraType === 'input' && (
              <div className={`${allPrefixCls}-line`}>~</div>
            )}
            <div
              className={`${allPrefixCls}-end${
                isVertical ? '-vertical' : ''
              }-input`}
            >
              {extraDiv()}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ExtraInput;
