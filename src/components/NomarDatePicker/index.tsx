import React, { FC, useState } from 'react';
import classnames from 'classnames';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import { allPrefixCls } from '../../const/index';
import DatePickerGroup from './DatePickerGroup';
import { INomarDatePickerProps } from './interface';
import { changeDateFormat } from '../../utils/tool';

import './index.less';

const DformDatePicker: FC<INomarDatePickerProps> = (props) => {
  const [beginDate, setBeginDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const {
    fieldProps,
    fieldProps2,
    secondProps,
    required = false,
    title,
    rules = [],
    positionType = props.fieldProps2 ? 'vertical' : 'horizontal',
    hasStar = true,
    disabled = false,
    onChange,
    defaultValue,
    titleProps,
    formFlag = false,
    coverStyle = {},
    labelNumber,
    minDate,
    maxDate,
    modeType = 'date',
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  const fileChange = (e: any) => {
    if (onChange) onChange(e);
  };

  const renderDatePicker = ({
    fieldProps = {},
    type = 'left',
    dateProps,
    isBegin = false,
    isEnd = false,
  }: any) => {
    return (
      <div
        className={classnames({
          [`alitajs-dform${isVertical ? '-vertical' : ''}-date-picker`]:
            !isBegin && !isEnd,
          [`${allPrefixCls}-begin${isVertical ? '-vertical' : ''}-picker`]:
            isBegin,
          [`${allPrefixCls}-end${isVertical ? '-vertical' : ''}-picker`]: isEnd,
          'alitajs-dform-disabled': disabled,
        })}
      >
        <Field
          {...fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          formFlag={formFlag}
        >
          <DatePickerGroup
            {...dateProps}
            mode={modeType}
            format={(value) => changeDateFormat(value, modeType)}
          >
            {!isVertical && type === 'left' && (
              <div className={`${allPrefixCls}-title`}>
                {required && hasStar && (
                  <div className={`${allPrefixCls}-redStar`}>*</div>
                )}
                <div>{title}</div>
              </div>
            )}
          </DatePickerGroup>
        </Field>
      </div>
    );
  };

  // 默认第一个时间field
  const firstFieldProps: any = {
    name: fieldProps,
    initialValue: defaultValue,
  };
  // 存在区间时
  if (fieldProps2) {
    firstFieldProps.shouldUpdate = (prevValue: any, nextValue: any) => {
      setBeginDate(nextValue && nextValue[fieldProps as any]);
      return prevValue !== nextValue;
    };
  }

  // 区间第二个field
  const secondFieldProps: any = {
    name: fieldProps2,
    initialValue: secondProps?.defaultValue,
    shouldUpdate: (prevValue: any, nextValue: any) => {
      setEndDate(nextValue && nextValue[fieldProps2 as any]);
      return prevValue !== nextValue;
    },
  };

  // 默认第一个时间props
  const firstDateProps: any = {
    ...props,
  };
  // 存在区间时
  if (fieldProps2) {
    firstDateProps.title = title;
    firstDateProps.coverStyle = {
      ...coverStyle,
      textAlign: 'center',
    };
    firstDateProps.onChange = (e: any) => {
      setEndDate(e);
      onChange && onChange(e);
    };
    firstDateProps.labelNumber = isVertical ? 0 : labelNumber;
    firstDateProps.arrow = false;
    firstDateProps.maxDate = endDate || maxDate;
  }

  // 区间第二个时间props
  const secondDateProps: any = {
    ...secondProps,
    labelNumber: 0,
    minDate: beginDate || minDate,
    maxDate,
    onChange: (e: any) => {
      setEndDate(e);
      secondProps && secondProps?.onChange && secondProps?.onChange(e);
    },
    coverStyle: {
      ...coverStyle,
      textAlign: 'center',
    },
  };

  return (
    <Title
      {...titleProps}
      title={title}
      independentProps={{ ...props, positionType }}
      formFlag={formFlag}
      positionType={positionType}
    >
      <div
        className={classnames({
          [`${allPrefixCls}-range-horizontal`]: !isVertical,
          [`${allPrefixCls}-range-date-picker`]: true,
        })}
      >
        {renderDatePicker({
          fieldProps: firstFieldProps,
          dateProps: firstDateProps,
          isBegin: !!fieldProps2,
        })}
        {!!fieldProps2 && <div className={`${allPrefixCls}-line`}>~</div>}
        {!!fieldProps2 &&
          renderDatePicker({
            fieldProps: secondFieldProps,
            type: 'right',
            dateProps: secondDateProps,
            isEnd: !!fieldProps2,
          })}
      </div>
    </Title>
  );
};

DformDatePicker.displayName = 'dformDatePicker';
export default DformDatePicker;
