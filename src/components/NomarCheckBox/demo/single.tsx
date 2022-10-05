/**
 * title: 基础 输入框
 * desc: 单独使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import { DformCheckBox } from '@alitajs/dform';

const Page: FC = () => {
  const dataList = [
    { telId: 'vivo', telName: 'vivo', desc: '这是vivo手机' },
    { telId: 'oppo', telName: 'oppo', desc: '这是oppo手机' },
    { telId: 'honor', telName: '荣耀', desc: '这是荣耀手机' },
    { telId: 'xiaomi', telName: '小米', desc: '这是小米手机' },
    { telId: 'huawei', telName: '华为', desc: '这是华为手机' },
    { telId: 'apple', telName: 'apple', desc: '这是苹果手机' },
  ];
  return (
    <>
      <DformCheckBox
        fieldProps="a"
        defaultValue={['huawei', 'apple']}
        required
        title="手机型号"
        chunk={3}
        data={dataList}
        alias={{
          label: 'telName',
          value: 'telId',
        }}
        disableItem={(item) => {
          if (item.value === 'huawei') return true;
          return false;
        }}
        //  defaultValue={inputValue}
      />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => console.log({ inputValue })}>
        Submit
      </Button>
    </>
  );
};

export default Page;
