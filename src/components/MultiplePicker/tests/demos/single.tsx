/**
 * title: 单独使用 多选框
 * desc: 单独使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import MultiplePicker from '../../';

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

interface pageProps {
  onSbumit?: () => void;
}
const Page: FC<pageProps> = (props) => {
  const { onSbumit } = props;
  const [mulValue, setMulValue] = useState<(string | number)[]>(['宫保鸡丁']);
  return (
    <>
      <MultiplePicker
        fieldProps="food"
        required
        data={foodList}
        title="食物(默认值)"
        labelNumber={7}
        placeholder="请选择食物"
        alias={{
          label: 'foodName',
          value: 'foodId',
        }}
        formFlag={false}
        defaultValue={mulValue}
        clear
        valueLinks={{
          清蒸小黄鱼: {
            linkVals: ['爆炒虾仁'],
            unLlinkVals: ['可乐鸡翅'],
          },
          宫保鸡丁: {
            unLlinkVals: ['红烧肉'],
          },
        }}
        onChange={(e: (string | number)[]) => setMulValue(e)}
      />
      <WhiteSpace size="sm" />
      <Button
        type="primary"
        onClick={() => {
          if (onSbumit) onSbumit();
          else console.log(mulValue);
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default Page;
