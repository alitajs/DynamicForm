import React, { FC, useState, useEffect } from 'react';
import { List, Button } from 'antd-mobile';
import {
  NomarInput,
  NomarPicker,
  NomarRadio,
  NomarDatePicker,
  Form,
  useForm,
  Store,
  ValidateErrorEntity,
  MultiplePicker,
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

// const ageData = Array.from

const UserName: FC = () => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = useState<any>({});

  useEffect(() => {
    setFormsValues({
      username: '小明',
      sex: 'man',
      motion: ['羽毛球', '乒乓球'],
    });
  }, []);

  useEffect(() => {
    const vals = form.getFieldsValue();
    form.setFieldsValue({
      ...vals,
      ...formsValues,
    });
  }, [formsValues]);

  const onFinish = (values: Store) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
  };

  return (
    <div>
      <Form {...formProps}>
        <List>
          <NomarInput
            fieldProps="username"
            required
            placeholder="请输入"
            title="用户名"
          />
          <NomarRadio fieldProps="sex" title="性别" data={sexData} />
          <NomarDatePicker
            fieldProps="date"
            placeholder="请选择"
            title="出生年月"
          />
          <NomarPicker
            fieldProps="weather"
            placeholder="请选择"
            title="天气"
            data={weatherData}
          />
          <MultiplePicker
            fieldProps="motion"
            placeholder="请选择"
            title="特长"
            data={motionData}
          />
        </List>
      </Form>
      <Button onClick={() => form.submit()}>submit</Button>
    </div>
  );
};

export default UserName;
