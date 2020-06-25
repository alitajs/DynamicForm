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
  onChange: (currentActiveLink: string | number | undefined, flag: string) => void;
  coverStyle?: React.CSSProperties;
}

const RadioGroup: FC<INomarRadioGroupProps> = props => {
  const {
    data,
    onChange,
    positionType = 'horizontal',
    radioType = 'horizontal',
    initValue,
    disabled = false,
    coverStyle,
  } = props;
  const [context, setContext] = useState<IDataItem[]>([]);
  const [preValue, setPreValue] = useState<string | number | undefined>(undefined);

  let isVertical = positionType === 'vertical';
  if (radioType === 'vertical') {
    isVertical = true;
  }

  useEffect(() => {
    if (initValue) setPreValue(initValue);
    let flag = false;
    let nowValue = initValue;
    if (!initValue && preValue) nowValue = preValue;
    const dataList = JSON.parse(JSON.stringify(data));
    setContext(
      [...dataList].map(item => {
        const initItem = item;
        if (initItem.value === nowValue) {
          initItem.flag = true;
          flag = true;
        } else {
          initItem.flag = false;
        }
        initItem.moveFlag = false;
        return initItem;
      }),
    );
    if (initValue === preValue) return;
    if (!flag) {
      onChange(undefined, 'init');
    } else {
      onChange(nowValue, 'init');
    }
  }, [data, initValue]);

  const radioClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, dataItem: IDataItem) => {
    e.stopPropagation();
    if (disabled) return;
    onChange(dataItem.value, 'change');
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
          className={classnames({
            'alitajs-dform-radio-wrapper': true,
            'alitajs-dform-radio-wrapper-item-vertical': radioType === 'vertical',
          })}
          onClick={e => {
            radioClick(e, item);
          }}
        >
          <div
            className={classnames({
              'alitajs-dform-radio-button': true,
              'alitajs-dform-radio-checked': item.flag,
            })}
          >
            {item.flag && <div className="alitajs-dform-radio-inner-button"></div>}
          </div>
          <div className="alitajs-dform-radio-label" style={coverStyle}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
