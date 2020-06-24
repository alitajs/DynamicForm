import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';

const radioList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
];

const dayList = [
  {
    label: '晴',
    value: '晴',
  },
  {
    label: '阴',
    value: '阴',
  },
  {
    label: '雨',
    value: '雨',
  },
];

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

const DfromRadioTextPage: FC = () => {
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
      type: 'radio',
      fieldProps: 'userRadio1',
      required: true,
      data: radioList,
      title: '发票',
      onChange: (e: string | number) => {
        // eslint-disable-next-line no-console
        console.log(e);
      },
    },
    {
      type: 'radio',
      fieldProps: 'userRadio2',
      required: true,
      disabled: true,
      data: dayList,
      positionType: 'vertical',
      title: '天气情况',
    },
    {
      type: 'radio',
      fieldProps: 'userRadio3',
      required: true,
      data: foodList,
      title: '喜欢的食物',
      radioType: 'vertical',
      alias: {
        label: 'foodId',
        value: 'foodName',
      },
    },
  ] as IFormItemProps[];

  const formsValues = {
    userRadio2: '雨',
    userRadio3: '红烧肉',
  };

  const formProps = {
    data: formsData,
    formsValues,
    form,
    onFinishFailed,
    onFinish,
    isDev: true,
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

export default DfromRadioTextPage;
