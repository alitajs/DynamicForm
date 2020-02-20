import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import DynamicForm, { IFormItemProps } from '../DynamicForm';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

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

  const radioList = [
    {
      label: '是',
      value: 'yes',
    },
    {
      label: '否',
      value: 'no',
    },
  ];
  const formsData1 = [
    {
      type: 'radio',
      fieldProps: 'userRadio11',
      required: true,
      data: radioList,
      title: '发票',
    },

    {
      type: 'input',
      fieldProps: 'username1',
      required: true,
      placeholder: '请输入',
      title: '用户名',
      inputType: 'text',
    },
    {
      type: 'select',
      fieldProps: 'userdata1',
      required: true,
      placeholder: '请选择',
      title: '用户数据',
      data: seasons,
    },
  ] as IFormItemProps[];
  const formsData = [
    {
      type: 'radio',
      fieldProps: 'userRadio1',
      required: true,
      data: radioList,
      title: '发票',
    },

    {
      type: 'input',
      fieldProps: 'username',
      required: true,
      placeholder: '请输入',
      title: '用户名',
      inputType: 'text',
    },
    {
      type: 'select',
      fieldProps: 'userdata',
      required: true,
      placeholder: '请选择',
      title: '用户数据',
      data: seasons,
    },
    {
      type: 'switch',
      fieldProps: 'userswitch',
      required: true,
      placeholder: '请选择',
      title: '用户选择',
    },
    {
      type: 'text',
      fieldProps: 'useronlyread',
      placeholder: '请选择',
      title: '只读信息',
    },
    {
      type: 'area',
      fieldProps: 'usertextarea',
      required: true,
      placeholder: '多行输入',
    },
    {
      type: 'date',
      fieldProps: 'userDataPicker',
      required: true,
      placeholder: '请选择',
      title: '用户时间选择',
      modeType: 'datetime',
    },
    {
      type: 'rangeDatePicker',
      fieldProps: 'datePicker1',
      fieldProps2: 'datePicker2',
      required: true,
      title: '时间区间',
      modeType: 'datetime',
    },
  ] as IFormItemProps[];
  const formsValues = {
    username: 0,
    userdata: ['2013', '春'],
  };
  const formProps = {
    onFinish,
    data: [
      { title: 'First Card Title', data: formsData1 },
      { title: 'Second Card Title', data: formsData },
    ],
    onFinishFailed,
    formsValues,
    form,
    isDev: false,
    // allDisabled: true,
  };
  return (
    <>
      <WhiteSpace size="xl" />
      <DynamicForm {...formProps}>
        <WhiteSpace size="xl" />
        <Field {...tailLayout}>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Field>
      </DynamicForm>
    </>
  );
};

export default Page;
