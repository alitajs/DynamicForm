import React, { FC, useState, useMemo } from 'react';
import { Picker } from 'antd-mobile-v2';
import { INomarSelectProps } from './interface';
import TextItem from '../../baseComponents/TextItem';
import { is2Dimensionals } from './utils';

interface INomarSelectGroupProps extends Omit<INomarSelectProps, 'onChange'> {
  onChange: (values: (number | string)[] | undefined, flag: string) => void;
  //返回的数据
  value?: string | undefined;
}
const NomarSelectGroup: FC<INomarSelectGroupProps> = (props) => {
  //是否显示
  const [visible, setvisible] = useState<boolean>(false);
  // 显示出来的选择数据
  // const [pickerLabel, setPickerLabel] = useState<any>('');

  const {
    disabled = false,
    cols,
    data = [],
    coverStyle,
    title,
    fieldProps,
    placeholder = '请选择',
    positionType = 'horizontal',
    value = '',
    onClick,
    className,
    labelNumber = 7,
    extra = '',
    children,
    onChange,
    ...restProps
  } = props;

  const isVertical = positionType === 'vertical';

  /**
   * 通过value值查找对应的label  只适用二维数组
   * @param value 待查找的value值
   * @returns
   */
  const findLabelByValue = (val: string) => {
    for (let index = 0; index < data.length; index++) {
      const items = data[index] || [];
      const item = items.find((ele: { value: string }) => ele.value === val);
      if (item) {
        return item.label;
      }
    }
    return '';
  };

  /**
   * 处理联动状态数据结构
   * @param val
   * @returns
   */
  const getPickerLabelWithCascade = (val: Array<any>) => {
    const labels: string[] = [];

    const findChildLabel = (originData: Array<any>, index = 0) => {
      if (
        !Array.isArray(originData) ||
        originData.length === 0 ||
        val.length < index
      ) {
        return labels;
      }
      const origin = val[index];
      const target = originData.find((o) => o.value === origin);
      if (target) {
        const { label, children } = target || {};
        labels.push(label);
        findChildLabel(children, index + 1);
      }
    };
    findChildLabel(data);
    return labels;
  };

  /**
   * 获取所有二维数组下的值
   * @param val 目标值
   * @returns
   */
  const getPickerLabelWith2Dimensional = (val: Array<any>) => {
    const label: string[] = [];
    val.forEach((v) => {
      label.push(findLabelByValue(v));
    });
    return label;
  };

  const pickerLabel = useMemo(() => {
    let label: any[] = [];
    const isArrayData = Array.isArray(data);
    const isArrayValue = Array.isArray(value);
    if (isArrayData && isArrayValue && data.length > 0 && value.length > 0) {
      label = is2Dimensionals(data)
        ? getPickerLabelWith2Dimensional(value)
        : getPickerLabelWithCascade(value);
    }
    return label.join(',');
  }, [value, data]);

  //打开
  const fieldClick = () => {
    if (onClick) onClick(value);
    if (disabled) return;
    setvisible(true);
  };
  //确定
  const onOK = (val: (string | number)[]) => {
    onChange(val, 'change');
    setvisible(false);
  };
  const cascade = useMemo(() => {
    const cas = !is2Dimensionals(data);
    return props.cascade ?? cas;
  }, [props.cascade, data]);

  return (
    <>
      <TextItem
        isVertical={isVertical}
        value={pickerLabel}
        placeholder={placeholder}
        labelNumber={labelNumber}
        coverStyle={coverStyle}
        onClick={fieldClick}
        disabled={disabled}
        extra={extra}
        className={className}
        fieldProps={fieldProps}
        arrow={!disabled}
      >
        {children}
      </TextItem>
      <Picker
        {...restProps}
        title={title}
        visible={visible && data.length > 0}
        data={data}
        cascade={cascade}
        value={value ? `${value}`.split(',') : undefined}
        onOk={onOK}
        cols={cols}
        onDismiss={() => {
          setvisible(false);
        }}
        onVisibleChange={() => {
          setvisible(false);
        }}
      />
    </>
  );
};

export default NomarSelectGroup;
