import React, { FC, useState } from 'react';
import { Modal, Flex, List } from 'antd-mobile';
import classnames from 'classnames';
import { IModalData, IAddressPickerProps } from './interface';
import { data1, data2, data3, resetListAndLabel } from '../../utils';
import { InputItem } from '..';
import '../../styles/index.less';

const { Item } = List;

const AddressPickerGroup: FC<IAddressPickerProps> = props => {
  const { placeholder = '请选择', positionType = 'horizontal', title, disabled = false } = props;

  // input 框的值
  const [inputLabel, setInputLabel] = useState<string>('');
  const [modalFlag, setModalFlag] = useState<boolean>(false);

  // 弹框选中的值
  const [labelList, setLabelList] = useState<string[]>(['请选择省']);

  // 当前列表数据
  const [dataList, setDataList] = useState<IModalData[] | []>(data1);

  const isVertical = positionType === 'vertical';

  const openMoal = () => {
    if (disabled) return;
    setModalFlag(true);
  };

  const onCancel = () => {
    setModalFlag(false);
  };

  const onConfirm = () => {};

  const listClick = (val: any) => {
    const newList = JSON.parse(JSON.stringify(labelList));
    newList.splice(newList.length - 1, 1, val.label);
    const obj = resetListAndLabel(newList);
    setDataList(
      JSON.parse(JSON.stringify(obj.data)).map((item: any) => {
        if (item.value === val.value) item.flag = true;
        return item;
      }),
    );
    setLabelList(obj.list);
  };

  const labelClick = (index: number) => {
    const newLabelList = labelList.splice(0, index);
    const obj = resetListAndLabel(newLabelList);
    setDataList(obj.data);
    setLabelList(obj.list);
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
        onClick={() => {
          openMoal();
        }}
        onChange={e => {
          setInputLabel(e.target.value);
        }}
      >
        {title}
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
        <div className="alitajs-dform-address-content">
          <div className="alitajs-dform-address-value">
            <Flex align="start">
              {[...labelList].map((label: any, index: number) => (
                <Flex.Item
                  key={label}
                  className={classnames({
                    'alitajs-dform-address-value-item': true,
                    'alitajs-dform-address-value-select': index + 1 === labelList.length,
                  })}
                  onClick={() => {
                    labelClick(index);
                  }}
                >
                  {label}
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
                <Item key={item.value} className="alitajs-dform-address-list-content">
                  <div
                    onClick={() => {
                      listClick(item);
                    }}
                  >
                    {item.label}
                  </div>
                  {item.flag && <div className="alitajs-dform-tick"></div>}
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
