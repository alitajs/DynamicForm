import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Flex } from 'antd-mobile-v2';
import chunkLodash from 'lodash.chunk';
import CSSTransition from 'react-transition-group/CSSTransition';
import { allPrefixCls } from '../../const';

import './index.less';

const { Item } = Flex;

export interface IDataItem {
  label: string | number;
  value: string | number;
  desc?: string | number;
}

interface ICheckBoxGroup {
  data: IDataItem[];
  onChange: (currentActiveLink: (string | number)[] | undefined) => void;
  value?: (string | number)[] | undefined;
  disabled?: boolean;
  disableItem?: (items: IDataItem) => boolean;
  coverStyle?: React.CSSProperties;
  chunk?: number;
  className?: string;
}

const prefixCls = `${allPrefixCls}-check-box-extends`;

const CheckBoxGroup: FC<ICheckBoxGroup> = (props) => {
  const {
    data = [],
    onChange,
    value,
    coverStyle,
    className = '',
    disabled = false,
    chunk = 1,
  } = props;

  const [val, setVal] = useState<(string | number)[] | undefined>([]);
  const [isExtandObj, setIsExtandObj] = useState<Record<string, any>>({});
  useEffect(() => {
    setVal(value);
    const newIsExtandObj = { ...isExtandObj };
    data.forEach((item) => {
      if ((value || []).indexOf(item.value) !== -1) {
        newIsExtandObj[item.value] = true;
      } else {
        newIsExtandObj[item.value] = false;
      }
    });
    setIsExtandObj(newIsExtandObj);
  }, [value, data]);

  const boxClick = (dataItem: IDataItem) => {
    const newInitValue = [...(val || [])];
    if (newInitValue.indexOf(dataItem.value) !== -1) {
      newInitValue.splice(newInitValue.indexOf(dataItem.value), 1);
    } else {
      newInitValue.push(dataItem.value);
    }
    setVal(newInitValue);
    onChange(newInitValue && newInitValue.length ? newInitValue : undefined);
  };

  const BoxContent = () =>
    chunkLodash([...data], chunk).map((list: IDataItem[], index: number) => (
      <Flex key={index} align="start">
        {[...list].map((item: IDataItem) => {
          const _disabled = disabled || props?.disableItem?.(item);
          return (
            <Item key={item.value}>
              <div
                className={classnames({
                  'alitajs-dform-box-wrapper': true,
                  'alitajs-dform-box-wrapper-disabled': _disabled,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  if (_disabled) return;
                  boxClick(item);
                }}
              >
                <div
                  className={classnames({
                    'alitajs-dform-box-botton': true,
                    'alitajs-dform-box-botton-checked': val?.includes(
                      item.value,
                    ),
                    // (value || []).indexOf(item.value) !== -1,
                  })}
                >
                  {val?.includes(item.value) && (
                    <div className="alitajs-dform-box-tick"></div>
                  )}
                </div>
                <div
                  className={classnames({
                    'alitajs-dform-box-label': true,
                    [className]: className,
                  })}
                  style={coverStyle}
                >
                  {item.label}
                </div>
              </div>
              <div className={prefixCls}>
                <CSSTransition
                  in={isExtandObj?.[item.value] || false}
                  classNames={`${prefixCls}-body`}
                  timeout={200}
                >
                  {(state) => (
                    <div className={`${prefixCls}-body`}>
                      <div
                        className={classnames(`${prefixCls}-animation`, {
                          [`${prefixCls}-entered`]: state === 'entered',
                        })}
                      >
                        {item.desc}
                      </div>
                    </div>
                  )}
                </CSSTransition>
              </div>
            </Item>
          );
        })}
      </Flex>
    ));

  return <div className="alitajs-dform-box-content">{BoxContent()}</div>;
};

export default CheckBoxGroup;
