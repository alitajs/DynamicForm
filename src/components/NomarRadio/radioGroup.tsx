import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import '../../styles/index.less';

export interface IDataItem {
  label: string;
  value: string | number;
  flag?: boolean;
  moveFlag?: boolean;
}

export interface INomarRadioGroupProps {
  data: IDataItem[];
  positionType?: 'horizontal' | 'vertical';
  radioType?: 'horizontal' | 'vertical';
  initValue?: string | number;
  disabled?: boolean;
}

const RadioGroup: FC<INomarRadioGroupProps> = props => {
  const {
    data,
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    initValue,
    disabled = false,
  } = props;
  const [context, setContext] = useState<IDataItem[]>([]);

  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  useEffect(() => {
    const dataList = JSON.parse(JSON.stringify(data));
    setContext(
      [...dataList].map(item => {
        const initItem = item;
        // if (initItem.value === initValue) {
        //   initItem.flag = true;
        // } else {
        initItem.flag = false;
        // }
        initItem.moveFlag = false;
        return initItem;
      }),
    );
  }, [data, initValue]);

  const radioClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, dataItem: IDataItem) => {
    e.stopPropagation();
    if (disabled) return;
    if (onChange) onChange(`${dataItem.value}`);
    setContext(
      context.map((item: IDataItem) => {
        const selItem = item;
        if (item.value === dataItem.value) {
          selItem.flag = true;
        } else {
          selItem.flag = false;
        }
        return selItem;
      }),
    );
  };

  return (
    <div
      className={classnames({
        'alitajs-dform-radio-group': true,
        'alitajs-dform-radio-position': !isVertical,
        'alitajs-dform-radio-item-vertical': radioType === 'vertical',
      })}
    >
      {context.map((item: IDataItem) => (
        <div
          key={item.value}
          onClick={e => {
            radioClick(e, item);
          }}
        >
          <div style={{ width: '0.3rem', height: '0.3rem', background: 'red' }}></div>
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
