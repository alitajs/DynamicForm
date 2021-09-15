/**
 * title: 基础 时间区间选择框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  dateChange,
  RangeDatePicker,
} from '@alitajs/dform';

const page: FC = () => {
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
    rangeTime1: dateChange(new Date('2021-07-08')),
    rangeTime2: dateChange(new Date('2021-08-08')),
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
          required
          fieldProps="rangeTime1"
          fieldProps2="rangeTime2"
          title="时间(datetime)"
          modeType="datetime"
          firstProps={{
            onOk: (val: any) => {
              // eslint-disable-next-line no-console
              console.log(val);
            },
          }}
        />
        <RangeDatePicker
          fieldProps="rangeTime3"
          fieldProps2="rangeTime4"
          title="时间(month)"
          modeType="month"
          positionType="horizontal"
          labelNumber={7}
        />
        <RangeDatePicker
          required
          fieldProps="rangeTime5"
          fieldProps2="rangeTime6"
          title="时间(date)"
          positionType="vertical"
          firstProps={{
            defaultValue: dateChange(new Date('2021-07-08')),
          }}
          secondProps={{
            defaultValue: dateChange(new Date('2021-08-08')),
          }}
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
