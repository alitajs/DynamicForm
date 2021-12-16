import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm, {
  IFormItemProps,
  Store,
  ValidateErrorEntity,
  useForm,
} from '@alitajs/dform';

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
      type: 'image',
      fieldProps: 'insertImg',
      title: '图片',
      required: true,
      compressRatio: 0.5,
      onChange: (files: any, type: string, index: number | undefined) => {
        // eslint-disable-next-line no-console
        console.log(files, type, index);
      },
      defaultValue: [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '2122',
        },
      ],
    },
    {
      type: 'checkbox',
      title: '喜欢的水果',
      required: true,
      data: [
        { foodId: 'apple', foodName: '苹果' },
        { foodId: 'banana', foodName: '香蕉' },
        { foodId: 'orange', foodName: '橙子' },
        { foodId: 'watermelon', foodName: '西瓜' },
        { foodId: 'hami', foodName: '哈密瓜' },
        { foodId: 'pineapple', foodName: '菠萝' },
        { foodId: 'pear', foodName: '香梨' },
      ],
      fieldProps: 'fruit',
      chunk: 3,
      alias: {
        label: 'foodName',
        value: 'foodId',
      },
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
    isDev: false,
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
