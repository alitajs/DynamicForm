import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm from '../../../../';
import { useForm } from 'rc-field-form';
import DformSwitch from '../../';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
}

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed }) => {
  const [form] = useForm();
  const formsValues = {};
  const formsProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    isDev: true,
  };

  return (
    <React.Fragment>
      <DynamicForm {...formsProps}>
        <DformSwitch
          fieldProps=""
          fieldName="off"
          placeholder="选择"
          title="Off"
          required
        />
        <DformSwitch
          fieldProps="on"
          placeholder="选择"
          title="On"
          defaultValue
        />
        <DformSwitch
          fieldProps="disabledOn"
          placeholder="选择"
          title="Disabled On"
          required
          disabled
          defaultValue
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </React.Fragment>
  );
};

export default Page;
