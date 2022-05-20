/**
 * title: 基础 多选框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformCheckBox,
} from '@alitajs/dform';

const fruitsList = [
  { foodId: 'apple', foodName: '苹果', desc: '这是苹果' },
  { foodId: 'banana', foodName: '香蕉', desc: '这是香蕉' },
  { foodId: 'orange', foodName: '橙子', desc: '这是橙子' },
  { foodId: 'watermelon', foodName: '西瓜', desc: '这是西瓜' },
  { foodId: 'hami', foodName: '哈密瓜', desc: '这是哈密瓜' },
  { foodId: 'pineapple', foodName: '菠萝', desc: '这是菠萝' },
  { foodId: 'pear', foodName: '香梨', desc: '这是香梨' },
];

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
  const formsValues = {
    fruit: ['watermelon', 'orange'],
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
          disableItem={(item) => {
            if (item.value === 'watermelon') return true;
            return false;
          }}
        />
        <DformCheckBox
          title="喜欢的水果(默认值)"
          data={fruitsList}
          fieldProps="defaultValue"
          chunk={3}
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
          defaultValue={['orange']}
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
