import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarCheckBox from '..';

const fruitsList = [
  { label: '苹果', value: '苹果' },
  { label: '香蕉', value: '香蕉' },
  { label: '橙子', value: '橙子' },
  { label: '西瓜', value: '西瓜' },
  { label: '哈密瓜', value: '哈密瓜' },
  { label: '菠萝', value: '菠萝' },
  { label: '香梨', value: '香梨' },
];

const CheckboxPage: FC = () => (
  <Form>
    <List>
      <NomarCheckBox
        title="喜欢的水果"
        required
        data={fruitsList}
        fieldProps="fruit"
        disableItem={x => ['香梨', '哈密瓜'].some(a => x.value === a)}
      />
    </List>
  </Form>
);

export default CheckboxPage;
