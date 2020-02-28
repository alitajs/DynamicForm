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
  wrapperCol: { offset: 2, span: 20 },
};

const RangeDatePicker: FC = () => {
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
      type: 'rangeDatePicker',
      fieldProps: 'rangeTime1',
      fieldProps2: 'rangeTime2',
      title: '时间(datetime)',
      modeType: 'datetime',
      firstProps: {
        onOk: (val: any) => {
          // eslint-disable-next-line no-console
          console.log(val);
        },
      },
    },
    {
      type: 'rangeDatePicker',
      required: true,
      fieldProps: 'rangeTime3',
      fieldProps2: 'rangeTime4',
      title: '时间(month)',
      modeType: 'month',
      positionType: 'horizontal',
    },
    {
      type: 'rangeDatePicker',
      required: true,
      fieldProps: 'rangeTime5',
      fieldProps2: 'rangeTime6',
      title: '时间(date)',
      positionType: 'vertical',
    },
  ] as IFormItemProps[];

  const formsValues = {
    rangeTime1: new Date(),
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
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

export default RangeDatePicker;
