import React, { FC, useState, useEffect } from 'react';
import { WhiteSpace, Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  IFormItemProps,
} from '@alitajs/dform';

const sexData = [
  { label: '男', value: 'man' },
  { label: '女', value: 'woman' },
];
const weatherData = [
  { label: '晴', value: '晴' },
  { label: '阴', value: '阴' },
  { label: '雨', value: '雨' },
];

const motionData = [
  { label: '篮球', value: '篮球' },
  { label: '羽毛球', value: '羽毛球' },
  { label: '乒乓球', value: '乒乓球' },
];

const data = [
  {
    type: 'input',
    fieldProps: 'username',
    required: true,
    placeholder: '请输入',
    title: '用户名',
    defaultValue: '小红',
  },
  {
    type: 'radio',
    fieldProps: 'sex',
    title: '性别',
    data: sexData,
  },
  {
    type: 'date',
    fieldProps: 'date',
    placeholder: '请选择',
    title: '出生年月',
  },
  {
    type: 'picker',
    fieldProps: 'weather',
    placeholder: '请选择',
    title: '天气',
    data: weatherData,
  },
  {
    type: 'multiplePicker',
    fieldProps: 'motion',
    placeholder: '请选择',
    title: '特长',
    data: motionData,
  },
] as IFormItemProps[];

const Page: FC = () => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = useState<any>({});

  useEffect(() => {
    setFormsValues({
      sex: 'man',
      motion: ['羽毛球', '乒乓球'],
    });
  }, []);

  const onFinish = (values: Store) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const formProps = {
    form,
    data,
    onFinish,
    onFinishFailed,
    formsValues,
  };

  return (
    <div>
      <DynamicForm {...formProps} />
      <WhiteSpace />
      <Button type="primary" onClick={() => form.submit()}>
        submit
      </Button>
    </div>
  );
};

export default Page;
