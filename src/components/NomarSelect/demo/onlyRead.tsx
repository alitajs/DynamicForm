/**
 * title: 基础 Select
 * desc: 只读，不可编辑
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

const OnlyRead: FC = () => (
  <Form>
    <List>
      <NomarPicker
        fieldProps="userPicker3"
        required
        title="城市(不可编辑)"
        placeholder="请选择"
        data={citys}
        disabled
      />
    </List>
  </Form>
);

export default OnlyRead;
