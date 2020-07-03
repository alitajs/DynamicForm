/**
 * title: 基础 选址
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace, Toast } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';

import CountryList from '@bang88/china-city-data';

interface IAddrDataProps {
  label: string;
  value: string | number;
}

const Page: FC = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const [homeAddrData, setHomeAddrData] = useState<IAddrDataProps[] | []>([]);
  const [workAddrData, setWorkAddrData] = useState<IAddrDataProps[] | []>([]);

  const queryList = (list: any, val: string) => {
    let newList: any[] = [];
    list.map((item: { value: string; children: any[] }) => {
      if (item.value === val) {
        newList = item.children;
      }
      if (item.children && Array.isArray(item.children)) {
        const vals = queryList(item.children, val);
        if (vals && vals.length > 0) newList = vals;
      }
    });
    return newList;
  };

  const resetHomeAddrList = (values: (number | string)[]) => {
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
        data = queryList(CountryList, values[values.length - 2]);
        break;
      default:
        break;
    }
    setHomeAddrData(data);
    Toast.hide();
  };
  const resetWorkAddrList = (values: (number | string)[]) => {
    let data: { label: string; value: string }[] = [];
    switch (values.length) {
      case 0:
        data = CountryList;
        break;
      default:
        data = queryList(CountryList, values[values.length - 1]);
        break;
    }
    setWorkAddrData(data);
    Toast.hide();
  };

  const formsData = [
    {
      type: 'addressPicker',
      fieldProps: 'homeAddr',
      title: '居住地址',
      placeholder: '选择当前居住城市',
      level: 3,
      data: homeAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区'],
      onChangeLevel: (values: (string | number)[]) => {
        // eslint-disable-next-line no-console
        Toast.loading('加载中', 0.5);
        console.log(values);
        setTimeout(() => {
          resetHomeAddrList(values);
        }, 500);
      },
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log('存在点击事件');
      },
    },
    {
      type: 'addressPicker',
      fieldProps: 'workAddr',
      title: '工作地址',
      asyncLoad: false,
      // disabled: true,
      required: true,
      placeholder: '请选择',
      positionType: 'vertical',
      level: 4,
      data: workAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区', '请选择街道'],
      onChangeLevel: (values: (string | number)[]) => {
        // eslint-disable-next-line no-console
        console.log(values);
        resetWorkAddrList(values);
      },
      noData: <div>暂无街道数据</div>,
    },
  ] as IFormItemProps[];

  const formsValues = {
    homeAddr: {
      value: ['350000', '350100', '350102'],
      label: ['福建省', '福州市', '鼓楼区'],
    },
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    autoLineFeed: false,
    isDev: true,
  };
  return (
    <>
      <DynamicForm {...formProps} />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
