import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import { Modal, List } from 'antd-mobile';
import { NomarInput } from '../index';
import classnames from 'classnames';
import '../../styles/index.less';

const { Item } = List;

interface IDataItem {
  label: string;
  value: string;
  flag?: boolean;
}

interface IMultiplePickerGroupProps {
  data: IDataItem[];
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: []) => void;
  subTitle?: string | React.ReactNode;
  coverStyle?: React.CSSProperties;
  hidden?: boolean;
  placeholder?: string;
  extra?: string | React.ReactNode;
}

const MultiplePickerGroup: FC<IMultiplePickerGroupProps> = props => {
  const { data = [], onChange, title, ...otherProps } = props;
  const [context, setContext] = useState<IDataItem[]>([]);
  const [modalFlag, setModalFlag] = useState<boolean>(false);

  const selectIconNode = (
    <div
      onClick={() => {
        setModalFlag(true);
      }}
      className="am-list-arrow am-list-arrow-horizontal"
    ></div>
  );

  useEffect(() => {
    const dataList = JSON.parse(JSON.stringify(data));
    setContext(
      [...dataList].map(item => {
        const initItem = item;
        initItem.flag = false;
        return initItem;
      }),
    );
  }, [data]);

  const pickerClick = (val: IDataItem) => {
    const dataList = JSON.parse(JSON.stringify(context));
    setContext(
      [...dataList].map(item => {
        const initItem = item;
        if (initItem.value === val.value) initItem.flag = !initItem.flag;
        return initItem;
      }),
    );
  };

  return (
    <>
      <NomarInput
        {...otherProps}
        title={title}
        labelNumber={10}
        extra={selectIconNode}
        onClick={() => {
          setModalFlag(!modalFlag);
        }}
        editable={false}
      />
      <Modal
        popup
        visible={modalFlag}
        onClose={() => {
          setModalFlag(false);
        }}
        className="alitajs-dform-multiple-picker"
        animationType="slide-up"
        title={
          <div className="am-picker-popup-header">
            <div className="am-picker-popup-item am-picker-popup-header-left">取消</div>
            <div className="am-picker-popup-item am-picker-popup-title">{title}</div>
            <div className="am-picker-popup-item am-picker-popup-header-right">确定</div>
          </div>
        }
      >
        <List>
          {[...context].map(item => (
            <Item>
              <div
                className="alitajs-dform-multiple-picker-item"
                onClick={() => {
                  pickerClick(item);
                }}
              >
                <div
                  className={classnames({
                    'alitajs-dform-multiple-picker-label': true,
                    'alitajs-dform-multiple-picker-checked': item.flag,
                  })}
                >
                  {item.label}
                </div>
                <div className="alitajs-dform-multiple-picker-right">
                  {item.flag && <div className="alitajs-dform-multiple-picker-tick"></div>}
                </div>
              </div>
            </Item>
          ))}
        </List>
      </Modal>
    </>
  );
};

export default MultiplePickerGroup;
