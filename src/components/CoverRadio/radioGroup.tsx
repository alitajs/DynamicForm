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
  onChange: (
    currentActiveLink: string | number | undefined,
    flag: string,
  ) => void;
  positionType?: 'horizontal' | 'vertical';
  radioType?: 'horizontal' | 'vertical';
  value?: string | number;
  disabled?: boolean;
  coverStyle?: React.CSSProperties;
  className?: string;
  labelNumber: number;
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
    children,
  } = props;
  const [preValue, setPreValue] = useState<string | number | undefined>(
    undefined,
  );
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
      onChange(undefined, 'init');
      setActiveValue(undefined);
      return;
    }
    let newValue = value;
    // 判断是否使用初始值，满足延迟赋数据源的情况
    if (preValue && !value) {
      newValue = preValue;
      setPreValue(undefined);
    }
    const filter = data.filter((item) => item.value === newValue);
    if (filter && filter.length) {
      setActiveValue(newValue);
      if (preValue) {
        // 如果存在原始值的话 需要修改下表单值
        onChange(newValue, 'init');
      }
    } else {
      setActiveValue(undefined);
      onChange(undefined, 'init');
    }
  }, [data]);

  useEffect(() => {
    // 存在延迟数据源的情况，将值保存
    if (data.length === 0 && value) setPreValue(value);
    if (data.length === 0) {
      onChange(undefined, 'init');
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
        onChange(undefined, 'change');
        setActiveValue(undefined);
      } else {
        onChange(dataItem?.value, 'change');
        setActiveValue(dataItem?.value);
      }
    } else {
      onChange(undefined, 'change');
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
                item.value && item.value === activeValue,
              [`${prefixCls}-wrapper-margin`]: isVertical,
              [`${prefixCls}-wrapper-cover`]:
                item.moveFlag && item.value !== activeValue,
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
