/**
 * title: 基础 多选框
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { MultiplePicker } from '../../../..';
interface SingleProps {
  onChange: any;
}

const foodList = [
  {
    foodName: '宫保鸡丁',
    foodId: '宫保鸡丁',
  },
  {
    foodName: '可乐鸡翅',
    foodId: '可乐鸡翅',
  },
  {
    foodName: '爆炒虾仁',
    foodId: '爆炒虾仁',
  },
  {
    foodName: '清蒸小黄鱼',
    foodId: '清蒸小黄鱼',
  },
  {
    foodName: '红烧肉',
    foodId: '红烧肉',
  },
];

const Page: FC<SingleProps> = ({ onChange }) => {
  const [singleUse, setSingleUse] = useState<(string | number)[]>(['宫保鸡丁']);

  return (
    <MultiplePicker
      fieldProps="a"
      required
      data={foodList}
      title="食物"
      placeholder="请选择食物"
      alias={{
        label: 'foodName',
        value: 'foodId',
      }}
      defaultValue={singleUse}
      clear
      onChange={(e) => {
        setSingleUse(e);
        onChange();
      }}
    />
  );
};

export default Page;
