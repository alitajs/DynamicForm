import React, { FC } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, { IFormItemProps, useForm, WhiteSpace } from '../../../..';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onChange: any;
}

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed, onChange }) => {
  const [form] = useForm();

  const aliasCityList = [
    {
      cityId: '深圳',
      cityName: 'shenzhen',
    },
    {
      cityId: '杭州',
      cityName: 'hangzhou',
    },
    {
      cityId: '广州',
      cityName: 'guangzhou',
    },
  ];

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

  const formsData = [
    {
      type: 'picker',
      fieldProps: 'myCity',
      required: true,
      data: aliasCityList,
      title: '我喜欢的城市',
      labelNumber: 7,
      placeholder: '请选择我喜欢的城市placeholder',
      alias: {
        label: 'cityId',
        value: 'cityName',
      },
      onChange: (e) => onChange(e),
    },
    {
      type: 'picker',
      fieldProps: 'youCity',
      data: cityList,
      title: '选择你喜欢的城市',
      positionType: 'vertical',
    },
    {
      type: 'picker',
      fieldProps: 'disabledClick',
      data: cityList,
      title: 'disabled点击',
      placeholder: '不可点击',
      disabled: true,
    },
    {
      type: 'picker',
      fieldProps: 'noData',
      data: [],
      title: '数据源为空',
      placeholder: '数据源为空',
    },
  ] as IFormItemProps[];
  const formsValues = {
    youCity: 'fuzhou',
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    failScroll: false,
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
