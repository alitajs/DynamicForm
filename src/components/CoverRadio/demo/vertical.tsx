/**
 * title: coverRadio
 * desc: 分两行展示coverRadio
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import CoverRadio from '..';

const sexList = [
  { label: '男', value: 'man' },
  { label: '女', value: 'woman' },
];

const VerticalCoverRadio: FC = () => (
  <Form>
    <List>
      <CoverRadio
        fieldProps="sex"
        required
        data={sexList}
        title="性别"
        positionType="vertical"
        disabled
      />
    </List>
  </Form>
);

export default VerticalCoverRadio;
