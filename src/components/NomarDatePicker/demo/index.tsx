/**
 * title: 基础 时间选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
  dateChange,
} from '@alitajs/dform';
import DformDate from '../';

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
          disabled
          maxDate={new Date()}
          minDate={new Date()}
          defaultValue={new Date()}
        />
        <DformDate
          fieldProps="Month"
          modeType="month"
          title="Month"
          required={true}
        />

        <DformDate
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
