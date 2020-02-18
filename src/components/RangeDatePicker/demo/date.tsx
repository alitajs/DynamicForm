/**
 * title: 基础 时间区间选择框
 * desc: 垂直样式选择日期
 */
import React from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import RangeDatePicker from '..';

const RangeDate = () => (
  <Form>
    <List>
      <RangeDatePicker
        fieldProps="rangeTime5"
        fieldProps2="rangeTime6"
        title="时间(date)"
        required
        positionType="vertical"
      />
    </List>
  </Form>
);

export default RangeDate;
