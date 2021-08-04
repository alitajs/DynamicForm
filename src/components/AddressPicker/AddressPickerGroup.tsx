import React, { FC, useState, useEffect, useRef } from 'react';
import { Modal, List } from 'antd-mobile';
import classnames from 'classnames';
import { IAddressPickerProps, valueProps } from './interface';
import TextItem from '../TextItem';
import './index.less';

const { Item } = List;

interface AddressPickerGroupProps
  extends Omit<IAddressPickerProps, 'onChange'> {
  onChange: (val: valueProps | undefined, flag: 'init' | 'change') => void;
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
    level,
    placeholderList = [],
    initValue = undefined,
    required = false,
    hasStar = true,
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
  } = props;

  const { label = 'label', value = 'value' } = alias;

  const [inputLabel, setInputLabel] = useState<string>(''); // input 框的值
  const [modalFlag, setModalFlag] = useState<boolean>(false); // 弹框标识

  // 弹框选中的头部文字列表
  const [labelList, setLabelList] = useState<string[]>(
    placeholderList && placeholderList.length
      ? [placeholderList[0]]
      : ['请选择'],
  );

  const [valueList, setValueList] = useState<(string | number)[]>([]); // value 值列表
  const [nowLevel, setNowLevel] = useState<number>(0); // 当前所在层级数字
  const [delFlag, setDelFlag] = useState<boolean>(false); // listClick 赋值前是否需要删除最后一个值
  const isVertical = positionType === 'vertical';

  const addressPickerRef = useRef<any>();

  const onConfirm = () => {
    const newLabelList = JSON.parse(JSON.stringify(labelList));
    // 如果当前的层级不相等的话，说明labelList 存在 placeholder 的值，要删掉
    if (nowLevel !== level && !delFlag) {
      newLabelList.splice(newLabelList.length - 1, 1);
    }
    // 赋值
    let val;
    if (valueList && valueList.length) {
      val = { label: newLabelList, value: valueList };
    }
    // 设值
    onChange(val, 'change');
    setInputLabel(newLabelList.join(','));
    setModalFlag(false); // 关闭弹框
  };

  useEffect(() => {
    // 如果列表已经无数据，且非固定层级的情况下就自动执行确认的操作
    if (!level && data.length === 0) {
      onConfirm();
    }
  }, [data]);

  useEffect(() => {
    if (!initValue) return;
    const newValue = JSON.parse(JSON.stringify(initValue));
    setInputLabel(newValue?.label.join(','));
    setLabelList(newValue?.label);
    setValueList(newValue?.value);
    setNowLevel(newValue?.value.length);
    // 如果有层级、有初始化值，无数据列表的情况下执行 onChangeLevel，保证 data 有值
    if (valueList.length === 0 && level) {
      onChangeLevel(newValue?.value);
    }
  }, [initValue]);

  /**
   * 打开弹窗
   */
  const openMoal = () => {
    if (disabled) return;
    setModalFlag(true);
  };

  /**
   * 列表点击事件
   */
  const listClick = (val: any) => {
    const newValueList = [...valueList];

    // 设置弹框顶部选中label 的值
    const newLabelList = [...labelList];
    // 如果有层级约束
    if (level) {
      if (nowLevel === level) {
        // 如果当前为最后一级，则替换掉原有值
        newLabelList.splice(newLabelList.length - 1, 1, val[label]);
        newValueList.splice(newValueList.length - 1, 1, val[value]);
      } else if (nowLevel + 1 === level) {
        // 如果当前选择后为最后一级
        newLabelList.splice(newLabelList.length - 1, 1, val[label]);
        setNowLevel(nowLevel + 1);
        newValueList.push(val[value]);
      } else {
        newLabelList.pop();
        newLabelList.push(val[label]);
        newLabelList.push(
          placeholderList.length >= newLabelList.length
            ? placeholderList[newLabelList.length]
            : '请选择',
        );
        setNowLevel(nowLevel + 1);
        newValueList.push(val[value]);
      }
      setLabelList(newLabelList);
    } else {
      newLabelList.pop();
      // 如果无固定层级，且为最后一个层级的话，选值时要先删除最后一个值
      if (delFlag) {
        newValueList.pop();
        setDelFlag(false);
      } else {
        setNowLevel(nowLevel + 1);
      }
      newLabelList.push(val?.label);
      newLabelList.push(
        placeholderList.length > newLabelList.length
          ? placeholderList[newLabelList.length]
          : '请选择',
      );
      newValueList.push(val?.value);
      setLabelList(newLabelList);
      if (addressPickerRef && addressPickerRef.current) {
        addressPickerRef.current.scrollTop = 0;
      }
      // if (document.getElementById('alitajs-dform-address-list-id')) {
      //   document.getElementById('alitajs-dform-address-list-id').scrollTop = 0;
      // }
    }
    // 调用 onChangeLevel 让用户修改数据源
    if (onChangeLevel) onChangeLevel(newValueList);
    // 保存value 值
    setValueList(newValueList);
  };

  /**
   * 选中值点击事件
   */
  const labelClick = (index: number) => {
    if (index + 1 === labelList.length) return;
    if (delFlag) setDelFlag(false);
    if (index === valueList.length) return;
    const newValueList = valueList.splice(0, index);
    const newLabelList = labelList.splice(0, index);
    if (level !== index + 1) {
      newLabelList.push(placeholderList[index]);
    }
    setValueList(newValueList);
    setLabelList(newLabelList);
    onChangeLevel(newValueList);
    setNowLevel(index);

    // if (document.getElementById('alitajs-dform-address-list-id')) {
    //   document.getElementById('alitajs-dform-address-list-id').scrollTop = 0;
    // }
    if (addressPickerRef && addressPickerRef.current) {
      addressPickerRef.current.scrollTop = 0;
    }
  };

  /**
   * 输入框点击事件
   */
  const inputClick = () => {
    if (onClick) onClick();
    // 如果无列表数据代表用户首次打开
    if (data.length === 0) {
      if (level) {
        if (onChangeLevel) onChangeLevel([]);
      } else {
        if (valueList && valueList.length) setDelFlag(true);
        const newLabelList = [...labelList];
        const newValueList = [...valueList];
        newValueList.splice(newValueList.length - 1, 1);
        if (onChangeLevel) onChangeLevel(newValueList);
        setLabelList(newLabelList);
      }
    } else {
      const newLabelList = [...labelList];
      if (
        nowLevel !== level &&
        valueList.length === labelList.length &&
        !delFlag
      ) {
        newLabelList.push(placeholderList[newLabelList.length]);
        setLabelList(newLabelList);
      }
    }
    openMoal();
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
      >
        {required && hasStar && (
          <span className="alitajs-dform-redStar">*</span>
        )}
        <span className="alitajs-dform-title">{title}</span>
      </TextItem>
      <Modal
        popup
        visible={modalFlag}
        style={{
          height,
        }}
        onClose={() => setModalFlag(false)}
        className="alitajs-dform-address"
        animationType="slide-up"
        title={
          <div className="am-picker-popup-header">
            <div
              className="am-picker-popup-item am-picker-popup-header-left"
              onClick={() => setModalFlag(false)}
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
              {[...data].map((item) => (
                <Item
                  key={item[value]}
                  onClick={() => {
                    listClick(item);
                  }}
                >
                  <div className="alitajs-dform-address-list-item">
                    <div
                      className={classnames({
                        'alitajs-dform-address-list-item-tick':
                          valueList.indexOf(item[value]) !== -1,
                      })}
                    >
                      {item[label]}
                    </div>
                    {valueList.indexOf(item[value]) !== -1 && (
                      <div className="alitajs-dform-tick" />
                    )}
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
