/**
 * title: 基础 多选框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformCustom,
} from '@alitajs/dform';

interface IDemoPage {
  name: string;
  onChange?: (currentActiveLink: string) => void;
  value?: string;
}

const DemoPage: FC<IDemoPage> = (props) => {
  const { name, onChange, value } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <div style={{ textAlign: 'left', fontSize: '0.3rem' }}>
      <p>name: {name}</p>
      <p>
        age:
        <input
          style={{ fontSize: '0.28rem' }}
          value={value}
          type="text"
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        />
      </p>
    </div>
  );
};

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
    age: '17',
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    isDev: true,
    // isPc: true,
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <DformCustom
          title="自定义组件(非受控)"
          fieldProps="custom"
          positionType="horizontal"
          labelNumber={7}
        >
          <div
            style={{ width: '100%', textAlign: 'right', fontSize: '0.3rem' }}
          >
            This is a display page
          </div>
        </DformCustom>
        <DformCustom
          title="自定义组件(受控)"
          required={true}
          fieldProps="age"
          defaultValue="17"
          CustomDom={DemoPage}
          onChange={(e: any) => console.log(e)}
        >
          <DemoPage name="age" />
        </DformCustom>
      </DynamicForm>
      <WhiteSpace size="sm" />
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
