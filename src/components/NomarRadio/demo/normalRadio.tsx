/**
 * title: 基础 Radio
 * desc: 按钮
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
const NormalRedio: FC = () => (
  <Form>
    <List>
      <NomarRadio fieldProps="userRadio1" required data={radioList} title="发票" />
    </List>
  </Form>
);

export default NormalRedio;
