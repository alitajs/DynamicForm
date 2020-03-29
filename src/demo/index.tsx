import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

import DynamicForm, { IFormItemProps } from '../DynamicForm';

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

const sexList = [
  {
    label: '男',
    value: 'man',
  },
  {
    label: '女',
    value: 'woman',
  },
];

const foodList = [
  {
    label: '宫保鸡丁',
    value: '宫保鸡丁',
  },
  {
    label: '可乐鸡翅',
    value: '可乐鸡翅',
  },
  {
    label: '爆炒虾仁',
    value: '爆炒虾仁',
  },
  {
    label: '清蒸小黄鱼',
    value: '清蒸小黄鱼',
  },
  {
    label: '红烧肉',
    value: '红烧肉',
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
      type: 'multiplePicker',
      fieldProps: 'userFood',
      data: foodList,
      title: '选择喜欢的食物(多选)',
      placeholder: '请选择',
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
      placeholder: '多行输入',
      title: '备注',
      positionType: 'horizontal',
      coverStyle: {
        border: '1px solid #108ee9',
        background: '#fff',
      },
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
      type: 'coverRadio',
      title: '性别',
      data: sexList,
      fieldProps: 'userSex',
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
      type: 'coverRadio',
      title: '性别',
      data: sexList,
      positionType: 'vertical',
      fieldProps: 'userSex2',
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
    userSex: 'man',
    userSex2: 'woman',
    userFood: ['爆炒虾仁', '红烧肉'],
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    isDev: true,
    // allDisabled: true,
  };
  return (
    <>
      <DynamicForm {...formProps} />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
