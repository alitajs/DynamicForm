/**
 * title: 基础 下拉单选框
 * desc: 单独使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import { DformSelect } from '@alitajs/dform';

const Page: FC = () => {
  const [inputValue, setInputValue] = useState<string>('1');

  const data = [
    [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
      {
        label: '2015',
        value: '2015',
      },
      {
        label: '2016',
        value: '2016',
      },
    ],
    [
      {
        label: '春',
        value: '春',
      },
      {
        label: '夏',
        value: '夏',
      },
      {
        label: '秋',
        value: '秋',
      },
      {
        label: '冬',
        value: '冬',
      },
    ],
  ];
  return (
    <>
      <DformSelect
        type="select"
        fieldProps="a"
        required
        placeholder="请输入"
        title="季节"
        data={data}
        onChange={(e: any) => setInputValue(e)}
        defaultValue={inputValue}
      />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => console.log({ inputValue })}>
        Submit
      </Button>
    </>
  );
};

export default Page;
