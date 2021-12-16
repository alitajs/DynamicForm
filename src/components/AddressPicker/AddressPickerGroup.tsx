import React, { FC, useState, useEffect, useRef } from 'react';
import { Modal, List } from 'antd-mobile-v2';
import classnames from 'classnames';
import { IAddressPickerProps, valueProps, IModalData } from './interface';
import TextItem from '../TextItem';
import './index.less';

const { Item } = List;

interface AddressPickerGroupProps
  extends Omit<IAddressPickerProps, 'onChange'> {
  onChange: (val: valueProps | undefined, flag: 'init' | 'change') => void;
  value?: valueProps | undefined;
}

const AddressPickerGroup: FC<AddressPickerGroupProps> = (props) => {
  const {
    fieldProps,
    data = [],
    placeholder = '请选择',
    positionType = 'horizontal',
    title,
    disabled = false,
    onChangeLevel,
    onChange,
    // level,
    placeholderList = [],
    value = undefined,
    children,
    labelNumber = 5,
    coverStyle,
    onClick,
    height = '70vh',
    rightContent = '确定',
    leftContent = '取消',
    noData = '',
    loading = false,
    className = '',
    alias = {
      label: 'label',
      value: 'value',
    },
    lastLevel,
  } = props;

  const { label = 'label' } = alias;

  const [inputLabel, setInputLabel] = useState<string>(''); // input 框的值
  const [modalFlag, setModalFlag] = useState<boolean>(false); // 弹框标识

  // 弹框选中的头部文字列表
  const [labelList, setLabelList] = useState<string[]>([]);

  const [valueList, setValueList] = useState<(string | number)[]>([]); // value 值列表
  const isVertical = positionType === 'vertical';

  const addressPickerRef = useRef<any>();

  useEffect(() => {
    if (!!data.length && !lastLevel && modalFlag) {
      const newLabelList = [...labelList];
      const labelListLength = labelList.length;
      if (valueList.length === newLabelList.length)
        newLabelList.push(placeholderList[labelListLength] || '请选择');
      setLabelList(newLabelList);
      if (addressPickerRef && addressPickerRef.current) {
        addressPickerRef.current.scrollTop = 0;
      }
    } else {
    }
  }, [data, modalFlag, lastLevel]);

  useEffect(() => {
    if (!value) return;
    const newValue = JSON.parse(JSON.stringify(value));
    setInputLabel(newValue?.label.join(' '));
    setLabelList(newValue?.label);
    setValueList(newValue?.value);
  }, [value]);

  const onConfirm = () => {
    const newLabelList = JSON.parse(JSON.stringify(labelList));
    if (!lastLevel) {
      newLabelList.pop();
    }
    // 赋值
    let val;
    if (valueList && valueList.length) {
      val = { label: newLabelList, value: valueList };
    }
    // 设值
    onChange(val, 'change');
    setInputLabel(newLabelList.join(' '));
    setModalFlag(false); // 关闭弹框
  };

  /**
   * 打开弹窗
   */
  const openMoal = () => {
    if (disabled) return;
    setModalFlag(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setModalFlag(false);
    if (!!value) {
      const newValue = JSON.parse(JSON.stringify(value));
      setTimeout(() => {
        setInputLabel(newValue?.label.join(' '));
        setLabelList(newValue?.label);
        setValueList(newValue?.value);
      }, 100);
    }
  };

  /**
   * 列表点击事件
   */
  const listClick = (val: any) => {
    const newValueList = [...valueList];

    // 设置弹框顶部选中label 的值
    const newLabelList = [...labelList];

    if (lastLevel) {
      newValueList.splice(
        newValueList.length - 1,
        1,
        val[alias?.value || 'value'],
      );
    } else {
      newValueList.push(val[alias?.value || 'value']);
    }

    newLabelList.splice(newLabelList.length - 1, 1, val[label]);

    // 调用 onChangeLevel 让用户修改数据源
    if (onChangeLevel) onChangeLevel(newValueList);
    // 保存value 值
    setValueList(newValueList);
    setLabelList(newLabelList);
  };

  /**
   * 选中值点击事件
   */
  const labelClick = (index: number) => {
    if (index + 1 === labelList.length) return;
    if (index === valueList.length) return;
    const newValueList = valueList.splice(0, index);
    const newLabelList = labelList.splice(0, index);
    setValueList(newValueList);
    setLabelList(newLabelList);
    if (onChangeLevel) onChangeLevel(newValueList);
  };

  /**
   * 输入框点击事件
   */
  const inputClick = () => {
    if (onClick) onClick();
    if (onChangeLevel) onChangeLevel(valueList);
    if (!modalFlag) {
      openMoal();
    }
  };

  const listReverse = [];
  // eslint-disable-next-line no-plusplus
  for (let i = labelList.length; i < 4; i++) {
    listReverse.push(Math.random().toString(36).substring(7));
  }

  return (
    <>
      <TextItem
        isVertical={isVertical}
        value={inputLabel}
        placeholder={placeholder}
        disabled={disabled}
        coverStyle={coverStyle}
        className={className}
        labelNumber={labelNumber}
        onClick={inputClick}
        fieldProps={fieldProps}
        arrow={!disabled}
      >
        {children}
      </TextItem>
      <Modal
        popup
        visible={modalFlag}
        style={{
          height,
        }}
        onClose={() => closeModal()}
        className="alitajs-dform-address"
        animationType="slide-up"
        title={
          <div className="am-picker-popup-header">
            <div
              className="am-picker-popup-item am-picker-popup-header-left"
              onClick={() => closeModal()}
            >
              {leftContent}
            </div>
            <div className="am-picker-popup-item am-picker-popup-title">
              {title}
            </div>
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
        <div className="alitajs-dform-address-content">
          <div className="alitajs-dform-address-value">
            {[...labelList].map((labelText: any, index: number) => (
              <div
                key={labelText}
                onClick={() => {
                  labelClick(index);
                }}
                className="alitajs-dform-address-label"
              >
                <div
                  className={classnames({
                    'alitajs-dform-address-value-item-label': true,
                    'alitajs-dform-address-value-select':
                      index + 1 === labelList.length,
                  })}
                >
                  {labelText}
                </div>
                {index + 1 === labelList.length && (
                  <div className="alitajs-dform-address-underline" />
                )}
              </div>
            ))}
          </div>
          {data && data.length === 0 && !loading && noData}
          <div
            ref={addressPickerRef}
            id="alitajs-dform-address-list-id"
            className="alitajs-dform-address-list"
            style={{ display: data.length ? '' : 'none' }}
          >
            <List>
              {[...data].map((item: IModalData) => (
                <Item
                  key={item[alias?.value || 'value']}
                  onClick={() => {
                    listClick(item);
                  }}
                >
                  <div className="alitajs-dform-address-list-item">
                    <div
                      className={classnames({
                        'alitajs-dform-address-list-item-common': true,
                        'alitajs-dform-address-list-item-tick':
                          valueList.indexOf(item[alias?.value || 'value']) !==
                          -1,
                      })}
                    >
                      {item[label]}
                    </div>
                    {valueList.indexOf(item[alias?.value || 'value']) !==
                      -1 && <div className="alitajs-dform-tick" />}
                  </div>
                </Item>
              ))}
            </List>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddressPickerGroup;
