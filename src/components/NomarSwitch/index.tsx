import React, { FC } from 'react';
import { Switch } from 'antd-mobile/2x';
import { Rule } from 'rc-field-form/es/interface';
import { SwitchProps } from 'antd-mobile/es/components/switch/index';
import { allPrefixCls } from '../../const/index';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import './index.less';
import PcLayout from '../../baseComponents/PcLayout';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { Switch as ASwitch } from 'antd';
import classnames from 'classnames';

const prefixCls = 'alitajs-dform-switch';
const pcPrefixCls = 'alitajs-dform-pc-switch';

export interface INomarSwitchProps extends SwitchProps {
  coverStyle?: React.CSSProperties;
  title: string;
  required?: boolean;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  hasStar?: boolean;
  hidden?: boolean;
  className?: string;
  defaultValue?: boolean;
  titleProps?: any;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  isPc?: boolean;
  labelNumber?: number;
  positionType?: 'horizontal' | 'vertical';
  subTitle?: string | React.ReactNode;
  extra?: string | React.ReactNode;
}

const DformSwitch: FC<INomarSwitchProps> = (props) => {
  const {
    coverStyle,
    title,
    required = false,
    fieldProps,
    rules = [],
    placeholder,
    hasStar = true,
    hidden = false,
    className = '',
    defaultValue = false,
    titleProps,
    formFlag = false,
    isPc = false,
    positionType = 'horizontal',
    labelNumber = 5,
    subTitle = '',
    extra,
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const labelCls = classnames({
    [`${allPrefixCls}-input-label-0`]: labelNumber === 0,
    [`${allPrefixCls}-input-label-2`]: labelNumber === 2,
    [`${allPrefixCls}-input-label-3`]: labelNumber === 3,
    [`${allPrefixCls}-input-label-4`]: labelNumber === 4,
    [`${allPrefixCls}-input-label-5`]: labelNumber === 5,
    [`${allPrefixCls}-input-label-6`]: labelNumber === 6,
    [`${allPrefixCls}-input-label-7`]: labelNumber === 7,
  });

  const renderPcContent = () => {
    return (
      <PcLayout
        isVertical={isVertical}
        left={
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={isVertical}
          />
        }
        right={
          <Field
            name={fieldProps}
            valuePropName="checked"
            rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              return prevValue !== nextValue;
            }}
            initialValue={defaultValue}
            formFlag={formFlag}
          >
            <ASwitch checked={defaultValue} {...otherProps}></ASwitch>
          </Field>
        }
      />
    );
  };

  const renderDefault = () => {
    return (
      <div
        className={classnames({
          [prefixCls]: true,
          [`${prefixCls}-vertical`]: isVertical,
        })}
      >
        {!isVertical && (
          <div
            className={classnames(labelCls, {
              [`${allPrefixCls}-title`]: true,
              [`${allPrefixCls}-vertical-title`]: isVertical,
            })}
          >
            <HorizontalTitle
              required={required}
              hasStar={hasStar}
              title={title}
              labelNumber={labelNumber}
              isVertical={isVertical}
            />
          </div>
        )}
        <div style={coverStyle}>
          <Field
            name={fieldProps}
            valuePropName="checked"
            rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              return prevValue !== nextValue;
            }}
            initialValue={defaultValue}
            formFlag={formFlag}
          >
            <Switch checked={defaultValue} {...otherProps} />
          </Field>
        </div>
      </div>
    );
  };

  return (
    <Title
      positionType={positionType}
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      extra={extra}
      isPc={props.isPc}
      {...titleProps}
    >
      <div className={`${allPrefixCls}-field`}>
        {!!isPc ? renderPcContent() : renderDefault()}
      </div>
    </Title>
  );
};

DformSwitch.displayName = 'dformSwitch';
export default DformSwitch;
