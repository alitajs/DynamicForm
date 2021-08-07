/**
 * title: 基础 复杂输入框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
} from '@alitajs/dform';
import PositionIcon from '../../../assets/position_ico.png';

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

  const extraImg = () => <img src={PositionIcon} />;

  const unitList = [
    {
      label: '元',
      value: '元',
    },
    {
      label: '万元',
      value: '万元',
    },
    {
      label: '亿元',
      value: '亿元',
    },
  ];

  const formsData = [
    {
      type: 'extraInput',
      fieldProps: 'minPrise',
      fieldProps2: 'maxPrise',
      title: '价格区间(数字输入)',
      firstProps: { placeholder: '输入最小价格' },
      secondProps: { extra: '¥', placeholder: '输入最大价格' },
      required: true,
    },
    {
      type: 'extraInput',
      fieldProps: 'minPosition',
      fieldProps2: 'maxPosition',
      title: '位置区间',
      firstProps: { placeholder: '选择最小位置' },
      secondProps: { placeholder: '选择最大位置', extra: extraImg() },
      positionType: 'horizontal',
      disabled: true,
    },
    {
      type: 'extraInput',
      fieldProps: 'minLength',
      fieldProps2: 'maxLength',
      title: '长度区间',
      firstProps: { placeholder: '输入长度' },
      secondProps: { placeholder: '输入长度' },
    },
    {
      type: 'extraInput',
      fieldProps: 'price',
      fieldProps2: 'unit',
      title: '单价',
      placeholder2: '',
      extraType: 'select',
      positionType: 'horizontal',
      secondProps: { data: unitList, placeholder: '选择区间' },
      firstProps: { placeholder: '输入价格' },
    },
    {
      type: 'extraInput',
      title: '价格',
      fieldProps: 'prices',
      fieldProps2: 'priceUnit',
      positionType: 'vertical',
      extraType: 'select',
      firstProps: {
        placeholder: '输入长度',
        onChange: (val: any) => {
          // eslint-disable-next-line no-console
          console.log(val);
        },
      },
      secondProps: {
        placeholder: '选择长度单位',
        data: unitList,
        onChange: (val: any) => {
          // eslint-disable-next-line no-console
          console.log(val);
        },
      },
    },
  ] as IFormItemProps[];
  const formsValues = {
    minPrise: '11',
    maxPrise: '22',
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    isDev: false,
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
