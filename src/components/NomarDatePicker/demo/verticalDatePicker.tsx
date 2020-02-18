import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarDatePicker from '..';

const VerticalDatePicker: FC = () => (
  <Form>
    <List>
      <NomarDatePicker
        fieldProps="DateTimeVertical"
        modeType="datetime"
        title="DateTimeVertical"
        required
        positionType="vertical"
      />
    </List>
  </Form>
);

export default VerticalDatePicker;
