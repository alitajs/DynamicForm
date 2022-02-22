/**
 * title: 基础 多选框
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  MultiplePicker,
  WhiteSpace,
} from '@alitajs/dform';

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

const Page: FC = () => {
  const [singleUse, setSingleUse] = useState<(string | number)[]>(['红烧肉']);
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
    youFood: ['红烧肉', '清蒸小黄鱼'],
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    autoLineFeed: false,
    isDev: false,
    isPc: false,
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <MultiplePicker
          fieldProps="food"
          required
          data={foodList}
          title="食物(默认值)"
          labelNumber={7}
          placeholder="请选择食物"
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
          defaultValue={['爆炒虾仁', '宫保鸡丁']}
          clear
        />
        <MultiplePicker
          fieldProps="myFood"
          required={true}
          data={foodList}
          title="我喜欢的食物"
          labelNumber={7}
          placeholder="请选择我喜欢的食物"
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
          onChange={(e: (string | number)[]) => {
            // eslint-disable-next-line no-console
            console.log(e);
          }}
        />
        <MultiplePicker
          fieldProps="youFood"
          data={foodList}
          title="选择你喜欢的食物(不可编辑)"
          labelNumber={7}
          placeholder="请选择我喜欢的食物"
          positionType="vertical"
          maxValueLength={1}
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
          disabled
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
      <h1>单独使用</h1>
      <MultiplePicker
        fieldProps="a"
        required
        data={foodList}
        title="食物"
        placeholder="请选择食物"
        alias={{
          label: 'foodName',
          value: 'foodId',
        }}
        defaultValue={singleUse}
        clear
        onChange={(e) => setSingleUse(e)}
      />
    </>
  );
};

export default Page;
