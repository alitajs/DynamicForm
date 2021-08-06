import React, { FC, useState, useEffect } from 'react';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import DatePickerLocale from 'rmc-date-picker/lib/locale/zh_CN';
import { changeDateFormat } from '../../utils';
import { INomarDatePickerGroupProps } from './interface';
import { TextItem } from '..';

const DatePickerGroup: FC<INomarDatePickerGroupProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('');

  const {
    positionType = '',
    onChange,
    modeType = 'date',
    minDate,
    maxDate,
    initValue,
    use12Hours = false,
    minuteStep = 1,
    placeholder = '请选择',
    labelNumber = 5,
    coverStyle,
    disabled = false,
    extra = '',
    className,
    format,
    onValueChange,
    arrow = true,
    children,
    ...otherProps
  } = props;

  useEffect(() => {
    if (initValue) {
      setTextValue(changeDateFormat(initValue, modeType, format));
    } else {
      setTextValue('');
    }
  }, [initValue]);

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
      defaultDate={initValue || new Date()}
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
        date={initValue || new Date()}
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
