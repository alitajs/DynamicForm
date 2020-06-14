import React, { FC, useState, useEffect } from 'react';
import { List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import Field from '../Field';
import NomarRadioGroup from './radioGroup';
import { IAliasProps } from '../../DynamicForm';
import '../../styles/index.less';

interface radioItem {
  label: string;
  value: string;
}

export interface INomarRadioProps {
  fieldProps: string;
  title: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  data?: radioItem[] | [];
  positionType?: 'horizontal' | 'vertical';
  coverStyle?: React.CSSProperties;
  hasStar?: boolean;
  radioType?: 'horizontal' | 'vertical';
  subTitle?: string | React.ReactNode;
  onChange?: (currentActiveLink: string | number | undefined) => void;
  hidden?: boolean;
  disabled?: boolean;
  alias?: IAliasProps;
}

const NomarRadio: FC<INomarRadioProps> = props => {
  const [initValue, setInitValue] = useState('');
  const [aliasData, setAliasData] = useState<any[]>([]);

  const {
    coverStyle,
    fieldProps,
    required = false,
    rules,
    title,
    data = [],
    positionType = 'horizontal',
    hasStar = true,
    radioType = 'horizontal',
    subTitle,
    onChange,
    hidden = false,
    disabled = false,
    alias = {
      label: 'label',
      value: 'value',
    },
  } = props;

  let isVertical = positionType === 'vertical';
  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = data.map(item => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  if (radioType === 'vertical') {
    isVertical = true;
  }

  const radioChange = (e: string | number | undefined, flag: string) => {
    if (onChange && e !== initValue && flag === 'change') onChange(e);
  };

  const RadioGroup = () => (
    <Field
      name={fieldProps}
      rules={rules || [{ required, message: `请选择${title}` }]}
      shouldUpdate={(prevValue: any, nextValue: any) => {
        setInitValue(nextValue && nextValue[fieldProps as any]);
        return prevValue !== nextValue;
      }}
    >
      <NomarRadioGroup
        data={aliasData}
        positionType={positionType}
        radioType={radioType}
        initValue={initValue}
        onChange={radioChange}
        coverStyle={coverStyle}
        disabled={disabled}
      />
    </Field>
  );

  return (
    <>
      {!hidden && (
        <React.Fragment>
          {isVertical && (
            <div className="alitajs-dform-vertical-title">
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={fieldProps} className="alitajs-dform-title">
                {title}
              </span>
              {subTitle}
            </div>
          )}
          <div
            className={classnames({
              'alitajs-dform-vertical-radio': isVertical,
              'alitajs-dform-radio': true,
            })}
          >
            <List.Item key={fieldProps} extra={RadioGroup()}>
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={fieldProps} className="alitajs-dform-title">
                {title}
              </span>
            </List.Item>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default NomarRadio;
