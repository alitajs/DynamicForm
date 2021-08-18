import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm from '../../../DynamicForm';
import { useForm } from 'rc-field-form';
import DformCustom from '../../';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
}
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

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed }) => {
  const [form] = useForm();
  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    isDev: true,
  };

  return (
    <>
      <DynamicForm {...formProps} >
        <DformCustom
          title='自定义组件(非受控)'
          fieldProps='custom'
          CustomDom={showDemoPage}
        />
        <DformCustom
          title='自定义组件(受控)'
          required
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
  )
}

export default Page