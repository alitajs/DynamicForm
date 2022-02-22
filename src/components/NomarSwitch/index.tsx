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
    labelNumber = 5,
    subTitle = '',
    extra,
    ...otherProps
  } = props;

  const renderPcContent = () => {
    return (
      <PcLayout
        left={
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
          />
        }
        right={
          <div
            className={`${prefixCls}-field`}
            style={{
              ...coverStyle,
            }}
          >
            <Field
              name={fieldProps}
              valuePropName="checked"
              rules={[
                { required, message: `请选择${title}` },
                ...(rules || []),
              ]}
              initialValue={defaultValue}
              formFlag={formFlag}
            >
              <ASwitch checked={defaultValue} {...otherProps}></ASwitch>
            </Field>
          </div>
        }
      />
    );
  };

  const renderDefault = () => {
    return (
      <div
        className={classnames({
          [prefixCls]: true,
        })}
      >
        <HorizontalTitle
          required={required}
          hasStar={hasStar}
          title={title}
          labelNumber={labelNumber}
        />

        <div
          className={`${prefixCls}-field`}
          style={{
            ...coverStyle,
          }}
        >
          <Field
            name={fieldProps}
            valuePropName="checked"
            rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
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
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      extra={extra}
      isPc={isPc}
      {...titleProps}
    >
      {!!isPc ? renderPcContent() : renderDefault()}
    </Title>
  );
};

DformSwitch.displayName = 'dformSwitch';
export default DformSwitch;
