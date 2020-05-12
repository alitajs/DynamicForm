import React, { FC, useState, useEffect } from 'react';
import { Modal, List } from 'antd-mobile';
import difference from 'lodash/difference';
import _ from 'lodash';
import differenceWith from 'lodash/differenceWith';
import classnames from 'classnames';
import { IMultiplePickerProps, IDataItem } from './interface';
import { InputItem } from '..';
import '../../styles/index.less';

const { Item } = List;

interface IMultiplePickerGroupProps extends Omit<IMultiplePickerProps, 'onChange'> {
  onChange: (values: any, flag: string) => void;
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
    required = false,
    hasStar = true,
    fieldProps,
    labelNumber = 5,
    onClick,
    leftContent = '取消',
    rightContent = '确定',
  } = props;

  const [context, setContext] = useState<IDataItem[]>([]);
  const [preContext, setPreContext] = useState<IDataItem[]>([]);
  const [preInitValue, setPreInitValue] = useState<(string | number)[]>([]);
  const [selList, setSelList] = useState<(string | number)[]>([]);
  const [modalFlag, setModalFlag] = useState<boolean>(false);
  const [multipleLabel, setMultipleLabel] = useState<string>('');

  const isVertical = positionType === 'vertical';

  useEffect(() => {
    const dataList = JSON.parse(JSON.stringify(data));
    const selLabelList: (string | number)[] = [];
    const selValueList: (string | number)[] = [];
    const nowContext = dataList.map(item => {
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
    });
    setContext(nowContext);
    if (differenceWith(nowContext, preContext, _.isEqual)) {
      if (data.length === 0) setMultipleLabel('');
      if (onChange) onChange(selValueList, 'init');
    }
  }, [data]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    if (
      context.length === 0 ||
      preInitValue.length !== 0 ||
      difference(initValue, preInitValue).length !== 0
    ) {
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
  }, [initValue]);

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
    setSelList([...preInitValue]);
  };

  const onConfirm = () => {
    const selLabelList = context.filter(it => it.flag).map(item => item.label);
    const selValueList = context.filter(it => it.flag).map(item => item.value);
    setMultipleLabel(selLabelList.join(','));
    setModalFlag(false);
    if (onChange) onChange(selValueList, 'change');
  };

  return (
    <>
      <InputItem
        isVertical={isVertical}
        value={multipleLabel}
        placeholder={placeholder}
        labelNumber={labelNumber}
        coverStyle={coverStyle}
        onClick={() => {
          if (onClick) onClick();
          openMoal();
        }}
        readOnly
      >
        {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
        <span id={fieldProps} className="alitajs-dform-title">
          {title}
        </span>
      </InputItem>
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
              {leftContent}
            </div>
            <div className="am-picker-popup-item am-picker-popup-title">{title}</div>
            <div
              className="am-picker-popup-item am-picker-popup-header-right"
              onClick={() => {
                onConfirm();
              }}
            >
              {rightContent}
            </div>
          </div>
        }
      >
        <List className="alitajs-dform-modal-content">
          {[...context].map(item => (
            <Item key={item.value}>
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
                >
                  {item.label}
                </div>
                {item.flag && <div className="alitajs-dform-tick"></div>}
              </div>
            </Item>
          ))}
        </List>
      </Modal>
    </>
  );
};

export default MultiplePickerGroup;
