import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import CheckBoxGroup, { IDataItem } from './checkBoxgroup';
import { IAliasProps } from '../../DynamicForm';
import { allPrefixCls } from '../../const/index';
import './index.less';

interface INomarCheckBoxProps {
  title: string;
  rules?: Rule[];
  required?: boolean;
  data?: any;
  fieldProps: string;
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  className?: string;
  onChange?: (currentActiveLink: (string | number)[]) => void;
  disabled?: boolean;
  disableItem?: (items: IDataItem) => boolean;
  hidden?: boolean;
  chunk?: number;
  alias?: IAliasProps;
}

const NomarCheckBox: FC<INomarCheckBoxProps> = (props) => {
  const [initValue, setInitValue] = useState<string | undefined>();
  const [aliasData, setAliasData] = useState<any[]>([]);
  const {
    coverStyle,
    fieldProps,
    className = '',
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

  const boxChange = (
    e: (string | number)[] | undefined,
    flag: 'init' | 'change',
  ) => {
    if (onChange && flag === 'change' && e !== initValue) onChange(e || []);
  };

  return (
    <div className={`${allPrefixCls}-item`}>
      {!hidden && (
        <div className="alitajs-dform-check-box">
          <div className={`${allPrefixCls}-title`}>
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
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
              disableItem={props.disableItem}
              data={aliasData}
              onChange={boxChange}
              coverStyle={coverStyle}
              initValue={initValue}
              disabled={disabled}
              chunk={chunk}
              className={className}
            />
          </Field>
        </div>
      )}
    </div>
  );
};

export default NomarCheckBox;
