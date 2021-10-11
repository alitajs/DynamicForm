import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { allPrefixCls } from '../../const/index';
import './index.less';

const prefixCls = 'alitajs-dform-cover-radio';

export interface IDataItem {
  [key: string]: string | number;
}

interface IRadioGroup {
  data: IDataItem[];
  onChange: (currentActiveLink: string | number | undefined) => void;
  positionType?: 'horizontal' | 'vertical';
  radioType?: 'horizontal' | 'vertical';
  value?: string | number;
  disabled?: boolean;
  coverStyle?: React.CSSProperties;
  className?: string;
  labelNumber: number;
  formFlag?: boolean;
}

const RadioGroup: FC<IRadioGroup> = (props) => {
  const {
    data,
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    value = '',
    disabled = false,
    coverStyle,
    className = '',
    labelNumber = 5,
    formFlag = false,
    children,
  } = props;
  const [activeValue, setActiveValue] = useState<string | number | undefined>(
    undefined,
  );
  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  const formValue = formFlag ? activeValue : value;

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
    let newValue = value;
    const filter = data.filter((item) => item.value === newValue);
    if (filter && filter.length) {
      setActiveValue(newValue);
    } else {
      setActiveValue(undefined);
    }
  }, [data]);

  useEffect(() => {
    // 存在延迟数据源的情况，将值保存
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
        onChange(undefined);
        setActiveValue(undefined);
      } else {
        onChange(dataItem?.value);
        setActiveValue(dataItem?.value);
      }
    } else {
      onChange(undefined);
    }
  };

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
        })}
      >
        {data.map((item: IDataItem) => (
          <div
            key={item.value}
            className={classnames({
              [`${prefixCls}-wrapper`]: true,
              [`${prefixCls}-wrapper-checked`]:
                item.value && item.value === formValue,
              [`${prefixCls}-wrapper-margin`]: isVertical,
              [`${prefixCls}-wrapper-cover`]:
                item.moveFlag && item.value !== formValue,
              [className]: className,
            })}
            style={coverStyle}
            onClick={(e) => {
              radioClick(e, item);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
