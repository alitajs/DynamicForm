/**
 * title: 基础 开关控件
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformSwitch,
} from '@alitajs/dform';
import { WhiteSpace } from '../../../baseComponents';

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [form] = useForm();
  const [val, setVal] = useState(true);
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log(errorInfo);
  };

  const formsValues = {};
  const formsProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    // isPc: true,
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
          coverStyle={{
            justifyContent: 'flex-start',
          }}
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
      <DformSwitch
        fieldProps="on"
        placeholder="选择"
        title="On"
        defaultValue={val}
        onChange={(v) => setVal(v)}
      />
    </React.Fragment>
  );
};

export default Page;
