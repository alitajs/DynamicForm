/**
 * title: 基础 多选框
 * desc: 表单使用 demo
 */
import React, { FC, useState, useEffect } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
// 所有需要从 rc-field-form 中导出的字段都可以在 dform 中导出
import DynamicForm, { IFormItemProps } from '../../../DynamicForm';

interface IDemoPage {
  name: string;
  age: number;
  onChange?: (currentActiveLink: string) => void;
  initValue?: string;
}

const showDemoPage = () => <div style={{ textAlign: 'left' }}>This is a display page</div>;

const demoPage: FC<IDemoPage> = props => {
  const { name, onChange, initValue } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setValue(initValue || '');
  }, [initValue]);
  return (
    <div style={{ textAlign: 'left' }}>
      <p>name: {name}</p>
      <p>
        age:
        <input
          value={value}
          type="text"
          onChange={e => {
            setValue(e.target.value);
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
  const formsData = [
    {
      type: 'custom',
      title: '自定义组件(非受控)',
      fieldProps: 'custom',
      CustomDom: showDemoPage,
    },
    {
      type: 'custom',
      title: '自定义组件(受控)',
      required: true,
      fieldProps: 'age',
      CustomDom: demoPage,
      customDomProps: {
        name: 'owen',
      },
    },
  ] as IFormItemProps[];

  const formsValues = {
    age: '17',
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    isDev: true,
  };
  return (
    <>
      <DynamicForm {...formProps} />
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
