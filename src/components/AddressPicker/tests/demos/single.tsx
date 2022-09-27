/**
 * title: 基础 选址
 * desc: 单独使用 demo
 */
import React, { FC, useState } from 'react';
import { Toast, Button, WhiteSpace } from 'antd-mobile-v2';
import { AddressPicker } from '@alitajs/dform';

import CountryList from '@bang88/china-city-data';

const Page: FC = () => {
  const [homeAddrData, setHomeAddrData] = useState<any>([]);
  const [value, setValue] = useState<any>({
    label: ['福建省', '福州市', '鼓楼区'],
    value: ['35', '3501', '350102'],
  });

  const queryList = (list: any, val: string | number) => {
    let newList: any[] = [];
    list.map((item: { value: string; children: any[] }) => {
      if (item.value === val) {
        newList = item.children;
      }
      if (item.children && Array.isArray(item.children)) {
        const vals = queryList(item.children, val);
        if (vals && vals.length > 0) {
          newList = vals;
        }
      }
    });
    return newList;
  };

  const getResetHomeAddrList = (values: (number | string)[]) => {
    let data: { label: string; value: string }[] = [];
    switch (values.length) {
      case 0:
        data = CountryList;
        break;
      case 1:
      case 2:
        data = queryList(CountryList, values[values.length - 1]);
        break;
      case 3:
        break;
      default:
        break;
    }
    return data;
  };

  const resetHomeAddrList = (values: (number | string)[], key: string) => {
    let mValues = JSON.parse(JSON.stringify(values));
    let data: { label: string; value: string }[] =
      getResetHomeAddrList(mValues);
    Toast.hide();
    setHomeAddrData(data);
  };

  return (
    <>
      <AddressPicker
        fieldProps="homeAddr"
        title="工作地址"
        placeholder="选择当前工作地址"
        required
        data={homeAddrData}
        placeholderList={['请选择省', '请选择市', '请选择区']}
        onChangeLevel={(values: (string | number)[]) => {
          console.log('values', values);
          Toast.show('加载中');
          // eslint-disable-next-line no-console
          setTimeout(() => {
            resetHomeAddrList(values, 'homeAddrData');
          }, 300);
        }}
        defaultValue={value}
        onChange={(value: any) => {
          setValue(value);
        }}
      />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => console.log({ value })}>
        Submit
      </Button>
    </>
  );
};

export default Page;
