/**
 * title: 基础 时间区间选择框
 * desc: 月份
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import RangeDatePicker from '..';

const DateTime = () => {
  return (
    <Form>
      <List>
        <RangeDatePicker
          fieldProps="rangeTime3"
          fieldProps2="rangeTime4"
          title="时间(month)"
          modeType="month"
          required
        />
      </List>
    </Form>
  );
};

export default DateTime;
