import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformInput,
  DformPicker,
  DformRadio,
  DformSelect,
  DformTextArea,
  MultiplePicker,
} from '@alitajs/dform';

const cityList = [
  {
    label: '北京',
    value: 'beijing',
  },
  {
    label: '上海',
    value: 'shanghai',
  },
  {
    label: '福州',
    value: 'fuzhou',
  },
];

const Page: FC = () => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = useState<Record<string, any>>({
    inputs: '1',
    radios: 'fuzhou',
    selects: ['fuzhou'],
    areas: '1',
  });

  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    isDev: false,
  };

  return (
    <div>
      <DynamicForm {...formProps}>
        <DformInput fieldProps="inputs" title="输入框" placeholder="请输入" />
        <DformPicker
          fieldProps="pickers"
          data={cityList}
          title="选择框"
          defaultValue="shanghai"
          clear
        />
        <DformRadio
          fieldProps="radios"
          required
          data={cityList}
          title="单选框"
        />
        <DformSelect
          type="select"
          fieldProps="selects"
          required
          title="select选择框"
          placeholder="请选择"
          data={[cityList]}
        />
        <DformTextArea
          title="多行文本框"
          fieldProps="areas"
          placeholder="支持输入值过长自动换行"
        />
        <MultiplePicker
          fieldProps="multiplePickers"
          required
          data={cityList}
          title="多选框"
          labelNumber={7}
          placeholder="请选择食物"
          defaultValue={['fuzhou']}
          clear
        />
      </DynamicForm>
      <Button
        onClick={() => {
          // setFormsValues({});
          form.resetFields();
        }}
      >
        重置
      </Button>
      <Button
        onClick={() => {
          form.submit();
        }}
      >
        提交
      </Button>
    </div>
  );
};

export default Page;
