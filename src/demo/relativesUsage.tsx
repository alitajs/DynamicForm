import React, { FC, useState, useEffect } from 'react';
import { WhiteSpace, Button } from 'antd-mobile-v2';
import DynamicForm, {
  DformInput,
  DformPicker,
  DformRadio,
  DformDatePicker,
  useForm,
  Store,
  ValidateErrorEntity,
  MultiplePicker,
  IFormRelativesProps,
  IFormItemProps,
  IDynamicFormProps,
} from '@alitajs/dform';

const { Group } = DynamicForm;

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

const foodData = [
  { label: '香蕉', value: '香蕉' },
  { label: '西瓜', value: '西瓜' },
  { label: '苹果', value: '苹果' },
  { label: '草莓', value: '草莓' },
];

const relatives = {
  sex: [
    {
      type: 'changeFormValue',
      targetValue: ['woman'],
      targetSet: [
        {
          targetField: 'username',
          targetValue: '莉丝',
        },
      ],
    },
    {
      type: 'required',
      targetValue: ['woman'],
      targetSet: [
        {
          targetField: 'date',
        },
      ],
    },
    {
      type: 'hidden',
      targetValue: ['woman'],
      targetSet: [
        {
          targetField: 'weather',
        },
      ],
    },
    {
      type: 'disabled',
      targetValue: ['woman'],
      targetSet: [
        {
          targetField: 'motion',
        },
      ],
    },
    {
      type: 'changeFormValue',
      targetValue: ['woman'],
      targetSet: [
        {
          targetField: 'motion',
          targetValue: '篮球',
        },
      ],
    },
    {
      type: 'changeFormValue',
      targetValue: ['woman'],
      targetSet: [
        {
          targetField: 'food',
          targetValue: '草莓',
        },
      ],
    },
    {
      type: 'custom',
      targetValue: ['woman'],
      targetSet: [
        {
          targetField: 'food',
          targetContent: {
            required: true,
            disabled: true,
          },
        },
      ],
    },
  ],
} as IFormRelativesProps;

// const ageData = Array.from

const UserName: FC = () => {
  const [form] = useForm();
  const [isJson, setisJson] = useState(false);
  const [formsValues, setFormsValues] = useState<any>({
    sex: 'man',
    motion: ['羽毛球', '乒乓球'],
    isJson: isJson ? '1' : '0',
  });

  useEffect(() => {
    setFormsValues({
      isJson: isJson ? '1' : '0',
    });
  }, [isJson]);

  const onFinish = (values: Store) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const dFormData = [
    {
      type: 'input',
      fieldProps: 'username',
      required: true,
      placeholder: '请输入',
      title: 'J用户名',
      defaultValue: '小红',
    },
    {
      type: 'radio',
      fieldProps: 'sex',
      title: 'J性别',
      data: sexData,
    },
    {
      type: 'date',
      fieldProps: 'date',
      placeholder: '请选择',
      title: 'J出生年月',
    },
    {
      type: 'picker',
      fieldProps: 'weather',
      placeholder: '请选择',
      title: 'J天气',
      data: weatherData,
      required: true,
    },
    {
      type: 'multiplePicker',
      fieldProps: 'motion',
      placeholder: '请选择',
      title: 'J特长',
      data: motionData,
    },
    {
      type: 'multiplePicker',
      fieldProps: 'food',
      placeholder: '请选择',
      title: 'J美食',
      data: foodData,
    },
  ] as IFormItemProps[];

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    relatives,
  } as IDynamicFormProps;
  if (isJson) {
    formProps.data = dFormData;
  }

  return (
    <div>
      <DynamicForm {...formProps}>
        {!isJson && (
          <DformInput
            fieldProps="username"
            required
            placeholder="请输入"
            title="用户名"
            defaultValue="小红"
          />
        )}
        {!isJson && <DformRadio fieldProps="sex" title="性别" data={sexData} />}
        {!isJson && (
          <DformDatePicker
            fieldProps="date"
            placeholder="请选择"
            title="出生年月"
          />
        )}
        {!isJson && (
          <DformPicker
            fieldProps="weather"
            placeholder="请选择"
            title="天气"
            data={weatherData}
            required
          />
        )}
        {!isJson && (
          <MultiplePicker
            fieldProps="motion"
            placeholder="请选择"
            title="特长"
            data={motionData}
          />
        )}
        {!isJson && (
          <MultiplePicker
            fieldProps="food"
            placeholder="请选择"
            title="美食"
            data={foodData}
          />
        )}
        <DformRadio
          fieldProps="isJson"
          required
          placeholder="请输入"
          title="是否使用JSON格式渲染页面"
          data={[
            { label: '是', value: '1' },
            { label: '否', value: '0' },
          ]}
          positionType="vertical"
          onChange={(e) => {
            setisJson(e == 1);
          }}
        />
      </DynamicForm>
      <WhiteSpace />
      <Button type="primary" onClick={() => form.submit()}>
        submit
      </Button>
    </div>
  );
};

export default UserName;
