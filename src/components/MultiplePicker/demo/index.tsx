/**
 * title: 基础 多选框
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

  const extraImg = () => <img src={PositionIcon} />;

  const foodList = [
    {
      label: '宫保鸡丁',
      value: '宫保鸡丁',
    },
    {
      label: '可乐鸡翅',
      value: '可乐鸡翅',
    },
    {
      label: '爆炒虾仁',
      value: '爆炒虾仁',
    },
    {
      label: '清蒸小黄鱼',
      value: '清蒸小黄鱼',
    },
    {
      label: '红烧肉',
      value: '红烧肉',
    },
  ];

  const formsData = [
    {
      type: 'multiplePicker',
      fieldProps: 'food',
      data: foodList,
      title: '选择喜欢的食物',
      placeholder: '请选择',
    },
  ] as IFormItemProps[];
  const formsValues = {};
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

export default Page;
