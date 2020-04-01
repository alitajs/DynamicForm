/**
 * title: 基础 选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
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
  ],
];

const citys = [
  [
    {
      label: '福州',
      value: '福州',
    },
    {
      label: '厦门',
      value: '厦门',
    },
  ],
];

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log(errorInfo);
  };
  const formsData = [
    {
      type: 'select',
      fieldProps: 'userPicker1',
      title: '季节',
      placeholder: '请选择',
      data: seasons,
    },
    {
      type: 'select',
      fieldProps: 'userPicker2',
      required: true,
      title: '城市',
      placeholder: '请选择',
      data: citys,
    },
    {
      type: 'select',
      fieldProps: 'userPicker3',
      required: true,
      title: '城市(不可编辑)',
      placeholder: '请选择',
      data: citys,
      disabled: true,
    },
    {
      type: 'select',
      fieldProps: 'verticalPicker',
      title: '季节',
      placeholder: '请选择',
      data: seasons,
      positionType: 'vertical',
    },
  ] as IFormItemProps[];

  const formsValues = {
    userPicker2: ['厦门'],
    userPicker3: ['福州'],
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    data: formsData,
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
