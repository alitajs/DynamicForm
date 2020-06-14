import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import '../../styles/index.less';

export interface IDataItem {
  label: string;
  value: string | number;
  flag?: boolean;
  moveFlag?: boolean;
}

interface IRadioGroup {
  data: IDataItem[];
  onChange: (currentActiveLink: string | number | undefined, flag: string) => void;
  positionType?: 'horizontal' | 'vertical';
  radioType?: 'horizontal' | 'vertical';
  initValue?: string | number;
  disabled?: boolean;
  coverStyle?: React.CSSProperties;
}

const RadioGroup: FC<IRadioGroup> = props => {
  const {
    data,
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    initValue = '',
    disabled = false,
    coverStyle,
  } = props;
  const [context, setContext] = useState<IDataItem[]>([]);

  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  useEffect(() => {
    let flag = false;
    const dataList = JSON.parse(JSON.stringify(data));
    setContext(
      [...dataList].map(item => {
        const initItem = item;
        if (initItem.value === initValue) {
          initItem.flag = true;
          flag = true;
        } else {
          initItem.flag = false;
        }
        initItem.moveFlag = false;
        return initItem;
      }),
    );
    if (!flag) onChange(undefined, 'init');
  }, [data, initValue]);

  const radioMove = (flag: boolean, val: IDataItem) => {
    if (disabled) return;
    setContext(
      context.map((item: IDataItem) => {
        const selItem = item;
        if (item.value === val.value) {
          selItem.moveFlag = flag;
        } else {
          selItem.moveFlag = false;
        }
        return selItem;
      }),
    );
  };

  const radioClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, dataItem: IDataItem) => {
    e.stopPropagation();
    if (disabled) return;
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
        'alitajs-dform-cover-radio-group': true,
        'alitajs-dform-cover-radio-position': !isVertical,
        'alitajs-dform-cover-radio-item-vertical': radioType === 'vertical',
      })}
    >
      {[...context].map((item: IDataItem) => (
        <div
          key={item.value}
          className={classnames({
            'alitajs-dform-cover-radio-wrapper': true,
            'alitajs-dform-cover-radio-wrapper-checked': item.flag,
            'alitajs-dform-cover-radio-wrapper-margin': isVertical,
            'alitajs-dform-cover-radio-wrapper-cover': item.moveFlag && !item.flag,
          })}
          style={coverStyle}
          onMouseDown={() => {
            radioMove(true, item);
          }}
          onMouseUp={() => {
            radioMove(false, item);
          }}
          onClick={e => {
            radioClick(e, item);
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
