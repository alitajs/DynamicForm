import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import { Modal, List } from 'antd-mobile';
import difference from 'lodash/difference';
import classnames from 'classnames';
import '../../styles/index.less';

const { Item } = List;

interface IDataItem {
  label: string;
  value: string;
  flag?: boolean;
}

interface IMultiplePickerGroupProps {
  data: IDataItem[];
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: (string | number)[]) => void;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  hidden?: boolean;
  placeholder?: string;
  extra?: string | React.ReactNode;
  initValue?: (string | number)[];
  disabled?: boolean;
  maxValueLength?: number;
}

const MultiplePickerGroup: FC<IMultiplePickerGroupProps> = props => {
  const {
    data = [],
    title,
    placeholder = '请选择',
    onChange,
    disabled = false,
    positionType = 'horizontal',
    initValue = [],
    maxValueLength,
    coverStyle,
  } = props;
  const [context, setContext] = useState<IDataItem[]>([]);
  const [preContext, setPreContext] = useState<IDataItem[]>([]);
  const [preInitValue, setPreInitValue] = useState<(string | number)[]>([]);
  const [selList, setSelList] = useState<(string | number)[]>([]);
  const [modalFlag, setModalFlag] = useState<boolean>(false);
  const [multipleLabel, setMultipleLabel] = useState<string>('');

  const isVertical = positionType === 'vertical';

  useEffect(() => {
    if (context.length === 0 || difference(initValue, preInitValue).length !== 0) {
      const dataList = JSON.parse(JSON.stringify(data));
      const selLabelList: (string | number)[] = [];
      const selValueList: (string | number)[] = [];
      setContext(
        [...dataList].map(item => {
          const initItem = item;
          if (initValue.indexOf(initItem.value) !== -1) {
            if (!maxValueLength || (maxValueLength && maxValueLength > selValueList.length)) {
              initItem.flag = true;
              selLabelList.push(item.label);
              selValueList.push(item.value);
            } else {
              initItem.flag = false;
            }
          } else {
            initItem.flag = false;
          }
          return initItem;
        }),
      );
      setMultipleLabel(selLabelList.join(','));
      setPreInitValue(initValue);
      setSelList(selValueList);
    }
  }, [data, initValue]);

  const pickerClick = (val: IDataItem) => {
    const dataList = JSON.parse(JSON.stringify(context));
    if (selList.indexOf(val.value) !== -1) {
      selList.splice(selList.indexOf(val.value), 1);
    } else {
      selList.push(val.value);
    }
    if (maxValueLength && selList.length > maxValueLength) {
      selList.shift();
    }
    setContext(
      [...dataList].map(item => {
        const initItem = item;
        if (selList.indexOf(initItem.value) !== -1) {
          initItem.flag = true;
        } else {
          initItem.flag = false;
        }
        return initItem;
      }),
    );
  };

  const openMoal = () => {
    if (disabled) return;
    setPreContext([...context]);
    setModalFlag(true);
  };

  const onCancel = () => {
    setModalFlag(false);
    setContext([...preContext]);
  };

  const onConfirm = () => {
    const selLabelList = context.filter(it => it.flag).map(item => item.label);
    const selValueList = context.filter(it => it.flag).map(item => item.value);
    setMultipleLabel(selLabelList.join(','));
    setModalFlag(false);
    if (onChange) onChange(selValueList);
  };

  return (
    <>
      <div className="am-list-item am-list-item-middle alitajs-dform-multiple">
        <div className="am-list-line">
          {!isVertical && <div className="alitajs-dform-multiple-tltle">{props.children}</div>}
          <div
            className="alitajs-dform-multiple-value"
            style={{
              width: isVertical ? '100%' : '60%',
            }}
          >
            <input
              type="text"
              value={multipleLabel}
              readOnly
              style={{
                textAlign: isVertical ? 'left' : 'right',
              }}
              className="alitajs-dform-multiple-input"
              placeholder={placeholder}
              onClick={() => {
                openMoal();
              }}
            />
            <img
              className="alitajs-dform-right"
              src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2216%22%20height%3D%2226%22%20viewBox%3D%220%200%2016%2026%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cg%20id%3D%22UI-KIT_%E5%9F%BA%E7%A1%80%E5%85%83%E4%BB%B6%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20id%3D%229.9%E5%9F%BA%E7%A1%80%E5%85%83%E4%BB%B6%22%20transform%3D%22translate(-5809.000000%2C%20-8482.000000)%22%20fill%3D%22%23C7C7CC%22%3E%3Cpolygon%20id%3D%22Disclosure-Indicator%22%20points%3D%225811%208482%205809%208484%205820.5%208495%205809%208506%205811%208508%205825%208495%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              alt=""
              onClick={() => {
                openMoal();
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        popup
        visible={modalFlag}
        onClose={() => {
          onCancel();
        }}
        className="alitajs-dform-multiple-picker"
        animationType="slide-up"
        title={
          <div className="am-picker-popup-header">
            <div
              className="am-picker-popup-item am-picker-popup-header-left"
              onClick={() => {
                onCancel();
              }}
            >
              取消
            </div>
            <div className="am-picker-popup-item am-picker-popup-title">{title}</div>
            <div
              className="am-picker-popup-item am-picker-popup-header-right"
              onClick={() => {
                onConfirm();
              }}
            >
              确定
            </div>
          </div>
        }
      >
        <List className="alitajs-dform-multiple-picker-content">
          {[...context].map(item => (
            <Item>
              <div
                className="alitajs-dform-multiple-picker-item"
                onClick={() => {
                  pickerClick(item);
                }}
              >
                <div
                  className={classnames({
                    'alitajs-dform-multiple-picker-label': true,
                    'alitajs-dform-multiple-picker-checked': item.flag,
                  })}
                  style={coverStyle}
                >
                  {item.label}
                </div>
                <div className="alitajs-dform-multiple-picker-right">
                  {item.flag && <div className="alitajs-dform-multiple-picker-tick"></div>}
                </div>
              </div>
            </Item>
          ))}
        </List>
      </Modal>
    </>
  );
};

export default MultiplePickerGroup;
