/**
 * title: 基础 单选框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

import DynamicForm, { IFormItemProps } from '../../../DynamicForm';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

const radioList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
];

const dayList = [
  {
    label: '晴',
    value: '晴',
  },
  {
    label: '阴',
    value: '阴',
  },
  {
    label: '雨',
    value: '雨',
  },
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
    console.log('Failed:', errorInfo);
  };
  const formsData = [
    {
      type: 'radio',
      fieldProps: 'userRadio1',
      required: true,
      data: radioList,
      title: '发票',
    },
    {
      type: 'radio',
      fieldProps: 'userRadio2',
      required: true,
      data: dayList,
      positionType: 'vertical',
      title: '天气情况',
    },
    {
      type: 'radio',
      fieldProps: 'userRadio3',
      required: true,
      data: radioList,
      title: '发票',
      disabled: true,
    },
  ] as IFormItemProps[];
  const formsValues = {
    userRadio1: 'yes',
    userRadio2: '晴',
    userRadio3: 'no',
  };
  const formProps = {
    data: formsData,
    formsValues,
    form,
    onFinishFailed,
    onFinish,
  };
  return (
    <DynamicForm {...formProps}>
      <WhiteSpace size="sm" />
      <Field {...tailLayout}>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </Field>
    </DynamicForm>
  );
};

export default Page;
