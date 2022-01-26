import React, { FC, useState, useEffect, useRef } from 'react';
import { Modal } from 'antd-mobile-v2';
import classnames from 'classnames';
import { IAddressPickerProps, valueProps, IModalData } from './interface';
import TextItem from '../../baseComponents/TextItem';
import { Tabs, List } from 'antd-mobile/2x';
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
  } = props;

  const { value: aliasValue = 'value', label: aliasLabel = 'label' } = alias;

  const [inputLabel, setInputLabel] = useState<string>(''); // input 框的值
  const [modalFlag, setModalFlag] = useState<boolean>(false); // 弹框标识

  // 弹框选中的头部文字列表
  const [labelList, setLabelList] = useState<string[]>([]);

  const [valueList, setValueList] = useState<(string | number)[]>([]); // value 值列表
  const isVertical = positionType === 'vertical';

  const [tabActiveKey, setTabActiveKey] = useState<number>(0);

  const addressPickerRef = useRef<any>();
  const [list, setList] = useState<any[]>([]);
  const [lastLevel, setLastLevel] = useState<boolean>(false);
  const [initStatus, setinitStatus] = useState<{
    isChange: boolean;
    status?: boolean;
  }>({
    isChange: false,
  });

  useEffect(() => {
    if (!modalFlag) return;
    console.log('data', data);
    console.log('lastLevel', lastLevel);
    console.log('initStatus', initStatus);
    if (!!data.length) setList(data);
    if (!!data.length && modalFlag) {
      const newLabelList = [...labelList];
      const labelListLength = labelList.length;

      if (addressPickerRef && addressPickerRef.current) {
        addressPickerRef.current.scrollTop = 0;
      }
      if (!lastLevel && valueList.length === newLabelList.length) {
        newLabelList.push(placeholderList[labelListLength] || '请选择');
        setTimeout(() => {
          setTabActiveKey(newLabelList.length - 1);
        }, 100);
      }
      if (lastLevel && !newLabelList.length) {
        setLastLevel(false);
        if (!initStatus.isChange)
          setinitStatus({ isChange: true, status: false });
        newLabelList.push(placeholderList[labelListLength] || '请选择');
        setTimeout(() => {
          setTabActiveKey(newLabelList.length - 1);
        }, 100);
      }
      setLabelList(newLabelList);
    }
    if (!data.length && modalFlag && !lastLevel) {
      setLastLevel(true);
      if (!initStatus.isChange) setinitStatus({ isChange: true, status: true });
      const initValue: any[] = JSON.parse(JSON.stringify(valueList));
      if (!!initValue.length) initValue.pop();
      if (onChangeLevel) onChangeLevel(initValue);
    }
  }, [data, modalFlag]);

  useEffect(() => {
    if (!value) return;
    const newValue = JSON.parse(JSON.stringify(value));
    setInputLabel(newValue?.label.join(' '));
    setLabelList(newValue?.label);
    setValueList(newValue?.value);
    // if (newValue?.value?.length) {
    //   setTabActiveKey(newValue?.value?.length - 1);
    // } else {
    //   setTabActiveKey(0);
    // }
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
    setinitStatus({ isChange: false });
  };

  /**
   * 输入框点击事件，打开弹窗
   */
  const inputClick = () => {
    if (onClick) onClick();
    const initValueList = JSON.parse(JSON.stringify(valueList));
    if (lastLevel) initValueList.pop();
    if (onChangeLevel) onChangeLevel(initValueList);
    if (!modalFlag) {
      if (disabled) return;
      setModalFlag(true);
    }
  };

  // 关闭弹窗
  const closeModal = () => {
    setModalFlag(false);
    if (initStatus.isChange) setLastLevel(!!initStatus.status);
    setinitStatus({ isChange: false });
    if (!!value) {
      const newValue = JSON.parse(JSON.stringify(value));
      setTimeout(() => {
        setInputLabel(newValue?.label.join(' '));
        setLabelList(newValue?.label);
        setValueList(newValue?.value);
        setTabActiveKey(newValue?.label?.length - 1);
      }, 100);
    } else {
      setTimeout(() => {
        setInputLabel('');
        setLabelList([]);
        setValueList([]);
        setTabActiveKey(0);
      }, 100);
    }
  };

  /**
   * 列表点击事件
   */
  const listClick = (val: any) => {
    if (val[aliasValue] === valueList[tabActiveKey]) return;
    let newValueList = [...valueList];

    // 设置弹框顶部选中label 的值
    let newLabelList = [...labelList];

    if (tabActiveKey === labelList.length - 1 && lastLevel) {
      newValueList.splice(newValueList.length - 1, 1, val[aliasValue]);
      newLabelList.splice(newLabelList.length - 1, 1, val[aliasLabel]);
    } else if (tabActiveKey === labelList.length - 1 && !lastLevel) {
      newLabelList.splice(newLabelList.length - 1, 1, val[aliasLabel]);
      newValueList.push(val[aliasValue]);
    } else {
      setLastLevel(false);
      newValueList = newValueList.splice(0, tabActiveKey);
      newValueList.push(val[aliasValue]);
      newLabelList = newLabelList.splice(0, tabActiveKey);
      newLabelList.push(val[aliasLabel]);
    }

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
    if (index === tabActiveKey) return;
    const mValueList = JSON.parse(JSON.stringify(valueList));
    const newValueList = mValueList.splice(0, index);
    setTabActiveKey(index);
    if (onChangeLevel) onChangeLevel(newValueList);
  };

  const renderModal = () => {
    return (
      <Modal
        popup
        visible={modalFlag}
        style={{
          height,
        }}
        onClose={() => closeModal()}
        className="alitajs-dform-address"
        animationType="slide-up"
        title={renderHeader()}
      >
        <Tabs
          stretch={false}
          activeKey={tabActiveKey.toString()}
          className="alitajs-dform-address-tabs"
          onChange={(index) => labelClick(parseInt(index))}
        >
          {labelList.map((row: any, index: number) => {
            return (
              <Tabs.Tab
                key={index}
                forceRender
                title={
                  <div
                    className={classnames({
                      'alitajs-dform-address-value-item-label': true,
                      'alitajs-dform-address-value-select':
                        index === tabActiveKey,
                    })}
                  >
                    {row}
                  </div>
                }
              />
            );
          })}
        </Tabs>
        {renderModalContent()}
      </Modal>
    );
  };

  const renderHeader = () => {
    return (
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
    );
  };

  const renderModalContent = () => {
    return (
      <div className="alitajs-dform-address-content">
        {list && list.length === 0 && !loading && noData}
        <div
          ref={addressPickerRef}
          id="alitajs-dform-address-list-id"
          className="alitajs-dform-address-list"
          style={{ display: list.length ? '' : 'none' }}
        >
          <List className="alitajs-dform-address-list-style">
            {[...list].map((item: IModalData) => (
              <Item
                arrow={false}
                key={item[aliasValue]}
                onClick={() => {
                  listClick(item);
                }}
              >
                <div className="alitajs-dform-address-list-item">
                  <div
                    className={classnames({
                      'alitajs-dform-address-list-item-common': true,
                      'alitajs-dform-address-list-item-tick':
                        valueList.indexOf(item[aliasValue]) !== -1,
                    })}
                  >
                    {item[aliasLabel]}
                  </div>
                  {valueList.indexOf(item[aliasValue]) !== -1 && (
                    <div className="alitajs-dform-tick" />
                  )}
                </div>
              </Item>
            ))}
          </List>
        </div>
      </div>
    );
  };

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
      {renderModal()}
    </>
  );
};

export default AddressPickerGroup;
