import React, { FC, useState, useEffect } from 'react';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import DatePickerLocale from 'rmc-date-picker/lib/locale/zh_CN';
import { changeDateFormat } from '../../utils';
import { INomarDatePickerGroupProps } from './interface';
import TextItem from '../../baseComponents/TextItem';

const DatePickerGroup: FC<INomarDatePickerGroupProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('');
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  const {
    positionType = '',
    onChange,
    modeType = 'date',
    minDate,
    maxDate,
    use12Hours = false,
    minuteStep = 1,
    placeholder = '请选择',
    labelNumber = 7,
    coverStyle,
    disabled = false,
    extra = '',
    className,
    format,
    onValueChange,
    arrow,
    children,
    fieldProps,
    value,
    ...otherProps
  } = props;

  useEffect(() => {
    if (value) {
      setTextValue(changeDateFormat(value, modeType, format));
      setDateValue(new Date(value));
    } else {
      setTextValue('');
      setDateValue(undefined);
    }
  }, [value]);

  const isVertical = positionType === 'vertical';

  const datePicker = (
    <RCDatePicker
      locale={DatePickerLocale}
      minuteStep={minuteStep}
      minDate={minDate}
      maxDate={maxDate}
      mode={modeType}
      pickerPrefixCls="am-picker-col"
      prefixCls="am-picker"
      defaultDate={value || new Date()}
      use12Hours={use12Hours}
      onValueChange={onValueChange}
      onScrollChange={() => {}}
    />
  );

  /**
   * date 改变事件
   */
  const dateChange = (e: any) => {
    setTextValue(changeDateFormat(e, modeType, format));
    onChange(e);
    setVisible(false);
  };

  return (
    <div>
      <PopupDatePicker
        datePicker={datePicker}
        WrapComponent="div"
        transitionName="am-slide-up"
        maskTransitionName="am-fade"
        prefixCls="am-picker-popup"
        title="选择日期"
        date={dateValue || new Date()}
        okText="确认"
        dismissText="取消"
        onDismiss={() => setVisible(false)}
        onChange={dateChange}
        visible={visible}
        onVisibleChange={() => {
          setVisible(false);
        }}
        {...(otherProps as any)}
      />
      <TextItem
        fieldProps={fieldProps}
        isVertical={isVertical}
        placeholder={placeholder}
        labelNumber={labelNumber}
        coverStyle={coverStyle}
        value={textValue}
        disabled={disabled}
        extra={extra}
        className={className}
        onClick={() => {
          setVisible(true);
        }}
        arrow={arrow}
        ellipsis={true}
      >
        {children}
      </TextItem>
    </div>
  );
};

export default DatePickerGroup;
