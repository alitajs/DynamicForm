import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm, { IFormItemProps } from '../../../../';
import { useForm } from 'rc-field-form';
import DformRadio from '../../';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
}
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
const dayList = [
  {
    label: '晴',
    value: '晴',
  },
  {
    label: '阴',
    value: '阴',
  },
  {
    label: '雨',
    value: '雨',
  },
];
const foodList = [
  {
    foodName: '宫保鸡丁',
    foodId: '宫保鸡丁',
  },
  {
    foodName: '可乐鸡翅',
    foodId: '可乐鸡翅',
  },
  {
    foodName: '爆炒虾仁',
    foodId: '爆炒虾仁',
  },
  {
    foodName: '清蒸小黄鱼',
    foodId: '清蒸小黄鱼',
  },
  {
    foodName: '红烧肉',
    foodId: '红烧肉',
  },
];

const DfromRadioTestPage: FC<BasicProps> = ({ onFinish, onFinishFailed }) => {
  const [form] = useForm();
  const formsValues = {
    userRadio3: '雨',
    userRadio4: '红烧肉',
  };
  const formsData = [
    {
      type: 'radio',
      fieldProps: '',
      fieldName: 'userRadio1',
      required: true,
      data: radioList,
      title: '发票',
      onChange: (e: string | number) => {},
    },
    {
      type: 'radio',
      fieldProps: '',
      fieldName: 'userRadio2',
      required: true,
      data: radioList,
      title: '内容靠左',
      labelNumber: 5,
      coverStyle: {
        justifyContent: 'flex-start',
      },
    },
    {
      type: 'radio',
      fieldProps: 'userRadio3',
      required: true,
      disabled: true,
      data: dayList,
      positionType: 'vertical',
      title: '天气情况',
    },
    {
      type: 'radio',
      fieldProps: 'userRadio4',
      required: true,
      allowUnChecked: false,
      data: foodList,
      title: '喜欢的食物',
      radioType: 'vertical',
      alias: {
        label: 'foodId',
        value: 'foodName',
      },
    },
  ] as IFormItemProps[];
  const formProps = {
    formsValues,
    form,
    onFinishFailed,
    onFinish,
    isDev: false,
  };

  return (
    <>
      <DynamicForm {...formProps} failScroll={false}>
        <DformRadio
          // type='radio'
          fieldProps="userRadio1"
          required={true}
          data={radioList}
          title="发票"
          allowUnChecked
        />
        <DformRadio
          // type='radio'
          fieldProps="userRadio2"
          required={true}
          data={radioList}
          title="内容靠左"
          labelNumber={5}
          coverStyle={{
            justifyContent: 'flex-start',
          }}
        />
        <DformRadio
          // type='radio'
          fieldProps="userRadio3"
          required={true}
          disabled={true}
          data={dayList}
          positionType="vertical"
          title="天气情况"
        />
        <DformRadio
          // type='radio'
          fieldProps="userRadio4"
          required={true}
          allowUnChecked={false}
          data={foodList}
          title="喜欢的食物"
          radioType="vertical"
          alias={{
            label: 'foodId',
            value: 'foodName',
          }}
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};
export default DfromRadioTestPage;
