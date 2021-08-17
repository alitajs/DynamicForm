/**
 * title: 基础 多选框
 * desc: 表单使用 demo
 */
import React, { FC, useState, useEffect } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
} from '@alitajs/dform';
import NomarCustom from '../'

interface IDemoPage {
  name: string;
  age: number;
  onChange?: (currentActiveLink: string) => void;
  value?: string;
}

const showDemoPage = () => (
  <div style={{ textAlign: 'left' }}>This is a display page</div>
);

const demoPage: FC<IDemoPage> = (props) => {
  const { name, onChange, value } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <div style={{ textAlign: 'left' }}>
      <p>name: {name}</p>
      <p>
        age:
        <input
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
    // data: formsData,
    formsValues,
    isDev: true,
  };
  return (
    <>
      <DynamicForm {...formProps} >
        <NomarCustom
          title='自定义组件(非受控)'
          fieldProps='custom'
          CustomDom={showDemoPage}
        />
        <NomarCustom
          title='自定义组件(受控)'
          required={true}
          fieldProps='age'
          CustomDom={demoPage}
          customDomProps={{
            name: 'owen',
          }}
          defaultValue="17"
        />
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
