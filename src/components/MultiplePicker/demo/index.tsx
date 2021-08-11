/**
 * title: 基础 多选框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
} from '@alitajs/dform';

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

  const foodList = [
    {
      foodName: '宫保鸡丁',
      foodId: '宫保鸡丁',
    },
    {
      foodName: '可乐鸡翅',
      foodId: '可乐鸡翅',
    },
    {
      foodName: '爆炒虾仁',
      foodId: '爆炒虾仁',
    },
    {
      foodName: '清蒸小黄鱼',
      foodId: '清蒸小黄鱼',
    },
    {
      foodName: '红烧肉',
      foodId: '红烧肉',
    },
  ];

  const formsData = [
    {
      type: 'multiplePicker',
      fieldProps: 'myFood',
      required: true,
      data: foodList,
      title: '我喜欢的食物',
      labelNumber: 7,
      placeholder: '请选择我喜欢的食物',
      onChange: (e: (string | number)[]) => {
        // eslint-disable-next-line no-console
        console.log(e);
      },
      alias: {
        label: 'foodName',
        value: 'foodId',
      },
    },
    {
      type: 'multiplePicker',
      fieldProps: 'youFood',
      data: foodList,
      title: '选择你喜欢的食物(不可编辑)',
      disabled: true,
      placeholder: '请选择',
      positionType: 'vertical',
      maxValueLength: 1,
      alias: {
        label: 'foodName',
        value: 'foodId',
      },
    },
  ] as IFormItemProps[];
  const formsValues = {
    youFood: ['红烧肉', '清蒸小黄鱼'],
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    autoLineFeed: false,
    isDev: false,
  };
  return (
    <>
      <DynamicForm {...formProps} />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
