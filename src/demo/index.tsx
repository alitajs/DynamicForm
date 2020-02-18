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
      type: 'extraInput',
      fieldProps: 'minPrice',
      fieldProps2: 'maxPrice',
      placeholder: '请输入1',
      placeholder2: '请输入',
      title: '价格区间',
      required: true,
    },
    {
      type: 'radio',
      fieldProps: 'userRadio',
      required: true,
      title: '发票',
      data: radioList,
    },
    {
      type: 'rangeDatePicker',
      fieldProps: 'datePicker3',
      fieldProps2: 'datePicker4',
      required: true,
      title: '时间区间',
      modeType: 'month',
    },
    {
      type: 'input',
      fieldProps: 'custPhone',
      placeholder: '标题超过16字符自动开启，如需关闭，请设置 autoLineFeed',
      title: '超长标题(自动开启双行模式)',
      inputType: 'text',
      positionType: 'vertical',
      editable: false,
    },
    {
      type: 'select',
      fieldProps: 'timeAndWeather',
      placeholder: '请选择',
      title: '选择当前时间和天气',
      data: seasons,
    },
    {
      type: 'area',
      fieldProps: 'busInfo',
      placeholder: '多行输入',
      title: '集团基本信息',
      positionType: 'vertical',
    },
    {
      type: 'date',
      fieldProps: 'beginDate',
      placeholder: '请选择',
      title: '选择出发时间',
      modeType: 'datetime',
      positionType: 'vertical',
    },
    {
      type: 'extraInput',
      fieldProps: 'minLength',
      fieldProps2: 'maxLength',
      placeholder: '请输入',
      placeholder2: '请输入',
      title: '长度区间',
      positionType: 'vertical',
    },
    {
      type: 'radio',
      fieldProps: 'userRadio2',
      title: '发票',
      data: radioList,
      positionType: 'vertical',
    },
    {
      type: 'rangeDatePicker',
      fieldProps: 'datePicker5',
      fieldProps2: 'datePicker6',
      title: '时间区间',
      modeType: 'month',
      positionType: 'vertical',
    },
  ] as IFormItemProps[];
  const formsValues = {
    useronlyread: '原始文档，没有变更',
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    isDev: false,
    // allDisabled: true,
  };
  return (
    <DynamicForm {...formProps}>
      <WhiteSpace size="sm" />
      <Field {...tailLayout}>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </Field>
    </DynamicForm>
  );
};

export default Page;
