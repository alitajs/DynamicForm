/**
 * title: 基础 选址
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace, Toast } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
// 所有需要从 rc-field-form 中导出的字段都可以在 dform 中导出
import DynamicForm, { IFormItemProps } from '../../../DynamicForm';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

interface IAddrDataProps {
  label: string;
  value: string | number;
}

const data1 = [
  { label: '福建省', value: '1' },
  { label: '广东省', value: '2' },
  { label: '江西省', value: '3' },
  { label: '广西省', value: '4' },
  { label: '江苏省', value: '5' },
  { label: '浙江省', value: '6' },
  { label: '内蒙省', value: '7' },
  { label: '新疆省', value: '8' },
];

const data2 = [
  { label: '福州市', value: '11' },
  { label: '漳州市', value: '12' },
  { label: '泉州市', value: '13' },
  { label: '厦门市', value: '14' },
  { label: '三明市', value: '15' },
  { label: '莆田市', value: '16' },
  { label: '南平市', value: '17' },
];

const data3 = [
  { label: '鼓楼区', value: '111' },
  { label: '芗城区', value: '112' },
  { label: '闽侯县', value: '113' },
  { label: '台江区', value: '114' },
  { label: '龙文区', value: '115' },
  { label: '晋安区', value: '116' },
  { label: '苍山区', value: '117' },
];

const data4 = [
  { label: '美丽的街道', value: '1111' },
  { label: '好看的街道', value: '1112' },
  { label: '阳光大道', value: '1113' },
  { label: '头头是道', value: '1114' },
  { label: '热闹的街道', value: '1115' },
  { label: '玲琅满目', value: '1116' },
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

  const [homeAddrData, setHomeAddrData] = useState<IAddrDataProps[] | []>(data1);
  const [workAddrData, setWorkAddrData] = useState<IAddrDataProps[] | []>(data1);

  const resetList3 = (nowLevel: number) => {
    let data: { label: string; value: string }[] = [];
    switch (nowLevel) {
      case 0:
        data = data1;
        break;
      case 1:
        data = data2;
        break;
      case 2:
        data = data3;
        break;
      case 3:
        data = data3;
        break;
      default:
        break;
    }
    setHomeAddrData(data);
    Toast.hide();
  };
  const resetList4 = (nowLevel: number) => {
    let data: { label: string; value: string }[] = [];
    switch (nowLevel) {
      case 0:
        data = data1;
        break;
      case 1:
        data = data2;
        break;
      case 2:
        data = data3;
        break;
      case 3:
        data = data4;
        break;
      case 4:
        data = data4;
        break;
      default:
        break;
    }
    setWorkAddrData(data);
    Toast.hide();
  };

  const formsData = [
    {
      type: 'addressPicker',
      fieldProps: 'homeAddr',
      required: true,
      title: '居住地址',
      placeholder: '选择当前居住城市',
      level: 3,
      data: homeAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区'],
      onChangeLevel: (nowLevel: number, value: number | string) => {
        // eslint-disable-next-line no-console
        console.log(nowLevel, value);
        Toast.loading('加载中', 1);
        setTimeout(() => {
          resetList3(nowLevel);
        }, 500);
      },
    },
    {
      type: 'addressPicker',
      fieldProps: 'workAddr',
      title: '工作地址',
      // disabled: true,
      placeholder: '请选择',
      positionType: 'vertical',
      level: 4,
      data: workAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区', '请选择街道'],
      onChangeLevel: (nowLevel: number, value: number | string) => {
        // eslint-disable-next-line no-console
        console.log(nowLevel, value);
        resetList4(nowLevel);
      },
    },
  ] as IFormItemProps[];

  const formsValues = {
    homeAddr: {
      value: ['1', '12', '114'],
      label: ['福建省', '漳州市', '台江区'],
    },
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    autoLineFeed: false,
    isDev: true,
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
