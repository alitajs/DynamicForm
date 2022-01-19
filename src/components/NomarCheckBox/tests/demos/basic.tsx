import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm, { useForm, DformCheckBox } from '../../../..';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
}
const fruitsList = [
  { foodId: 'apple', foodName: '苹果' },
  { foodId: 'banana', foodName: '香蕉' },
  { foodId: 'orange', foodName: '橙子' },
  { foodId: 'watermelon', foodName: '西瓜' },
  { foodId: 'hami', foodName: '哈密瓜' },
  { foodId: 'pineapple', foodName: '菠萝' },
  { foodId: 'pear', foodName: '香梨' },
];

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed }) => {
  const [form] = useForm();
  // const formsData = [
  //   {
  //     type: 'checkbox',
  //     title: '喜欢的水果',
  //     required: true,
  //     data: fruitsList,
  //     fieldProps: 'fruit',
  //     chunk: 2,
  //     alias: {
  //       label: 'foodName',
  //       value: 'foodId',
  //     },
  //   },
  // ] as IFormItemProps[];

  const formsValues = {
    fruit: ['orange'],
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    isDev: true,
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <DformCheckBox
          title="喜欢的水果"
          required={true}
          data={fruitsList}
          fieldProps="fruit"
          chunk={2}
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
        />
      </DynamicForm>
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
