import React, { FC, useState } from 'react';
import { Modal, Button } from 'antd-mobile';
import { IAddressPickerProps } from './interface';
import { InputItem } from '..';
import '../../styles/index.less';

const AddressPickerGroup: FC<IAddressPickerProps> = props => {
  const { placeholder = '请选择', positionType = 'horizontal', title, disabled = false } = props;

  const [inputLabel, setInputLabel] = useState<string>('');
  const [modalFlag, setModalFlag] = useState<boolean>(false);

  const isVertical = positionType === 'vertical';

  const openMoal = () => {
    if (disabled) return;
    setModalFlag(true);
  };

  const onCancel = () => {
    setModalFlag(false);
  };

  const onConfirm = () => {};

  const queryList = () => {};
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
        <Button
          onClick={() => {
            queryList();
          }}
        >
          query
        </Button>
      </Modal>
    </>
  );
};

export default AddressPickerGroup;
