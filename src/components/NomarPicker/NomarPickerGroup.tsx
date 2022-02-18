import React, { FC, useState, useEffect } from 'react';
import { Picker, Toast } from 'antd-mobile-v2';
import { Select } from 'antd';
import PcLayout from '../../baseComponents/PcLayout';
import TextItem from '../../baseComponents/TextItem';
import { DformContext } from '../../baseComponents/DynamicForm';
import { INomarPickerProps } from './interface';

const { Option } = Select;

interface INomarPickerGroupProps extends Omit<INomarPickerProps, 'onChange'> {
  onChange: (values: number | string | undefined) => void;
  value?: string | number;
}

const NomarPickerGroup: FC<INomarPickerGroupProps> = (props) => {
  const [visible, setvisible] = useState<boolean>(false);
  const [pickerLabel, setPickerLabel] = useState<any>('');
  const {
    fieldProps,
    children,
    data = [],
    title,
    placeholder = '请选择',
    onChange,
    disabled = false,
    positionType = 'horizontal',
    coverStyle,
    labelNumber = 5,
    extra = '',
    className,
    onClick,
    value,
    clear = false,
    ...otherPorps
  } = props;
  const isVertical = positionType === 'vertical';

  useEffect(() => {
    if (data.length === 0) {
      setPickerLabel('');
      return;
    }
    const filterList = data.filter((item) => item?.value === value);
    if (filterList && filterList.length) {
      setPickerLabel(filterList[0].label);
    } else {
      setPickerLabel('');
    }
  }, [value]);

  useEffect(() => {
    if (data && data.length) {
      const nowValue = value;
      const filterList = data.filter((item) => item?.value === nowValue);
      if (filterList && filterList.length) {
        setPickerLabel(filterList[0].label);
      } else {
        setPickerLabel('');
      }
    } else {
      setPickerLabel('');
    }
  }, [data]);

  const fieldClick = () => {
    if (disabled) return;
    if (!!!data.length && !!onClick) {
      onClick(value);
      return;
    } else if (!!!data.length) {
      Toast.fail('数据未配置');
      return;
    }
    if (!!onClick) {
      onClick(value);
    }
    setvisible(true);
  };

  const onOK = (val: (string | number)[]) => {
    setvisible(false);
    onChange(val[0]);
  };

  /**
   * 清理按钮点击事件
   */
  const clearClick = () => {
    onChange(undefined);
  };

  return (
    <DformContext.Consumer>
      {({ isPc }: any) => {
        return (
          <React.Fragment>
            {!isPc && (
              <>
                <TextItem
                  isVertical={isVertical}
                  value={`${pickerLabel}`}
                  placeholder={placeholder}
                  labelNumber={labelNumber}
                  coverStyle={coverStyle}
                  onClick={fieldClick}
                  disabled={disabled}
                  extra={extra}
                  className={className}
                  fieldProps={fieldProps}
                  arrow={!disabled}
                  clear={clear}
                  clearClick={clearClick}
                >
                  {children}
                </TextItem>
                <Picker
                  title={title}
                  visible={visible && data.length > 0}
                  data={data as any}
                  cols={1}
                  value={value ? [value] : undefined}
                  onOk={onOK}
                  onDismiss={() => {
                    setvisible(false);
                  }}
                  onVisibleChange={() => {
                    setvisible(false);
                  }}
                />
              </>
            )}
            {isPc && (
              <PcLayout
                isVertical={isVertical}
                left={children}
                right={
                  <Select
                    {...otherPorps}
                    value={value}
                    style={{ width: '100%', ...coverStyle }}
                    onChange={(e: any) => {
                      onChange(e);
                    }}
                    allowClear={clear}
                    placeholder={placeholder}
                    disabled={disabled}
                  >
                    {data.map((item) => (
                      <Option key={item?.value} value={item?.value}>
                        {item?.label}
                      </Option>
                    ))}
                  </Select>
                }
              />
            )}
          </React.Fragment>
        );
      }}
    </DformContext.Consumer>
  );
};

export default NomarPickerGroup;
