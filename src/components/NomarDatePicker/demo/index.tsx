/**
 * title: 基础 时间选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

import DynamicForm, { IFormItemProps } from '../../../DynamicForm';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 }
}

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
      type: 'date',
      fieldProps: 'Date',
      modeType: 'date',
      title: 'Date',
      maxDate: new Date(),
      minDate: new Date(),
    },
    {
      type: 'date',
      fieldProps: 'Month',
      modeType: 'month',
      title: 'Month',
    },
    {
      type: 'date',
      fieldProps: 'DateTime',
      modeType: 'datetime',
      title: 'DateTime',
    },
  ] as IFormItemProps[];

  const formsValues = {
    Date: new Date(),
    Month: new Date(),
    DateTime: new Date(),
  }

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsData,
    formsValues,
  }

  return (
    <DynamicForm {...formProps}>
      <WhiteSpace size="sm" />
      <Field {...tailLayout}>
        <Button type="primary" onClick={() => {form.submit()}}>
          Submit
        </Button>
      </Field>
    </DynamicForm>
  )
}

export default Page;
