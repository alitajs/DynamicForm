/**
 * title: 基础 时间区间选择框
 * desc: 日期和时间
 */
import React from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import RangeDatePicker from '..';

const DateTime = () => (
  <Form>
    <List>
      <RangeDatePicker
        fieldProps="rangeTime1"
        fieldProps2="rangeTime2"
        title="时间(datetime)"
        modeType="datetime"
        required
        firstProps={{
          onOk: val => {
            // eslint-disable-next-line no-console
            console.log(val);
          },
        }}
        secondProps={{
          onOk: val => {
            // eslint-disable-next-line no-console
            console.log(val);
          },
        }}
      />
    </List>
  </Form>
);

export default DateTime;
