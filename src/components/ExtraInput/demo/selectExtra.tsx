/**
 * title: 基础 复杂输入框
 * desc: 选择单位，输入价格
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

const SelectExtra: FC = () => (
  <Form>
    <List>
      <ExtraInput
        fieldProps="price"
        fieldProps2="unit"
        title="单价"
        placeholder="输入价格"
        placeholder2="选择区间"
        required
        extraType="select"
        data={unitList}
      />
    </List>
  </Form>
);

export default SelectExtra;
