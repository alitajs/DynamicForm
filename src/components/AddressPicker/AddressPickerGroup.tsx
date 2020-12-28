import React, { FC, useState, useEffect } from 'react';
import { Modal, List } from 'antd-mobile';
import classnames from 'classnames';
import _ from 'lodash';
import { IAddressPickerProps } from './interface';
import { InputItem } from '..';
import '../../styles/index.less';

const { Item } = List;

interface valueProps {
  label: (string | number)[];
  value: (string | number)[];
}

interface AddressPickerGroupProps extends Omit<IAddressPickerProps, 'onChange'> {
  onChange: (val: valueProps | undefined, flag: 'init' | 'change') => void;
}

const AddressPickerGroup: FC<AddressPickerGroupProps> = props => {
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
    rightContent = '确定',
    leftContent = '取消',
  } = props;

  const [inputLabel, setInputLabel] = useState<string>(''); // input 框的值
  const [modalFlag, setModalFlag] = useState<boolean>(false); // 弹框标识

  // 弹框选中的头部文字列表
  const [labelList, setLabelList] = useState<string[]>(
    placeholderList && placeholderList.length ? [placeholderList[0]] : ['请选择'],
  );

  const [valueList, setValueList] = useState<(string | number)[]>([]); // value 值列表
  const [nowLevel, setNowLevel] = useState<number>(0); // 当前所在层级数字
  const isVertical = positionType === 'vertical';

  const onConfirm = () => {
    const newLabelList = JSON.parse(JSON.stringify(labelList));
    if (nowLevel !== level) {
      newLabelList.splice(newLabelList.length - 1, 1);
    }
    let val = undefined;
    if (valueList && valueList.length) {
      val = { label: newLabelList, value: valueList };
    }
    onChange(val, 'change');
    setInputLabel(newLabelList.join(','));
    setModalFlag(false);
  };

  useEffect(() => {
    if (!level && data.length === 0) {
      onConfirm();
    }
  }, [data]);

  useEffect(() => {
    if (!initValue) return;

    const newValue = JSON.parse(JSON.stringify(initValue));
    const { value = [], label = [] } = newValue;
    setInputLabel(label.join(','));
    setLabelList(label);
    setValueList(value);
    setNowLevel(value.length);
    if (valueList.length === 0) {
      onChangeLevel(value);
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
   * 取消按钮点击事件
   */
  const onCancel = () => {
    setModalFlag(false);
  };

  /**
   * 列表点击事件
   */
  const listClick = (val: any) => {
    let newValueList = [...valueList];

    // 设置弹框顶部选中label 的值
    const newLabelList = [...labelList];
    // 如果有层级约束
    if (level) {
      if (nowLevel === level) {
        //如果当前为最后一级，则替换掉原有值
        newLabelList.splice(newLabelList.length - 1, 1, val?.label);
        newValueList.splice(newValueList.length - 1, 1, val?.value);
      } else if (nowLevel + 1 === level) {
        // 如果当前选择后为最后一级
        newLabelList.splice(newLabelList.length - 1, 1, val?.label);
        setNowLevel(nowLevel + 1);
        newValueList.push(val?.value);
      } else {
        newLabelList.pop();
        newLabelList.push(val?.label);
        newLabelList.push(
          placeholderList.length >= newLabelList.length
            ? placeholderList[newLabelList.length]
            : '请选择',
        );
        setNowLevel(nowLevel + 1);
        newValueList.push(val?.value);
      }
      setLabelList(newLabelList);
    } else {
      newLabelList.pop();
      newLabelList.push(val?.label);
      newLabelList.push(
        placeholderList.length > newLabelList.length
          ? placeholderList[newLabelList.length]
          : '请选择',
      );
      setNowLevel(nowLevel + 1);
      newValueList.push(val?.value);
      setLabelList(newLabelList);
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
    const newValueList = valueList.splice(0, index);
    const newLabelList = labelList.splice(0, index);
    if (level !== index + 1) {
      newLabelList.push(placeholderList[index]);
    }
    setValueList(newValueList);
    setLabelList(newLabelList);
    onChangeLevel(newValueList);
    setNowLevel(index);
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
        const newLabelList = [...labelList];
        const newValueList = [...valueList];
        newLabelList.splice(newLabelList.length - 1, 1);
        newValueList.splice(newValueList.length - 1, 1);
        if (nowLevel !== level) {
          newLabelList.push(placeholderList[newLabelList.length]);
        }
        if (onChangeLevel) onChangeLevel(newValueList);
        setLabelList(newLabelList);
        setValueList(newValueList);
      }
    } else {
      const newLabelList = [...labelList];
      if (nowLevel !== level) {
        newLabelList.push(placeholderList[newLabelList.length]);
        setLabelList(newLabelList);
      }
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
        style={{
          height,
        }}
        className="alitajs-dform-address"
        animationType="slide-up"
        title={
          <div className="am-picker-popup-header">
            <div
              className="am-picker-popup-item am-picker-popup-header-left"
              onClick={() => {
                onConfirm();
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
            {[...labelList].map((label: any, index: number) => (
              <div
                key={label}
                onClick={() => {
                  labelClick(index);
                }}
                className="alitajs-dform-address-label"
              >
                <div
                  className={classnames({
                    'alitajs-dform-circle': true,
                    'alitajs-dform-circle-current': index + 1 === labelList.length,
                  })}
                />
                <div
                  className={classnames({
                    'alitajs-dform-address-value-item-label': true,
                    'alitajs-dform-address-value-select': index + 1 === labelList.length,
                  })}
                >
                  {label}
                </div>
              </div>
            ))}
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
                    {valueList.indexOf(item.value) !== -1 && (
                      <div className="alitajs-dform-tick"></div>
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
