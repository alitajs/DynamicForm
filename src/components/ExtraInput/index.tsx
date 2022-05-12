import React, { FC, useState, useContext, useMemo } from 'react';
import classnames from 'classnames';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import PickerGroup from '../NomarPicker/NomarPickerGroup';
import Field from '../Field';
import Title from '../../baseComponents/Title';
import InputItem from '../../baseComponents/InputItem';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { StringAndUdfEvent } from '../../PropsType';
import { allPrefixCls } from '../../const/index';
import { IExtraInputProps } from './interface';
import './index.less';

const ExtraInput: FC<IExtraInputProps> = (props) => {
  const {
    fieldProps,
    fieldProps2,
    title,
    required = false,
    rules = [],
    coverStyle,
    extraType = 'input',
    positionType = 'vertical',
    hasStar = true,
    firstProps = {},
    secondProps = {},
    hidden = false,
    labelNumber = 7,
    boxStyle = {},
    titleStyle,
    formFlag = true,
  } = props;

  const { disabled: firstDisabled = false } = firstProps;
  const { disabled: secondDisabled = false } = firstProps;

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(firstDisabled);
  const [sMregedDisabled, setSMregedDisabled] =
    useState<boolean>(secondDisabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const isVertical = positionType === 'vertical';

  useMemo(() => {
    if (changeForm[fieldProps]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldProps]?.disabled);
    }
    if (changeForm[fieldProps2]?.disabled !== undefined) {
      setSMregedDisabled(changeForm[fieldProps2]?.disabled);
    }
  }, [changeForm[fieldProps2], changeForm[fieldProps]]);

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
          title={title}
          required={required}
          rules={rules}
          name={fieldProps2}
          initialValue={secondProps?.defaultValue}
          params={{
            hidden,
            formFlag,
          }}
          type="picker"
        >
          <PickerGroup
            {...secondProps}
            disabled={sMregedDisabled}
            onChange={fieldChange}
            labelNumber={0}
            title={title}
          />
        </Field>
      );
    }

    return (
      <Field
        title={title}
        required={required}
        rules={rules}
        name={fieldProps2}
        initialValue={secondProps?.defaultValue}
        params={{
          hidden,
          formFlag,
        }}
        type="extraInput"
      >
        <InputItem
          labelNumber={0}
          style={{ textAlign: 'right', ...coverStyle }}
          {...secondProps}
          disabled={sMregedDisabled}
        />
      </Field>
    );
  };

  return (
    <Title
      type="extraInput"
      independentProps={props}
      style={boxStyle}
      titleStyle={titleStyle}
    >
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
            title={title}
            required={required}
            rules={rules}
            name={fieldProps}
            initialValue={firstProps?.defaultValue}
            params={{
              hidden,
              formFlag,
            }}
            type="extraInput"
          >
            <InputItem
              {...firstProps}
              disabled={mregedDisabled}
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
              <HorizontalTitle
                required={required}
                hasStar={hasStar}
                title={title}
                labelNumber={labelNumber}
                isVertical={isVertical}
                fieldProps={fieldProps}
                titleStyle={titleStyle}
              />
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
