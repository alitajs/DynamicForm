/**
 * title: 基础 选址
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
// 所有需要从 rc-field-form 中导出的字段都可以在 dform 中导出
import DynamicForm, { IFormItemProps } from '../../../DynamicForm';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

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
      type: 'addressPicker',
      fieldProps: 'myFood',
      required: true,
      title: '选择我喜欢的食物',
      placeholder: '请选择我喜欢的食物',
      onChange: (e: (string | number)[]) => {
        // eslint-disable-next-line no-console
        console.log(e);
      },
    },
    {
      type: 'addressPicker',
      fieldProps: 'youFood',
      title: '选择你喜欢的食物(不可编辑)',
      disabled: true,
      placeholder: '请选择',
      positionType: 'vertical',
      maxValueLength: 1,
    },
  ] as IFormItemProps[];
  const formsValues = {};
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    autoLineFeed: false,
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
