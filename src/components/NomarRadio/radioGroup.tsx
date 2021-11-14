import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { allPrefixCls } from '../../const/index';
import './index.less';

const prefixCls = 'alitajs-dform-radio';

export interface IDataItem {
  [key: string]: string | number | undefined;
}

export interface INomarRadioGroupProps {
  data: IDataItem[];
  positionType?: 'horizontal' | 'vertical';
  radioType?: 'horizontal' | 'vertical';
  value?: string | number;
  disabled?: boolean;
  onChange: (currentActiveLink: string | number | undefined) => void;
  coverStyle?: React.CSSProperties;
  className?: string;
  allowUnChecked?: boolean;
  labelNumber: number;
  formFlag?: boolean;
}

const RadioGroup: FC<INomarRadioGroupProps> = (props) => {
  const {
    data = [],
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    value,
    disabled = false,
    coverStyle,
    className = '',
    allowUnChecked,
    labelNumber = 5,
    children,
    formFlag = false,
  } = props;
  const [activeValue, setActiveValue] = useState<string | number | undefined>(
    undefined,
  );
  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  const labelCls = classnames({
    [`${allPrefixCls}-input-label-0`]: labelNumber === 0,
    [`${allPrefixCls}-input-label-2`]: labelNumber === 2,
    [`${allPrefixCls}-input-label-3`]: labelNumber === 3,
    [`${allPrefixCls}-input-label-4`]: labelNumber === 4,
    [`${allPrefixCls}-input-label-5`]: labelNumber === 5,
    [`${allPrefixCls}-input-label-6`]: labelNumber === 6,
    [`${allPrefixCls}-input-label-7`]: labelNumber === 7,
  });

  useEffect(() => {
    if (data.length === 0) {
      setActiveValue(undefined);
      return;
    }
    const newValue = value;
    const filter = data.filter((item) => item.value === newValue);
    if (filter && filter.length) {
      setActiveValue(newValue);
    } else {
      setActiveValue(undefined);
    }
  }, [data]);

  useEffect(() => {
    if (data.length === 0) {
      setActiveValue(undefined);
      return;
    }
    const filter = data.filter((item) => item.value === value);
    if (filter && filter.length) {
      setActiveValue(value);
    } else {
      setActiveValue(undefined);
    }
  }, [value]);

  const radioClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dataItem: IDataItem,
  ) => {
    e.stopPropagation();
    if (disabled) return;
    const filter = data.filter((item) => item.value === dataItem?.value);
    if (filter && filter.length) {
      if (dataItem?.value === value) {
        if (allowUnChecked) {
          onChange(undefined);
          setActiveValue(undefined);
        }
      } else {
        onChange(dataItem?.value);
        setActiveValue(dataItem?.value);
      }
    } else {
      onChange(undefined);
    }
  };

  const formValue = formFlag ? activeValue : value;

  return (
    <div
      className={classnames({
        [prefixCls]: true,
        [`${allPrefixCls}-vertical-radio`]: isVertical,
      })}
    >
      {!isVertical && (
        <div
          className={classnames(labelCls, {
            [`${allPrefixCls}-title`]: true,
            [`${allPrefixCls}-vertical-title`]: isVertical,
          })}
        >
          {children}
        </div>
      )}
      <div
        className={classnames({
          [`${prefixCls}-group`]: true,
          [`${prefixCls}-position`]: !isVertical,
          [`${prefixCls}-item-vertical`]: radioType === 'vertical',
          [`${allPrefixCls}-disabled`]: disabled,
        })}
        style={coverStyle}
      >
        {data.map((item: IDataItem, index: number) => (
          <div
            key={item.value}
            className={classnames({
              [`${prefixCls}-wrapper`]: true,
              [`${prefixCls}-wrapper-last`]: index + 1 === (data || []).length,
              [`${prefixCls}-wrapper-item-vertical`]: radioType === 'vertical',
            })}
            onClick={(e) => {
              radioClick(e, item);
            }}
          >
            <div
              className={classnames({
                [`${prefixCls}-button`]: true,
                [`${prefixCls}-checked`]: item.value === formValue,
              })}
            >
              {item.value === formValue && (
                <div className={`${prefixCls}-inner-button`}></div>
              )}
            </div>
            <div
              className={classnames({
                [`${prefixCls}-label`]: true,
                [className]: className,
              })}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
