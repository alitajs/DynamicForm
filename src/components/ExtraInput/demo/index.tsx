/**
 * title: ExtraInput
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

import DynamicForm, { IFormItemProps } from '../../../DynamicForm';

const Page: FC = props => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };
  const formsData = [
    
  ];
  const formsValues = {};
  const formProps = {
    onFinish,
    onFinishFailed,
    formsData,
    formsValues,
    form,
  }
  return <Button type="primary">Submit</Button>;
};

export default Page;
