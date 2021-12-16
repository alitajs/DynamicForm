import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, { useForm } from '../../../../index';
import RangeDatePicker from '../../';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
}

const page: FC<BasicProps> = ({ onFinish, onFinishFailed }) => {
  const [form] = useForm();

  const formsValues = {
    rangeTime1: new Date(),
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    isDev: false,
  };

  return (
    <>
      <DynamicForm {...formProps}>
        <RangeDatePicker
          fieldProps="rangeTime1"
          fieldProps2="rangeTime2"
          title="时间(datetime)"
          modeType="datetime"
          required
          firstProps={{
            onOk: (val: any) => {},
          }}
        />
        <RangeDatePicker
          fieldProps="rangeTime3"
          fieldProps2="rangeTime4"
          title="时间(date)"
          positionType="vertical"
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default page;
