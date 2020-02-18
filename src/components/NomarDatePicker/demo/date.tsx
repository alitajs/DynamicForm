import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarDatePicker from '..';

const DatePage: FC = () => (
  <Form>
    <List>
      <NomarDatePicker
        fieldProps="Date"
        modeType="date"
        title="Date"
        maxDate={new Date()}
        minDate={new Date()}
      />
    </List>
  </Form>
);

export default DatePage;
