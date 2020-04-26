import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Flex } from 'antd-mobile';
import difference from 'lodash/difference';
import chunkLodash from 'lodash/chunk';

const { Item } = Flex;

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
  chunk?: number;
}

const CheckBoxGroup: FC<ICheckBoxGroup> = props => {
  const { data, onChange, initValue = [], coverStyle, disabled = false, chunk = 1 } = props;
  const [context, setContext] = useState<IDataItem[]>([]);
  const [preInitValue, setPreInitValue] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    if (context.length === 0 || difference(initValue, preInitValue).length !== 0) {
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
      setPreInitValue(initValue);
    }
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

  const aa = () =>
    chunkLodash([...context], chunk).map((list: IDataItem[], index: number) => (
      // eslint-disable-next-line react/no-array-index-key
      <Flex key={index}>
        {[...list].map((item: IDataItem) => (
          <Item key={item.value}>
            <div
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
          </Item>
        ))}
      </Flex>
    ));

  return <div className="alitajs-dform-box-content">{aa()}</div>;
};

export default CheckBoxGroup;
