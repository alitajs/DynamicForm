import React, { FC, useState, useEffect } from 'react';
import { Modal, List } from 'antd-mobile';
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
    initValue,
    maxValueLength,
    coverStyle,
    required = false,
    hasStar = true,
    fieldProps,
    labelNumber = 5,
    onClick,
    leftContent = '取消',
    rightContent = '确定',
    height,
  } = props;

  const [selValueList, setSelValueList] = useState<(string | number)[]>([]); // 当前选中的值列表
  const [modalFlag, setModalFlag] = useState<boolean>(false); // 弹框标识
  const [multipleLabel, setMultipleLabel] = useState<string>(''); // 表单上展示的 label 列表

  const isVertical = positionType === 'vertical';

  /**
   * 设值
   * @param da 数据源
   * @param val 值
   */
  const setValues = (da: IDataItem[], val: string | undefined, flag = 'init') => {
    const filter = data.filter(item => JSON.parse(val || '[]')?.indexOf(item.value) !== -1);
    const labels = filter.map(item => item.label);
    const values = filter.map(item => item.value);
    setMultipleLabel(labels.join(','));
    setSelValueList(values);
    onChange(values, flag);
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      onChange(undefined, 'init');
      return;
    }
    setValues(data, initValue);
  }, [initValue, data]);

  const pickerClick = (val: IDataItem) => {
    let list = JSON.parse(JSON.stringify(selValueList));
    if (list.indexOf(val.value) !== -1) {
      list.splice(list.indexOf(val.value), 1);
    } else {
      list.push(val.value);
    }
    if (maxValueLength && list.length > maxValueLength) {
      list.shift();
    }
    setSelValueList(list);
  };

  const openMoal = () => {
    if (disabled) return;
    setValues(data, initValue);
    setModalFlag(true);
  };

  const onCancel = () => {
    setModalFlag(false);
  };

  const onConfirm = () => {
    setModalFlag(false);
    setValues(data, JSON.stringify(selValueList), 'change');
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
        <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
          {title}
        </span>
      </InputItem>
      <Modal
        popup
        visible={modalFlag}
        onClose={() => {
          onCancel();
        }}
        style={{
          height,
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
          {[...data].map(item => (
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
                    'alitajs-dform-multiple-picker-checked':
                      selValueList.indexOf(item?.value) !== -1,
                  })}
                >
                  {item.label}
                </div>
                {selValueList.indexOf(item?.value) !== -1 && (
                  <div className="alitajs-dform-tick"></div>
                )}
              </div>
            </Item>
          ))}
        </List>
      </Modal>
    </>
  );
};

export default MultiplePickerGroup;
