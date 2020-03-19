import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';

export interface IDataItem {
  label: string;
  value: string | number;
  flag?: boolean;
  moveFlag?: boolean;
}

interface ICheckBoxGroup {
  data: IDataItem[];
  onChange?: (currentActiveLink: (string | number)[]) => void;
  initValue?: (string | number)[];
  disabled?: boolean;
  coverStyle?: React.CSSProperties;
}

const CheckBoxGroup: FC<ICheckBoxGroup> = props => {
  const { data, onChange, initValue = [], coverStyle, disabled = false } = props;
  const [context, setContext] = useState<IDataItem[]>([]);

  useEffect(() => {
    const dataList = JSON.parse(JSON.stringify(data));
    setContext(
      [...dataList].map(item => {
        const initItem = item;
        if (initValue.indexOf(initItem.value) !== -1) {
          initItem.flag = true;
        } else {
          initItem.flag = false;
        }
        return initItem;
      }),
    );
  }, [data, initValue]);

  const boxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, dataItem: IDataItem) => {
    e.stopPropagation();
    if (disabled) return;
    const values: (string | number)[] = [];
    const newData = context.map((item: IDataItem) => {
      const selItem = item;
      if (item.value === dataItem.value) selItem.flag = !item.flag;
      if (selItem.flag) values.push(selItem.value);
      return selItem;
    });
    setContext(newData);
    if (onChange) onChange(values);
  };

  return (
    <div className="alitajs-dform-box-content">
      {[...context].map((item: IDataItem) => (
        <div
          key={item.value}
          className={classnames({
            'alitajs-dform-box-wrapper': true,
          })}
          onClick={e => {
            boxClick(e, item);
          }}
        >
          <div
            className={classnames({
              'alitajs-dform-box-botton': true,
              'alitajs-dform-box-botton-checked': item.flag,
            })}
          >
            {item.flag && <div className="alitajs-dform-box-tick"></div>}
          </div>
          <div className="alitajs-dform-box-label" style={coverStyle}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxGroup;
