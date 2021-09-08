/**
 * title: 基础 多选框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  MultiplePicker,
} from '../../../../index';
interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onChange: any;
}

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed, onChange }) => {
  const [form] = useForm();

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
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <MultiplePicker
          fieldProps="myFood"
          required={true}
          data={foodList}
          title="我喜欢的食物"
          labelNumber={7}
          placeholder="请选择我喜欢的食物111"
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
          onChange={onChange}
        />
        <MultiplePicker
          fieldProps="youFood"
          // required={true}
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
    </>
  );
};

export default Page;
