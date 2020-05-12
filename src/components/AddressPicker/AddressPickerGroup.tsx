import React, { FC, useState, useEffect } from 'react';
import { Modal, Flex, List } from 'antd-mobile';
import classnames from 'classnames';
import _ from 'lodash';
import isEqual from 'lodash/isEqual';
import { IModalData, IAddressPickerProps } from './interface';
import { resetLabel } from '../../utils';
import { InputItem } from '..';
import '../../styles/index.less';

const { Item } = List;

const AddressPickerGroup: FC<IAddressPickerProps> = props => {
  const {
    data = [],
    placeholder = '请选择',
    positionType = 'horizontal',
    title,
    disabled = false,
    onChangeLevel,
    onChange,
    level = 3,
    placeholderList = [],
    initValue = {
      label: [],
      value: [],
    },
    required = false,
    hasStar = true,
    fieldProps,
    labelNumber = 5,
    coverStyle,
    onClick,
    leftContent = '取消',
    rightContent = '确定',
  } = props;

  // input 框的值
  const [inputLabel, setInputLabel] = useState<string>('');
  const [modalFlag, setModalFlag] = useState<boolean>(false);

  // 弹框选中的头部文字列表
  const [labelList, setLabelList] = useState<string[]>(
    placeholderList && placeholderList.length ? [placeholderList[0]] : ['请选择'],
  );

  const [preInitValue, setPreInitValue] = useState({});

  // value 值列表
  const [valueList, setValueList] = useState<(string | number)[]>([]);

  // 当前列表数据
  const [dataList, setDataList] = useState<IModalData[] | []>([]);

  // 当前所在层级数字
  const [nowLevel, setNowLevel] = useState<number>(0);

  const isVertical = positionType === 'vertical';

  useEffect(() => {
    if (onChange) onChange({ label: [], value: [] });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    setDataList(
      data.map(item => {
        const newItem = item;
        if (newItem.value === valueList[valueList.length - 1]) {
          newItem.flag = true;
        } else newItem.flag = false;
        return newItem;
      }),
    );
  }, [data]);

  useEffect(() => {
    if (!isEqual(preInitValue, initValue)) {
      const { label = [], value = [] } = initValue;
      setDataList(
        data.map(item => {
          const newItem = item;
          if (newItem.value === value[value.length]) {
            newItem.flag = true;
          } else newItem.flag = false;
          return newItem;
        }),
      );
      const newLabelList = resetLabel(JSON.parse(JSON.stringify([...label])), placeholderList);
      setLabelList(newLabelList);
      setNowLevel(value.length);
      if (onChangeLevel) onChangeLevel(value);
      setInputLabel(label.join(','));
      setValueList(value);
      setPreInitValue(initValue);
    }
  }, [initValue]);

  const openMoal = () => {
    if (disabled) return;
    setModalFlag(true);
  };

  const onCancel = () => {
    setModalFlag(false);
  };

  const onConfirm = () => {
    const newLabelList = JSON.parse(JSON.stringify(labelList));
    if (nowLevel !== level) newLabelList.pop();
    setInputLabel(newLabelList.join(','));
    if (onChange) onChange({ label: newLabelList, value: valueList });
    setModalFlag(false);
  };

  const listClick = (val: any) => {
    // 选中数据的时候刷新列表
    setDataList(
      [...dataList].map((item: any) => {
        const newItem = item;
        if (item.value === val.value) newItem.flag = true;
        else newItem.flag = false;
        return newItem;
      }),
    );

    const newList = JSON.parse(JSON.stringify(labelList));
    const newValueList = JSON.parse(JSON.stringify(valueList));

    // 设置当前层级
    newList.splice(newList.length - 1, 1, val.label);
    let insLevel = nowLevel;
    if (nowLevel !== level) insLevel += 1;
    setNowLevel(insLevel);

    // 如果层级符合，将数据放入input 中，并且关闭弹框
    const newLabelList = JSON.parse(JSON.stringify(newList));
    if (insLevel === level) {
      if (insLevel !== level) newLabelList.pop();
      setInputLabel(newLabelList.join(','));
      if (onChange) onChange({ label: newLabelList, value: newValueList });
      setModalFlag(false);
    }
    if (newValueList.length === insLevel) {
      newValueList.pop();
    }
    newValueList.push(val.value);

    // 设置头部展示列表和值列表
    setLabelList(resetLabel(newList, placeholderList));
    setValueList(newValueList);
    // 调用改变层级的事件给用户
    if (onChangeLevel) onChangeLevel(newValueList);
  };

  const labelClick = (index: number) => {
    // 设置当前的层级
    setNowLevel(index);

    const newLabelList = labelList.splice(0, index);
    const newValueList = valueList.splice(0, index);

    // 设置头部展示列表
    setLabelList(resetLabel(JSON.parse(JSON.stringify(newLabelList)), placeholderList));
    setValueList(newValueList);
    // 调用改变层级的事件给用户
    if (onChangeLevel) onChangeLevel(newValueList);
  };

  const listReverse = [];
  // eslint-disable-next-line no-plusplus
  for (let i = labelList.length; i < 4; i++) {
    listReverse.push(
      Math.random()
        .toString(36)
        .substring(7),
    );
  }

  return (
    <>
      <InputItem
        isVertical={isVertical}
        value={inputLabel}
        placeholder={placeholder}
        readOnly
        coverStyle={coverStyle}
        labelNumber={labelNumber}
        onClick={() => {
          if (onClick) onClick();
          openMoal();
        }}
        onChange={e => {
          setInputLabel(e.target.value);
        }}
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
        className="alitajs-dform-address"
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
        <div className="alitajs-dform-address-content">
          <div className="alitajs-dform-address-value">
            <Flex align="start">
              {[...labelList].map((label: any, index: number) => (
                <Flex.Item
                  key={label}
                  className={classnames({
                    'alitajs-dform-address-value-item': true,
                  })}
                  onClick={() => {
                    labelClick(index);
                  }}
                >
                  <div
                    className={classnames({
                      'alitajs-dform-address-value-item-label': true,
                      'alitajs-dform-address-value-select': index + 1 === labelList.length,
                    })}
                  >
                    {label}
                  </div>
                </Flex.Item>
              ))}
              {listReverse.map((val: any) => (
                <Flex.Item key={val}></Flex.Item>
              ))}
            </Flex>
          </div>
          <div className="alitajs-dform-address-list">
            <List>
              {[...dataList].map(item => (
                <Item key={item.value}>
                  <div
                    className="alitajs-dform-address-list-content"
                    onClick={() => {
                      listClick(item);
                    }}
                  >
                    <div>{item.label}</div>
                    {item.flag && <div className="alitajs-dform-tick"></div>}
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
