import React, { FC, useState, useEffect } from 'react';
import { Modal, List } from 'antd-mobile-v2';
import classnames from 'classnames';
import {
  IMultiplePickerProps,
  IDataItem,
  ValueLinks,
  ChangeValLink,
} from './interface';
import TextItem from '../../baseComponents/TextItem';
import './index.less';

const { Item } = List;

interface IMultiplePickerGroupProps
  extends Omit<IMultiplePickerProps, 'onChange'> {
  onChange?: (values: (string | number)[] | undefined, flag?: string) => void;
  value?: (string | number)[] | undefined;
  children?: any;
  valueLinks: ValueLinks;
}

const MultiplePickerGroup: FC<IMultiplePickerGroupProps> = (props) => {
  const {
    data = [],
    title,
    placeholder = '请选择',
    onChange,
    disabled = false,
    positionType = 'horizontal',
    value,
    maxValueLength,
    coverStyle,
    className = '',
    labelNumber = 7,
    onClick,
    leftContent = '取消',
    rightContent = '确定',
    height,
    children,
    fieldProps,
    clear = false,
    extra,
    arrow,
    valueLinks,
  } = props;

  const [selValueList, setSelValueList] = useState<(string | number)[]>([]); // 当前选中的值列表
  const [modalFlag, setModalFlag] = useState<boolean>(false); // 弹框标识
  const [multipleLabel, setMultipleLabel] = useState<string>(''); // 表单上展示的 label 列表

  const isVertical = positionType === 'vertical';

  const setValueList = (
    changeValLink: ChangeValLink,
    hasValue: (string | number)[],
    oldValue: (string | number)[],
  ): (string | number)[] => {
    let valueArr: (string | number)[] = hasValue;
    if (changeValLink && Object.keys(changeValLink).length > 0) {
      if (changeValLink?.linkVals) {
        valueArr = Array.from(
          new Set([...valueArr, ...(changeValLink?.linkVals || [])]),
        );
      }
      if (changeValLink?.unLlinkVals) {
        changeValLink?.unLlinkVals?.forEach((it: string | number) => {
          if (oldValue?.some((i) => i === it)) {
            valueArr.splice(valueArr.indexOf(it), 1);
          }
        });
      }
    }
    return [...valueArr];
  };

  /**
   * 设值
   * @param da 数据源
   * @param val 值
   */
  const setValues = (da: IDataItem[], val: (string | number)[] | undefined) => {
    let hasValue = Array.isArray(val) && val.length > 0 ? [...val] : [];

    if (
      Array.isArray(val) &&
      val.length > 0 &&
      valueLinks &&
      Object.keys(valueLinks)?.length > 0
    ) {
      val?.forEach((item, index, array: (string | number)[]) => {
        hasValue = setValueList(valueLinks[item], hasValue, array);
      });
    }

    const filter = da.filter((item) => hasValue?.indexOf(item.value) !== -1);
    const labels = filter.map((item) => item.label);
    const values = filter.map((item) => item.value);
    setMultipleLabel(labels.join(','));
    setSelValueList(values);
    return { labels, values };
  };

  useEffect(() => {
    const { labels, values } = setValues(data, value || []);
    setMultipleLabel(labels.join(','));
    setSelValueList(values);
  }, [value, JSON.stringify(valueLinks)]);
  useEffect(() => {
    const { labels, values } = setValues(data, value || []);
    setMultipleLabel(labels.join(','));
    setSelValueList(values);
  }, [data, JSON.stringify(valueLinks)]);

  const pickerClick = (val: IDataItem) => {
    let list = JSON.parse(JSON.stringify(selValueList));
    if (
      !list.some((i: string | number) => i === val.value) &&
      valueLinks[val?.value] &&
      Object.keys(valueLinks[val?.value]).length > 0
    ) {
      list = setValueList(valueLinks[val?.value], list, list);
    }
    if (list.indexOf(val.value) !== -1) {
      list.splice(list.indexOf(val.value), 1);
    } else {
      list.push(val.value);
    }
    if (maxValueLength && list.length > maxValueLength) {
      list.shift();
    }
    setSelValueList(list);
  };

  const isHasLink = (value: string | number): boolean => {
    let isNoHasLink = false;
    if (valueLinks && Object.keys(valueLinks).length > 0) {
      selValueList.forEach((item) => {
        if (valueLinks[item] && Object.keys(valueLinks[item]).length > 0) {
          if (
            (valueLinks[item]?.linkVals &&
              valueLinks[item]?.linkVals?.some((i) => i === value)) ||
            (valueLinks[item]?.unLlinkVals &&
              valueLinks[item]?.unLlinkVals?.some((i) => i === value))
          ) {
            isNoHasLink = true;
          }
        }
      });
    }
    return isNoHasLink;
  };

  const openMoal = () => {
    if (disabled) return;
    const { labels, values } = setValues(data, value || []);
    setMultipleLabel(labels.join(','));
    setSelValueList(values);
    setModalFlag(true);
  };

  const onCancel = () => {
    setModalFlag(false);
  };

  const onConfirm = () => {
    setModalFlag(false);
    const { labels, values } = setValues(data, selValueList || []);
    setMultipleLabel(labels.join(','));
    setSelValueList(values);
    onChange?.(values);
  };

  /**
   * 清理按钮点击事件
   */
  const clearClick = () => {
    onChange?.(undefined);
  };

  return (
    <>
      <TextItem
        fieldProps={fieldProps}
        isVertical={isVertical}
        value={multipleLabel}
        disabled={disabled}
        placeholder={placeholder}
        labelNumber={labelNumber}
        coverStyle={coverStyle}
        className={className}
        onClick={() => {
          if (onClick) onClick();
          openMoal();
        }}
        arrow={arrow}
        clear={clear}
        clearClick={clearClick}
        extra={extra}
        ellipsis={false}
      >
        {children}
      </TextItem>
      <Modal
        popup
        visible={modalFlag}
        onClose={() => {
          onCancel();
        }}
        style={{
          height,
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
        <List className="alitajs-dform-modal-content">
          {data.map((item) => (
            <Item key={item.value}>
              <div
                className="alitajs-dform-multiple-picker-item"
                onClick={() => {
                  if (isHasLink(item.value)) return;
                  pickerClick(item);
                }}
              >
                <div
                  className={classnames({
                    'alitajs-dform-multiple-picker-label': true,
                    'alitajs-dform-multiple-picker-checked':
                      selValueList.indexOf(item?.value) !== -1,
                    'alitajs-dform-box-wrapper-disabled': isHasLink(item.value),
                  })}
                >
                  {item.label}
                </div>
                {selValueList.indexOf(item?.value) !== -1 && (
                  <div className="alitajs-dform-tick"></div>
                )}
              </div>
            </Item>
          ))}
        </List>
        <div style={{ height: '1.2rem' }} />
      </Modal>
    </>
  );
};

export default MultiplePickerGroup;
