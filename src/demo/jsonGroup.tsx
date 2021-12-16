import React, { FC, useState, useEffect } from 'react';
import { WhiteSpace, Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  IFormItemProps,
} from '@alitajs/dform';

const sexData = [
  { label: '男', value: 'man' },
  { label: '女', value: 'woman' },
];
const weatherData = [
  { label: '晴', value: '晴' },
  { label: '阴', value: '阴' },
  { label: '雨', value: '雨' },
];

const motionData = [
  { label: '篮球', value: '篮球' },
  { label: '羽毛球', value: '羽毛球' },
  { label: '乒乓球', value: '乒乓球' },
];

const fruitData = [
  { label: '哈密瓜', value: '哈密瓜' },
  { label: '菠萝', value: '菠萝' },
  { label: '香梨', value: '香梨' },
];

const data = [
  {
    type: 'group',
    fieldProps: 'group1',
    groupProps: {
      type: 'card',
      title: '卡片一',
      required: true,
    },
    children: [
      {
        type: 'input',
        fieldProps: 'username',
        required: true,
        placeholder: '请输入',
        title: '用户名',
        defaultValue: '小红',
      },
      {
        type: 'group',
        fieldProps: 'group2',
        groupProps: {
          type: 'card',
          title: '卡片二',
          required: true,
        },
        children: [
          {
            type: 'radio',
            fieldProps: 'sex',
            title: '性别',
            data: sexData,
            required: true,
          },
        ],
      },
    ],
  },
  {
    type: 'group',
    fieldProps: 'group3',
    groupProps: {
      type: 'card',
      title: '卡片三',
      required: true,
      leftView: (
        <div
          style={{
            background: '#1890ff',
            margin: '0.1rem 0.1rem 0 0',
            width: '0.1rem',
            height: '0.3rem',
            borderRadius: '0.4rem',
          }}
        />
      ),
    },
    children: [
      {
        type: 'picker',
        fieldProps: 'weather',
        placeholder: '请选择',
        title: '天气',
        data: weatherData,
      },
      {
        type: 'rangeDatePicker',
        fieldProps: 'rangeTime1',
        fieldProps2: 'rangeTime2',
        title: '时间(month)',
        modeType: 'month',
        firstProps: {
          onOk: (val: any) => {
            // eslint-disable-next-line no-console
            console.log(val);
          },
        },
      },
    ],
  },
  {
    type: 'date',
    fieldProps: 'date',
    placeholder: '请选择',
    title: '出生年月',
  },
  {
    type: 'checkbox',
    fieldProps: 'fruit',
    title: '喜欢的水果',
    data: fruitData,
    required: true,
    disableItem: (x: any) => ['香梨'].some((a) => x.value === a),
  },
  {
    type: 'multiplePicker',
    fieldProps: 'motion',
    placeholder: '请选择',
    title: '特长',
    data: motionData,
  },
] as IFormItemProps[];

const UserName: FC = () => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = useState<any>({});

  useEffect(() => {
    setFormsValues({
      sex: 'man',
      motion: ['羽毛球', '乒乓球'],
    });
  }, []);

  const onFinish = (values: Store) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const formProps = {
    form,
    data,
    onFinish,
    onFinishFailed,
    formsValues,
  };

  return (
    <div>
      <DynamicForm {...formProps} />
      <WhiteSpace />
      <Button type="primary" onClick={() => form.submit()}>
        submit
      </Button>
    </div>
  );
};

export default UserName;
