/**
 * title: 基础 Select
 * desc: 必选选择框
 */
import React, { FC } from 'react';
import Form from 'rc-field-form';
import { List } from 'antd-mobile';
import NomarPicker from '..';

const citys = [
  [
    {
      label: '福州',
      value: '福州',
    },
    {
      label: '厦门',
      value: '厦门',
    },
  ],
];

const RequiredSelect: FC = () => (
  <Form>
    <List>
      <NomarPicker
        fieldProps="userPicker2"
        required
        title="城市"
        placeholder="请选择"
        data={citys}
      />
    </List>
  </Form>
);

export default RequiredSelect;
