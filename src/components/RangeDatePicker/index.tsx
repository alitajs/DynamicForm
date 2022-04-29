import React, { FC, useState } from 'react';
import classnames from 'classnames';
import Field from '../Field';
import Title from '../Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { changeDateFormat } from '../../utils';
import DatePickerGroup from '../NomarDatePicker/DatePickerGroup';
import { allPrefixCls } from '../../const/index';
import { IRangeDatePickerProps } from './interface';
import './index.less';

const RangeDatePicker: FC<IRangeDatePickerProps> = (props) => {
  const [beginDate, setBeginDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const {
    fieldProps,
    fieldProps2,
    placeholder = '开始时间',
    placeholder2 = '结束时间',
    required = false,
    rules = [],
    title,
    minDate,
    maxDate,
    modeType = 'date',
    positionType = 'vertical',
    hasStar = true,
    secondProps,
    firstProps,
    subTitle,
    hidden = false,
    labelNumber = 7,
    coverStyle = {},
    ...otherProps
  } = props;

  const isVertical = positionType === 'vertical';

  return (
    <Title independentProps={{ positionType, ...props }} type="rangeDatePicker">
      <div
        className={classnames({
          [`${allPrefixCls}-range-horizontal`]: !isVertical,
          [`${allPrefixCls}-range-date-picker`]: true,
        })}
        style={{
          justifyContent: isVertical ? 'space-between' : 'center',
          width: isVertical ? '' : '100%',
        }}
      >
        <div
          className={`${allPrefixCls}-begin${
            isVertical ? '-vertical' : ''
          }-picker`}
        >
          <Field
            type="rangeDatePicker"
            title={title}
            required={required}
            rules={rules}
            name={fieldProps}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              setBeginDate(nextValue && nextValue[fieldProps as any]);
              return prevValue !== nextValue;
            }}
            initialValue={firstProps?.defaultValue}
            params={{
              hidden,
            }}
          >
            <DatePickerGroup
              {...otherProps}
              {...firstProps}
              value={firstProps?.defaultValue}
              onChange={(e) => {
                setBeginDate(e);
                firstProps?.onChange && firstProps?.onChange(e);
              }}
              fieldProps={fieldProps}
              title={title}
              labelNumber={isVertical ? 0 : labelNumber}
              coverStyle={{
                textAlign: 'center',
                ...coverStyle,
              }}
              arrow={false}
              minDate={minDate}
              maxDate={endDate || maxDate}
              mode={modeType}
              format={(value) => changeDateFormat(value, modeType)}
            >
              {!isVertical && (
                <HorizontalTitle
                  required={required}
                  hasStar={hasStar}
                  title={title}
                  labelNumber={labelNumber}
                  isVertical={isVertical}
                  fieldProps={fieldProps}
                />
              )}
            </DatePickerGroup>
          </Field>
        </div>
        <div className={`${allPrefixCls}-line`}>~</div>
        <div
          className={`${allPrefixCls}-end${
            isVertical ? '-vertical' : ''
          }-picker`}
        >
          <Field
            name={fieldProps2}
            rules={[...(rules || []), { required, message: `请选择${title}` }]}
            shouldUpdate={(prevValue: any, nextValue: any) => {
              setEndDate(nextValue && nextValue[fieldProps2 as any]);
              return prevValue !== nextValue;
            }}
            initialValue={secondProps?.defaultValue}
            params={{
              hidden,
            }}
          >
            <DatePickerGroup
              {...otherProps}
              {...secondProps}
              value={secondProps?.defaultValue}
              onChange={(e) => {
                setEndDate(e);
                secondProps &&
                  secondProps?.onChange &&
                  secondProps?.onChange(e);
              }}
              fieldProps={fieldProps2}
              title={title}
              labelNumber={0}
              coverStyle={{
                textAlign: 'center',
                ...coverStyle,
              }}
              mode={modeType}
              format={(value) => changeDateFormat(value, modeType)}
              minDate={beginDate || minDate}
              maxDate={maxDate}
            />
          </Field>
        </div>
      </div>
    </Title>
  );
};
RangeDatePicker.displayName = 'rangeDatePicker';
export default RangeDatePicker;
