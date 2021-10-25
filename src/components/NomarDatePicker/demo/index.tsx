/**
 * title: 基础 时间选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  dateChange,
  DformDatePicker,
} from '@alitajs/dform';

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
    Date: '2020-02-02',
    Month: dateChange('2020-02'),
    DateTime: new Date(),
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
        <DformDatePicker
          fieldProps="Date"
          modeType="date"
          title="Date"
          maxDate={new Date()}
          defaultValue={new Date()}
        />
        <DformDatePicker
          fieldProps="Month"
          modeType="month"
          title="Month"
          required={true}
        />

        <DformDatePicker
          fieldProps="DateTime"
          modeType="datetime"
          title="DateTimeVertical"
          required={true}
          positionType="vertical"
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
