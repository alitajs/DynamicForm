/**
 * title: 基础 时间选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, { useForm, dateChange } from '../../../../index';
import DformDate from '../..';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onChange: any;
}

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed, onChange }) => {
  const [form] = useForm();
  const formsValues = {
    Date: new Date(),
    DateTime: dateChange('2020-02-02 22:22'),
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    isDev: false,
  };

  return (
    <>
      <DynamicForm {...formProps}>
        <DformDate
          fieldProps="Date"
          modeType="date"
          title="Date"
          disabled={true}
          maxDate={new Date()}
          minDate={new Date()}
        />
        <DformDate
          fieldProps="Month"
          modeType="month"
          title="Month"
          required={true}
          onChange={onChange}
          placeholder="请选择月份"
        />

        <DformDate
          fieldProps="DateTime"
          modeType="datetime"
          title="DateTimeVertical"
          required={true}
          positionType="vertical"
          onChange={onChange}
          placeholder="请选择时间"
        />
      </DynamicForm>
      <WhiteSpace size="lg" />
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
