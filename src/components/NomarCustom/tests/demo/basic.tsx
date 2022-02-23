import React, { FC } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  IFormItemProps,
  useForm,
  DformCustom,
  WhiteSpace,
} from '../../../..';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onChange: any;
  isPc?: boolean;
}

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
    <div style={{ textAlign: 'left' }}>
      <p>name: {name}</p>
      <p>
        age:
        <input
          data-testid="names"
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

const Basic: FC<BasicProps> = ({
  onFinish,
  onFinishFailed,
  isPc,
  onChange,
}) => {
  const [form] = useForm();
  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues: {},
    form,
    isPc,
  };
  return (
    <div>
      <DynamicForm {...formProps}>
        <DformCustom
          title="自定义组件(非受控)"
          fieldProps="custom"
          positionType="horizontal"
          labelNumber={7}
        >
          <div style={{ width: '100%', textAlign: 'right' }}>
            This is a display page
          </div>
        </DformCustom>
        <DformCustom
          title="自定义组件(受控)"
          required={true}
          fieldProps="age"
          onChange={onChange}
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
    </div>
  );
};

export default Basic;
