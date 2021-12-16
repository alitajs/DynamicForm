/**
 * title: 基础 时间选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
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
    DateTime: dateChange('2020-02-02 22:22'),
    rangeTime1: dateChange(new Date('2021-07-08')),
    rangeTime2: dateChange(new Date('2021-08-08')),
    Date: '2020-02-02',
    Month: dateChange('2020-02'),
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

        <DformDatePicker
          required
          fieldProps="rangeTime1"
          fieldProps2="rangeTime2"
          title="时间(datetime)"
          modeType="datetime"
          onOk={(val: any) => {
            // eslint-disable-next-line no-console
            console.log(val);
          }}
        />
        <DformDatePicker
          fieldProps="rangeTime3"
          fieldProps2="rangeTime4"
          title="时间(month)"
          modeType="month"
          positionType="horizontal"
          labelNumber={7}
        />
        <DformDatePicker
          required
          fieldProps="rangeTime5"
          fieldProps2="rangeTime6"
          title="时间(date)"
          positionType="vertical"
          defaultValue={dateChange(new Date('2021-07-08'))}
          secondProps={{
            defaultValue: dateChange(new Date('2021-08-08')),
          }}
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
