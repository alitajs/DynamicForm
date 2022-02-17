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

// TODO: 切换tab时，存在默认值要滚动到对应的位置
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
  const [curReqLevel, setCurReqLevel] = useState<number>(0); // 当前请求层级
  const [initReq, setInitReq] = useState<boolean>(false); // 用于记录是否已经初始化请求过
  const [openReq, setOpenReq] = useState<boolean>(true); // 打开是否需要请求
  const [isConfirm, setIsConfirm] = useState<boolean>(false); // 记录确认后的value改变

  useEffect(() => {
    if (!modalFlag) return;
    if (!!data.length) setList(data);
    if (!!data.length) {
      if (!initReq) setLastLevel(false);
      const newLabelList = [...labelList];
      const labelListLength = labelList.length;

      if (addressPickerRef && addressPickerRef.current) {
        addressPickerRef.current.scrollTop = 0;
      }
      if (
        valueList.length === newLabelList.length &&
        valueList.length === curReqLevel
      ) {
        newLabelList.push(placeholderList[labelListLength] || '请选择');
        setTimeout(() => {
          setTabActiveKey(newLabelList.length - 1);
        }, 100);
      }
      setLabelList(newLabelList);
    } else if (!list.length) {
      // 初始化存在默认值
      if (!!valueList.length) {
        const initValueList: any[] = JSON.parse(JSON.stringify(valueList));
        if (initReq) {
          initValueList.pop();
          setLastLevel(true);
        }
        onMChangeLevel(initValueList, true);
      } else {
        onMChangeLevel([]);
      }
    } else {
      if (initReq) {
        const initValueList: any[] = JSON.parse(JSON.stringify(valueList));
        initValueList.pop();
        setLastLevel(true);
        onMChangeLevel(initValueList, true);
      } else {
        setLastLevel(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isConfirm) {
      setIsConfirm(false);
    }
    if (!value || isConfirm) return;
    const newValue = JSON.parse(JSON.stringify(value));
    if (valueList.toString() !== newValue?.value?.toString()) {
      setInputLabel(newValue?.label.join(' '));
      setValueList(newValue?.value);
      setLabelList(newValue?.label);
      setCurReqLevel(newValue?.value?.length);
      if (newValue?.value?.length) {
        setTabActiveKey(newValue?.value?.length - 1);
      } else {
        setTabActiveKey(0);
      }
      setOpenReq(true);
    } else {
      setOpenReq(false);
    }
  }, [JSON.stringify(value)]);

  const onMChangeLevel = (value = [] as any[], initDef = false) => {
    setInitReq(initDef);
    setCurReqLevel(value.length);
    if (onChangeLevel) onChangeLevel(value);
  };

  const onConfirm = () => {
    const mLabelList = [...labelList];
    const newLabelList = mLabelList.splice(0, valueList.length | 0);
    // 赋值
    let val;
    if (valueList && valueList.length) {
      val = { label: newLabelList, value: valueList };
    }
    // 设值
    onChange(val, 'change');
    setInputLabel(newLabelList.join(' '));
    setModalFlag(false); // 关闭弹框
    // setinitStatus({ isChange: false });
  };

  /**
   * 输入框点击事件，打开弹窗
   */
  const inputClick = () => {
    if (onClick) onClick();
    if (openReq) onMChangeLevel(valueList, true);
    if (!modalFlag) {
      if (disabled) return;
      setModalFlag(true);
    }
  };

  // 关闭弹窗
  const closeModal = () => {
    setModalFlag(false);
    if (!!value) {
      const newValue = JSON.parse(JSON.stringify(value));
      setTimeout(() => {
        if (lastLevel && curReqLevel === newValue?.value?.length + 1) {
          setValueList(newValue?.value);
          const mLabelList = newValue?.label || [];
          mLabelList.push(placeholderList[mLabelList.length] || '请选择');
          setLabelList(mLabelList);
          setLastLevel(false);
          setOpenReq(false);
        } else if (
          valueList.toString() !== newValue?.value?.toString() ||
          tabActiveKey < newValue?.label?.length
        ) {
          setValueList(newValue?.value);
          setTabActiveKey(newValue?.label?.length - 1);
          setLabelList(newValue?.label);
          setCurReqLevel(newValue?.value?.length);
          setOpenReq(true);
        } else {
          setOpenReq(false);
        }
      }, 50);
    }
  };

  /**
   * 列表点击事件
   */
  const listClick = (val: any) => {
    let newValueList = [...valueList];

    // 设置弹框顶部选中label 的值
    let newLabelList = [...labelList];
    if (val[aliasValue] === valueList[tabActiveKey]) {
      newValueList.splice(tabActiveKey);
      newLabelList.splice(tabActiveKey);
      newLabelList.push(placeholderList[newLabelList.length] || '请选择');
      if (lastLevel) setLastLevel(false);
    } else {
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
      onMChangeLevel(newValueList);
    }

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
    // if (onChangeLevel) onChangeLevel(newValueList);
    onMChangeLevel(newValueList, true);
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
                    role={
                      valueList.indexOf(item[aliasValue]) !== -1
                        ? 'selected'
                        : ''
                    }
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
