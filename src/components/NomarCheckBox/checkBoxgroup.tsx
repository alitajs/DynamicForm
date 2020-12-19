import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Flex } from 'antd-mobile';
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
  onChange: (currentActiveLink: (string | number)[] | undefined, flag: 'init' | 'change') => void;
  initValue?: string | undefined;
  disabled?: boolean;
  coverStyle?: React.CSSProperties;
  chunk?: number;
}

const CheckBoxGroup: FC<ICheckBoxGroup> = props => {
  const { data = [], onChange, initValue, coverStyle, disabled = false, chunk = 1 } = props;
  const [preValue, setPreValue] = useState<string | undefined>('[]');
  useEffect(() => {
    // 存在延迟赋值的情况将值保存
    if (data.length === 0 && initValue) {
      setPreValue(initValue);
    }

    if (!data || data.length === 0) {
      onChange(undefined, 'init');
      return;
    }
    const newInitValue = initValue ? JSON.parse(initValue) : [];
    const filter = data.filter(item => newInitValue.indexOf(item.value) !== -1);
    if (filter && filter.length) {
      const newValue = filter.map(item => item?.value);
      onChange(newValue, 'init');
    } else {
      onChange(undefined, 'init');
    }
  }, [initValue]);

  useEffect(() => {
    // 存在延迟赋值的情况将值保存
    if (data.length === 0) {
      onChange(undefined, 'init');
      return;
    }
    let newValue = initValue;
    // 判断是否使用初始值，满足延迟赋数据源的情况
    if (preValue && !initValue) {
      newValue = preValue;
      setPreValue(undefined);
    }

    const newInitValue = newValue ? JSON.parse(newValue) : [];
    const filter = data.filter(item => newInitValue.indexOf(item.value) !== -1);
    if (filter && filter.length) {
      const newValue = filter.map(item => item?.value);
      onChange(newValue, 'init');
    } else {
      onChange(undefined, 'init');
    }
  }, [data]);

  const boxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, dataItem: IDataItem) => {
    e.stopPropagation();
    if (disabled) return;
    const newInitValue = initValue ? JSON.parse(initValue) : [];
    if (newInitValue.indexOf(dataItem.value) !== -1) {
      newInitValue.splice(newInitValue.indexOf(dataItem.value), 1);
    } else {
      newInitValue.push(dataItem.value);
    }
    onChange(newInitValue && newInitValue.length ? newInitValue : undefined, 'change');
  };

  const BoxContent = () =>
    chunkLodash([...data], chunk).map((list: IDataItem[], index: number) => (
      // eslint-disable-next-line react/no-array-index-key
      <Flex key={index}>
        {[...list].map((item: IDataItem) => (
          <Item key={item.value}>
            <div
              className="alitajs-dform-box-wrapper"
              onClick={e => {
                boxClick(e, item);
              }}
            >
              <div
                className={classnames({
                  'alitajs-dform-box-botton': true,
                  'alitajs-dform-box-botton-checked':
                    JSON.parse(initValue || '[]').indexOf(item.value) !== -1,
                })}
              >
                {JSON.parse(initValue || '[]').indexOf(item.value) !== -1 && (
                  <div className="alitajs-dform-box-tick"></div>
                )}
              </div>
              <div className="alitajs-dform-box-label" style={coverStyle}>
                {item.label}
              </div>
            </div>
          </Item>
        ))}
      </Flex>
    ));

  return <div className="alitajs-dform-box-content">{BoxContent()}</div>;
};

export default CheckBoxGroup;
