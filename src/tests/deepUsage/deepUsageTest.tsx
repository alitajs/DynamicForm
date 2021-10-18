/**
 * title: 基础 输入框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformInput,
  DformRadio,
  DformPicker,
  DformDatePicker,
  RangeDatePicker,
  DformCheckBox,
  MultiplePicker,
} from '../..';

const Page: FC = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {};

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {};

  const formsValues = {};
  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
  };

  return (
    <div>
      <DynamicForm {...formProps}></DynamicForm>
    </div>
  );
};

export default Page;
