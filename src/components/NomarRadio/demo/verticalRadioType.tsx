/**
 * title: 基础 Radio
 * desc: 垂直按钮
 */

import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarRadio from '..';

const foodList = [
  {
    label: '宫保鸡丁',
    value: '宫保鸡丁',
  },
  {
    label: '可乐鸡翅',
    value: '可乐鸡翅',
  },
  {
    label: '爆炒虾仁',
    value: '爆炒虾仁',
  },
  {
    label: '清蒸小黄鱼',
    value: '清蒸小黄鱼',
  },
  {
    label: '红烧肉',
    value: '红烧肉',
  },
];

const VerticalRadioType: FC = () => (
  <Form>
    <List>
      <NomarRadio
        fieldProps="userRadio5"
        required
        data={foodList}
        title="喜欢的食物"
        positionType="vertical"
        radioType="vertical"
      />
    </List>
  </Form>
);

export default VerticalRadioType;
