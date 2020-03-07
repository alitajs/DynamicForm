/**
 * title: coverRadio
 * desc: 基础 coverRadio
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import CoverRadio from '..';

const sexList = [
  { label: '男', value: 'man' },
  { label: '女', value: 'woman' },
];

const BasicRadio: FC = () => (
  <Form>
    <List>
      <CoverRadio fieldProps="sex" required data={sexList} title="性别" />
    </List>
  </Form>
);

export default BasicRadio;
