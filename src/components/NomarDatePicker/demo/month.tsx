import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarDatePicker from '..';

const Month: FC = () => (
  <Form>
    <List>
      <NomarDatePicker fieldProps="Month" modeType="month" title="Month" required />
    </List>
  </Form>
);

export default Month;
