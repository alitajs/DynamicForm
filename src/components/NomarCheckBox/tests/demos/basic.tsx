import React, { FC } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, { useForm, DformCheckBox, WhiteSpace } from '../../../..';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onChange?: (val: any) => void;
  single?: boolean;
  isPc?: boolean;
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

const Page: FC<BasicProps> = ({
  onFinish,
  onFinishFailed,
  onChange = (val: any) => {},
  single = false,
  isPc = false,
}) => {
  const [form] = useForm();

  const formsValues = {
    fruit: ['orange'],
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    isDev: true,
    isPc,
  };
  if (single) {
    return (
      <DformCheckBox
        title="喜欢的水果"
        required
        data={fruitsList}
        fieldProps="fruit"
        chunk={2}
        alias={{
          label: 'foodName',
          value: 'foodId',
        }}
        onChange={onChange}
      />
    );
  }
  return (
    <>
      <DynamicForm {...formProps}>
        <DformCheckBox
          title="喜欢的水果"
          required
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
