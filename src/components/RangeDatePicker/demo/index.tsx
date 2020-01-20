/**
 * title: 基础 时间区间选择框
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

const RangeDatePicker: FC = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const formsData = [
    {
      type: 'rangeDatePicker',
      fieldProps: 'rangeTime1',
      fieldProps2: 'rangeTime2',
      title: '时间(datetime)',
      modeType: 'datetime',
    },
    {
      type: 'rangeDatePicker',
      required: true,
      fieldProps: 'rangeTime3',
      fieldProps2: 'rangeTime4',
      title: '时间(month)',
      modeType: 'month',
    }
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
        <Button type="primary" onClick={() => form.submit()}>Submit</Button>
      </Field>
    </DynamicForm>
  )
}

export default RangeDatePicker;