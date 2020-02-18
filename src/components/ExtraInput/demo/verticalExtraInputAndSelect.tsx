/**
 * title: 基础 复杂输入框
 * desc: 垂直样式，输入框和选择框
 */

import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import ExtraInput from '..';

const unitList = [
  [
    {
      label: '元',
      value: '元',
    },
    {
      label: '万元',
      value: '万元',
    },
    {
      label: '亿元',
      value: '亿元',
    },
  ],
];

const VerticalExtraInputAndSelect: FC = () => (
  <Form>
    <List>
      <ExtraInput
        title="价格"
        fieldProps="prices"
        fieldProps2="priceUnit"
        placeholder="输入长度"
        placeholder2="选择长度单位"
        positionType="vertical"
        extraType="select"
        data={unitList}
      />
    </List>
  </Form>
);

export default VerticalExtraInputAndSelect;
