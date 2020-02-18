/**
 * title: 基础 Radio
 * desc: 只读，不可选
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarRadio from '..';

const radioList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
];
const OnlyRead: FC = () => (
  <Form>
    <List>
      <NomarRadio fieldProps="userRadio3" required data={radioList} title="发票" disabled />
    </List>
  </Form>
);

export default OnlyRead;
