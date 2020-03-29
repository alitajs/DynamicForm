/**
 * title: 基础 时间选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
// 所有需要从 rc-field-form 中导出的字段都可以在 dform 中导出
import DynamicForm, { IFormItemProps } from '../../../DynamicForm';
import { dateChange } from '../../..';

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
      required: true,
    },
    {
      type: 'date',
      fieldProps: 'DateTime',
      modeType: 'datetime',
      title: 'DateTime',
      required: true,
    },
    {
      type: 'date',
      fieldProps: 'DateTimeVertical',
      modeType: 'datetime',
      title: 'DateTimeVertical',
      required: true,
      positionType: 'vertical',
    },
  ] as IFormItemProps[];

  const formsValues = {
    Date: new Date(),
    Month: new Date(),
    DateTime: dateChange('2020-02-02 22:22'),
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    isDev: true,
  };

  return (
    <>
      <DynamicForm {...formProps} />
      <WhiteSpace size="sm" />
      <Button
        type="primary"
        onClick={() => {
          form.submit();
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default Page;
