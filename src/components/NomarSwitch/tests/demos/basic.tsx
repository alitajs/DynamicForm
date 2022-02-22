import React, { FC } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, { DformSwitch, useForm } from '../../../../';
import { WhiteSpace } from '../../../../baseComponents';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  isPc?: boolean;
}

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed, isPc = false }) => {
  const [form] = useForm();
  const formsValues = {};
  const formsProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    isDev: true,
    isPc,
  };

  return (
    <React.Fragment>
      <DynamicForm {...formsProps}>
        <DformSwitch fieldProps="off" placeholder="选择" title="Off" required />
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
