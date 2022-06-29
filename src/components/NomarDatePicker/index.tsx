import React, { FC, useState, useContext, useMemo } from 'react';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import classnames from 'classnames';
import Field from '../Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { allPrefixCls } from '../../const';
import DatePickerGroup from './DatePickerGroup';
import { INomarDatePickerProps } from './interface';
import { changeDateFormat } from '../../utils';

import './index.less';

const DformDatePicker: FC<INomarDatePickerProps> = (props) => {
  const [beginDate, setBeginDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const {
    fieldProps,
    fieldName,
    fieldProps2 = '',
    secondProps = {},
    required = false,
    title,
    rules = [],
    positionType = props.fieldProps2 ? 'vertical' : 'horizontal',
    hasStar = true,
    disabled = false,
    onChange,
    defaultValue,
    coverStyle = {},
    labelNumber,
    minDate,
    maxDate,
    modeType = 'date',
    hidden = false,
    boxStyle,
    titleStyle,
    formFlag = true,
  } = props;

  const fieldKey = fieldName || fieldProps;

  const { disabled: secondDisabled = false } = secondProps;

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(disabled);
  const [sMregedDisabled, setSMregedDisabled] =
    useState<boolean>(secondDisabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  useMemo(() => {
    if (changeForm[fieldKey]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldKey]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldKey], disabled]);
  useMemo(() => {
    if (fieldProps2 && changeForm[fieldProps2]?.disabled !== undefined) {
      setSMregedDisabled(changeForm[fieldProps2]?.disabled);
    } else {
      setSMregedDisabled(secondDisabled);
    }
  }, [changeForm[fieldProps2], secondDisabled]);

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
          'alitajs-dform-disabled': mregedDisabled,
        })}
      >
        <Field
          title={title}
          required={required}
          rules={rules}
          {...fieldProps}
          params={{
            hidden,
            formFlag,
          }}
          type="date"
        >
          <DatePickerGroup
            {...dateProps}
            mode={modeType}
            format={(value) => changeDateFormat(value, modeType)}
          >
            {!isVertical && type === 'left' && (
              <HorizontalTitle
                required={required}
                hasStar={hasStar}
                title={title}
                labelNumber={labelNumber}
                isVertical={isVertical}
                fieldProps={fieldProps.name}
                titleStyle={titleStyle}
                {...fieldProps}
              />
            )}
          </DatePickerGroup>
        </Field>
      </div>
    );
  };

  // 默认第一个时间field
  const firstFieldProps: any = {
    name: fieldKey,
    initialValue: defaultValue,
  };
  // 存在区间时
  if (fieldProps2) {
    firstFieldProps.shouldUpdate = (prevValue: any, nextValue: any) => {
      setBeginDate(nextValue && nextValue[fieldKey as any]);
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
    disabled: sMregedDisabled,
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
      type="date"
      independentProps={{ positionType, ...props }}
      style={boxStyle}
      titleStyle={titleStyle}
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
