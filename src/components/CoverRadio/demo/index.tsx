/**
 * title: 基础 coverRadio
 * desc: 表单使用 demo
 */

import React from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';

const sexList = [
  { sexName: '男', sexId: 'man' },
  { sexName: '女', sexId: 'woman' },
];

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

const Page = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const formsData = [
    {
      type: 'coverRadio',
      fieldProps: 'sex',
      data: sexList,
      title: '性别',
      required: true,
      onChange: (val: any) => {
        // eslint-disable-next-line no-console
        console.log(val);
      },
      alias: {
        label: 'sexName',
        value: 'sexId',
      },
    },
    {
      type: 'coverRadio',
      fieldProps: 'sex2',
      data: sexList,
      title: '选择您的性别',
      positionType: 'vertical',
      alias: {
        label: 'sexName',
        value: 'sexId',
      },
      disabled: true,
    },
    {
      type: 'coverRadio',
      fieldProps: 'food',
      data: foodList,
      title: '喜欢的食物',
      required: true,
      positionType: 'vertical',
      radioType: 'vertical',
    },
  ] as IFormItemProps[];

  const formsValues = {
    sex2: 'woman',
    sex: 'man',
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
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
