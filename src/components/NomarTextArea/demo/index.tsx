/**
 * title: 基础 多行文本输入框
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

const Page: FC = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const formsData = [
    {
      type: 'area',
      fieldProps: 'textArea1',
      required: true,
      placeholder: '请输入...'
    },
    {
      type: 'area',
      fieldProps: 'textArea2',
      title: '有标题',
      placeholder: '只读，不可编辑',
      rows: 3,
      editable: false,
    },

  ] as IFormItemProps[];

  const formsValues = {};

  const formProps = {
    onFinish,
    onFinishFailed,
    formsData,
    formsValues,
    form,
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
