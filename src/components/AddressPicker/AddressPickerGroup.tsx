import React, { FC, useState, useEffect } from 'react';
import { Modal, Flex, List } from 'antd-mobile';
import classnames from 'classnames';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    level,
    placeholderList = [],
    initValue = undefined,
    required = false,
    hasStar = true,
    fieldProps,
    labelNumber = 5,
    coverStyle,
    onClick,
    height = '50vh',
    noData = '',
    loading = true,
  } = props;

  // input 框的值
  const [inputLabel, setInputLabel] = useState<string>('');

  // 弹框标识
  const [modalFlag, setModalFlag] = useState<boolean>(false);

  // 弹框选中的头部文字列表
  const [labelList, setLabelList] = useState<string[]>(
    placeholderList && placeholderList.length ? [placeholderList[0]] : ['请选择'],
  );

  // value 值列表
  const [valueList, setValueList] = useState<(string | number)[]>([]);

  // 当前列表数据
  // const [dataList, setDataList] = useState<IModalData[] | []>([]);

  // 当前所在层级数字
  const [nowLevel, setNowLevel] = useState<number>(0);

  const [delFlag, setDelFlag] = useState<boolean>(false);

  const isVertical = positionType === 'vertical';

  const onConfirm = () => {};

  useEffect(() => {}, [data]);

  useEffect(() => {}, [initValue]);

  const openMoal = () => {
    if (disabled) return;
    setModalFlag(true);
  };

  const onCancel = () => {
    setModalFlag(false);
  };

  const listClick = (val: any) => {
    let newValueList = [...valueList, val?.value];
    // 调用 onChangeLevel 让用户修改数据源
    if (onChangeLevel) onChangeLevel(newValueList);

    // 保存value 值
    setValueList(newValueList);

    // 设置弹框顶部选中label 的值
    const newLabelList = JSON.parse(JSON.stringify(labelList));
    // 如果有层级约束
    if (level) {
      console.log(level);
      if (nowLevel === level) {
        //如果当前为最后一级，则替换掉原有值
        newLabelList.splice(newLabelList.length - 1, 1, val?.label);
      } else if (nowLevel + 1 === level) {
        // 如果当前
        newLabelList.push(val?.label);
      } else {
        newLabelList.pop();
        newLabelList.push(val?.label);
        newLabelList.push(
          placeholderList.length >= newLabelList.length
            ? placeholderList[newLabelList.length]
            : '请选择',
        );
      }
      setLabelList(newLabelList);
    } else {
    }
  };

  const labelClick = (index: number) => {};

  const inputClick = () => {
    if (onClick) onClick();
    if (data.length === 0) {
      if (onChangeLevel) onChangeLevel([]);
    }
    openMoal();
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
        onClick={inputClick}
        onChange={e => {
          setInputLabel(e.target.value);
        }}
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
        className="alitajs-dform-address"
        animationType="slide-up"
        title={
          <div className="am-picker-popup-header">
            <div className="am-picker-popup-item am-picker-popup-title">{title}</div>
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
          <div
            className="alitajs-dform-address-list"
            style={{ display: data.length ? '' : 'none' }}
          >
            <List>
              {[...data].map(item => (
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
