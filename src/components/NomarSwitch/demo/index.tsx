/**
 * title: Switch
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

import DynamicForm, { IFormItemProps } from '../../../DynamicForm';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

interface PageProps {}

const Page: FC<PageProps> = props => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  }

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log(errorInfo);
  }

  const formsData = [
    {
      type: 'switch',
      fieldProps: 'userSwitch',
      placeholder: '选择',
      title: '用户选择',
      required: true,
    },
  ] as IFormItemProps[];
  const formsValues = {};
  const formsProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    formsData,
  }

  return (
    <DynamicForm {...formsProps}>
      <WhiteSpace size='sm' />
        <Button type="primary" onClick={() => form.submit()} >
          Submit
        </Button>
    </DynamicForm>
  )
}

export default Page;

