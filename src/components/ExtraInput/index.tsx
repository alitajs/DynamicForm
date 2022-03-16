import React, { FC } from 'react';
import classnames from 'classnames';
import PickerGroup from '../NomarPicker/NomarPickerGroup';
import Field from '../Field';
import Title from '../Title';
import InputItem from '../InputItem';
import { StringAndUdfEvent } from '../../PropsType';
import { allPrefixCls } from '../../const/index';
import { IExtraInputProps } from './interface';
import './index.less';

const ExtraInput: FC<IExtraInputProps> = (props) => {
  const {
    fieldProps,
    fieldProps2,
    title,
    required,
    rules = [],
    coverStyle,
    extraType = 'input',
    positionType = 'vertical',
    hasStar = true,
    firstProps,
    secondProps,
    titleProps,
    hidden = false,
    formFlag = false,
  } = props;

  const isVertical = positionType === 'vertical';

  const inputOnBlur = (val: string | undefined) => {
    if (firstProps && firstProps.onBlur) firstProps.onBlur(val);
  };

  const fieldChange = (values: any) => {
    if (secondProps && secondProps?.onChange) {
      secondProps.onChange(values);
    }
  };

  const extraDiv = () => {
    if (extraType === 'select') {
      return (
        <Field
          name={fieldProps2}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          initialValue={secondProps?.defaultValue}
          formFlag={formFlag}
          params={{
            hidden,
          }}
        >
          <PickerGroup
            {...secondProps}
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
        rules={[{ required, message: `请输入${title}` }, ...(rules || [])]}
        initialValue={secondProps?.defaultValue}
        formFlag={formFlag}
        params={{
          hidden,
        }}
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
    <Title independentProps={props} formFlag={formFlag} {...titleProps}>
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
            rules={[{ required, message: `请输入${title}` }, ...(rules || [])]}
            initialValue={firstProps?.defaultValue}
            formFlag={formFlag}
            params={{
              hidden,
            }}
          >
            <InputItem
              {...firstProps}
              fieldProps={fieldProps}
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
    </Title>
  );
};

ExtraInput.displayName = 'extraInput';
export default ExtraInput;
