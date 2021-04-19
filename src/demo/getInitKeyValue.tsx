import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  Store,
  ValidateErrorEntity,
  useForm,
  getInitKeyValue,
} from '@alitajs/dform';

const sexList = [
  {
    label: '男',
    value: 'man',
  },
  {
    label: '女',
    value: 'woman',
  },
];

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
      type: 'input',
      fieldProps: 'username',
      placeholder: '请输入',
      title: '用户名',
      inputType: 'text',
      initKey: 'a',
    },
    {
      type: 'picker',
      fieldProps: 'userdata',
      placeholder: '请选择',
      title: '用户性别',
      data: sexList,
      initKey: 'a',
    },
    {
      type: 'multiplePicker',
      fieldProps: 'userFood',
      data: foodList,
      title: '选择喜欢的食物(多选)',
      placeholder: '请选择',
      initKey: 'b',
    },
    {
      type: 'switch',
      fieldProps: 'userswitch',
      required: true,
      placeholder: '请选择',
      title: '用户选择',
    },
  ] as IFormItemProps[];
  const formsValues = {
    username: '小明',
    userdata: 'man',
    userFood: ['爆炒虾仁', '红烧肉'],
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
  };
  return (
    <>
      <DynamicForm {...formProps} />
      <WhiteSpace size="sm" />
      <Button
        type="primary"
        onClick={() => {
          console.log(getInitKeyValue({ form, data: formsData, key: 'a' }));
        }}
      >
        获取 initKey 为 a 的数据
      </Button>
      <WhiteSpace size="sm" />
      <Button
        type="primary"
        onClick={() => {
          console.log(getInitKeyValue({ form, data: formsData, key: 'b' }));
        }}
      >
        获取 initKey 为 b 的数据
      </Button>
    </>
  );
};

export default Page;
