/**
 * title: 基础 输入框
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformInput,
  DformRadio,
  DformPicker,
  DformDatePicker,
  RangeDatePicker,
  DformCheckBox,
} from '@alitajs/dform';

const { Group } = DynamicForm;

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

  const formsValues = {};
  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    isDev: true,
  };

  return (
    <div>
      <DynamicForm {...formProps}>
        <WhiteSpace />
        <Group type="card" title="卡片一" require>
          <DformInput
            fieldProps="username"
            required
            placeholder="请输入"
            title="用户名"
            defaultValue="小红"
          />
          <DformRadio
            fieldProps="sex"
            title="性别"
            data={[
              { label: '男', value: 'man' },
              { label: '女', value: 'woman' },
            ]}
          />
        </Group>
        <WhiteSpace />
        <Group
          type="card"
          title="卡片二"
          leftView={
            <div
              style={{
                background: '#1890ff',
                margin: '0.1rem 0.1rem 0 0',
                width: '0.1rem',
                height: '0.3rem',
                borderRadius: '0.4rem',
              }}
            />
          }
        >
          <DformPicker
            fieldProps="weather"
            placeholder="请选择"
            title="天气"
            data={[
              { label: '晴', value: '晴' },
              { label: '阴', value: '阴' },
              { label: '雨', value: '雨' },
            ]}
          />
          <RangeDatePicker
            fieldProps="rangeTime1"
            fieldProps2="rangeTime2"
            title="时间(month)"
            modeType="month"
            firstProps={{
              onOk: (val: any) => {
                // eslint-disable-next-line no-console
                console.log(val);
              },
            }}
          />
        </Group>
        <WhiteSpace />
        <DformDatePicker
          fieldProps="date"
          placeholder="请选择"
          title="出生年月"
        />
        <DformCheckBox
          title="喜欢的水果"
          required
          data={[
            { label: '哈密瓜', value: '哈密瓜' },
            { label: '菠萝', value: '菠萝' },
            { label: '香梨', value: '香梨' },
          ]}
          fieldProps="fruit"
          disableItem={(x: any) => ['香梨'].some((a) => x.value === a)}
        />
      </DynamicForm>
      <WhiteSpace />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </div>
  );
};

export default Page;
