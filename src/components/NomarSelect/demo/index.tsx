/**
 * title: 基础 选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformSelect,
} from '@alitajs/dform';

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
      value: 'fuzhou',
    },
    {
      label: '厦门',
      value: 'xiamen',
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
  const formsValues = {
    userPicker1: ['2013', '春'],
    userPicker2: ['xiamen'],
    userPicker3: ['fuzhou'],
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    autoLineFeed: false,
    isDev: false,
  };

  return (
    <>
      <DynamicForm {...formProps}>
        <DformSelect
          type="select"
          fieldProps="userPicker1"
          title="季节"
          placeholder="请选择"
          data={seasons}
        />
        <DformSelect
          type="select"
          fieldProps="userPicker2"
          required
          title="城市(默认值)"
          placeholder="请选择"
          data={citys}
          onChange={(event) => {
            console.log(event);
          }}
          defaultValue={['xiamen']}
        />
        <DformSelect
          type="select"
          fieldProps="userPicker3"
          required
          title="城市(不可编辑)"
          placeholder="请选择"
          data={citys}
          disabled
          labelNumber={7}
          defaultValue={['fuzhou']}
        />
        <DformSelect
          type="select"
          fieldProps="verticalPicker"
          title="季节"
          placeholder="请选择"
          data={seasons}
          positionType="vertical"
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
