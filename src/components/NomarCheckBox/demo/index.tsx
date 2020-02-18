/**
 * title: 基础 多选框
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

const fruitsList = [
  { label: '苹果', value: '苹果' },
  { label: '香蕉', value: '香蕉' },
  { label: '橙子', value: '橙子' },
  { label: '西瓜', value: '西瓜' },
  { label: '哈密瓜', value: '哈密瓜' },
  { label: '菠萝', value: '菠萝' },
  { label: '香梨', value: '香梨' },
];

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
  const formsData = [
    {
      type: 'checkbox',
      title: '喜欢的水果',
      required: true,
      data: fruitsList,
      fieldProps: 'fruit',
    },
  ] as IFormItemProps[];

  const formsValues = {
    fruit: ['西瓜', '橙子'],
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
  };
  return (
    <DynamicForm {...formProps}>
      <WhiteSpace size="sm" />
      <Field {...tailLayout}>
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Submit
        </Button>
      </Field>
    </DynamicForm>
  );
};

export default Page;
