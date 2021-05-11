import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import CheckBoxGroup from './checkBoxgroup';
import { IAliasProps } from '../../DynamicForm';
import '../../styles/index.less';

interface INomarCheckBoxProps {
  title: string;
  rules?: Rule[];
  required?: boolean;
  data?: any;
  fieldProps: string;
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  onChange?: (currentActiveLink: (string | number)[]) => void;
  disabled?: boolean;
  hidden?: boolean;
  chunk?: number;
  alias?: IAliasProps;
}

const NomarCheckBox: FC<INomarCheckBoxProps> = props => {
  const [initValue, setInitValue] = useState<string | undefined>();
  const [aliasData, setAliasData] = useState<any[]>([]);
  const {
    coverStyle,
    fieldProps,
    title,
    rules,
    required = false,
    data = [],
    hasStar = true,
    subTitle,
    onChange,
    disabled = false,
    hidden = false,
    chunk = 1,
    alias = {
      label: 'label',
      value: 'value',
    },
  } = props;

  const { label = 'label', value = 'value' } = alias;

  useEffect(() => {
    const newData = data.map((item: any) => ({
      label: item[label],
      value: item[value],
    }));
    setAliasData(newData);
  }, [data]);

  const boxChange = (e: (string | number)[] | undefined, flag: 'init' | 'change') => {
    if (onChange && flag === 'change' && e !== initValue) onChange(e || []);
  };

  return (
    <>
      {!hidden && (
        <div className="alitajs-dform-check-box">
          <div className="alitajs-dform-vertical-title">
            {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
            <span className="alitajs-dform-title">
              {title}
            </span>
            {subTitle}
          </div>
          <Field
            name={fieldProps}
            rules={rules || [{ required, message: `请选择${title}` }]}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              if (nextValue && nextValue[fieldProps]) {
                setInitValue(JSON.stringify(nextValue[fieldProps]));
              } else {
                setInitValue(undefined);
              }
              // setInitValue(nextValue && nextValue[fieldProps as any]);
              return prevValue !== nextValue;
            }}
          >
            <CheckBoxGroup
              data={aliasData}
              onChange={boxChange}
              coverStyle={coverStyle}
              initValue={initValue}
              disabled={disabled}
              chunk={chunk}
            />
          </Field>
        </div>
      )}
    </>
  );
};

export default NomarCheckBox;
