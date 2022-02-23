import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { allPrefixCls } from '../../const/index';
import './index.less';
import { DformContext } from '../../baseComponents/Context';
import PcLayout from '../../baseComponents/PcLayout';
import { Radio, Space } from 'antd';

const prefixCls = 'alitajs-dform-radio';
const pcPrefixCls = 'alitajs-dform-pc-radio';

export interface IDataItem {
  label: string;
  value: string;
  disabled?: boolean;
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
  buttonStyle?: 'outline' | 'solid';
  optionType?: 'default' | 'button';
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
    optionType = 'default',
    ...otherprops
  } = props;
  const [activeValue, setActiveValue] = useState<string | number | undefined>(
    undefined,
  );
  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

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

  const renderDefault = () => {
    return (
      <div
        className={classnames({
          [prefixCls]: true,
          [`${allPrefixCls}-vertical-radio`]: isVertical,
        })}
      >
        {!isVertical && (
          <div
            className={classnames({
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
                [`${prefixCls}-wrapper-last`]:
                  index + 1 === (data || []).length,
                [`${prefixCls}-wrapper-item-vertical`]:
                  radioType === 'vertical',
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

  const renderRadio = (item: IDataItem, index: number) => {
    return (
      <div
        key={item.value}
        className={classnames({
          [`${pcPrefixCls}-item`]: true,
          [`${pcPrefixCls}-item-last`]: index + 1 === (data || []).length,
          [`${pcPrefixCls}-vertical`]: isVertical,
        })}
      >
        <Radio value={item.value} disabled={item.disabled}>
          {item.label}
        </Radio>
      </div>
    );

    // button类型不生效
    if (optionType === 'default') {
      return (
        <div
          key={item.value}
          className={classnames({
            [`${pcPrefixCls}-item`]: true,
            [`${prefixCls}-item-last`]: index + 1 === (data || []).length,
          })}
        >
          <Radio value={item.value} disabled={item.disabled}>
            {item.label}
          </Radio>
        </div>
      );
    }
    return (
      <div key={item.value}>
        <Radio.Button value={item.value} disabled={item.disabled}>
          {item.label}
        </Radio.Button>
      </div>
    );
  };

  const renderPcContent = () => {
    return (
      <PcLayout
        isVertical={isVertical}
        left={children}
        right={
          <div
            className={classnames({
              [`${pcPrefixCls}`]: true,
            })}
          >
            <Radio.Group
              // {...otherprops}
              value={formValue}
              disabled={disabled}
              onChange={(e: any) => {
                onChange(e?.target?.value);
              }}
            >
              <div
                className={classnames({
                  [`${pcPrefixCls}-content`]: true,
                })}
              >
                {radioType === 'vertical' ? (
                  <Space direction={radioType}>
                    {data.map((item: IDataItem, index: number) => {
                      return renderRadio(item, index);
                    })}
                  </Space>
                ) : (
                  data.map((item: IDataItem, index: number) => {
                    return renderRadio(item, index);
                  })
                )}
              </div>
            </Radio.Group>
          </div>
        }
      />
    );
  };
  return (
    <DformContext.Consumer>
      {({ isPc }: any) => {
        if (!isPc) return renderDefault();
        return renderPcContent();
      }}
    </DformContext.Consumer>
  );
};

export default RadioGroup;
