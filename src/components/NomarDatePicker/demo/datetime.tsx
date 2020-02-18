import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarDatePicker from '..';

const DateTime: FC = () => (
  <Form>
    <List>
      <NomarDatePicker fieldProps="DateTime" modeType="datetime" title="DateTime" required />
    </List>
  </Form>
);

export default DateTime;
