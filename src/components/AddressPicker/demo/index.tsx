/**
 * title: 基础 选址
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace, Toast } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
  countryList,
} from '@alitajs/dform';

interface IAddrDataProps {
  label: string;
  value: string | number;
}

const streetData = [
  { label: '街道1', value: '1111' },
  { label: '街道2', value: '1112' },
  { label: '街道3', value: '1113' },
  { label: '街道4', value: '1114' },
  { label: '街道5', value: '1115' },
  { label: '街道6', value: '1116' },
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

  const [homeAddrData, setHomeAddrData] = useState<IAddrDataProps[] | []>([]);
  const [workAddrData, setWorkAddrData] = useState<IAddrDataProps[] | []>([]);

  const resetHomeAddrList = (values: (number | string)[]) => {
    let data: { label: string; value: string }[] = [];
    switch (values.length) {
      case 0:
        data = Object.keys(countryList).map(val => ({
          label: countryList[val].name,
          value: val,
        }));
        break;
      case 1:
        data = Object.keys(countryList[values[0]].child).map(val => ({
          label: countryList[values[0]].child[val].name,
          value: val,
        }));
        break;
      case 2:
        // eslint-disable-next-line no-case-declarations
        const cityData1 = countryList[values[0]].child;
        data = Object.keys(cityData1[values[1]].child).map(val => ({
          label: cityData1[values[1]].child[val],
          value: val,
        }));
        break;
      case 3:
        // eslint-disable-next-line no-case-declarations
        const cityData2 = countryList[values[0]].child;
        data = Object.keys(cityData2[values[1]].child).map(val => ({
          label: cityData2[values[1]].child[val],
          value: val,
        }));
        break;
      default:
        break;
    }
    setHomeAddrData(data);
    Toast.hide();
  };
  const resetWorkAddrList = (values: (number | string)[]) => {
    let data: { label: string; value: string }[] = [];
    switch (values.length) {
      case 0:
        data = Object.keys(countryList).map(val => ({
          label: countryList[val].name,
          value: val,
        }));
        break;
      case 1:
        data = Object.keys(countryList[values[0]].child).map(val => ({
          label: countryList[values[0]].child[val].name,
          value: val,
        }));
        break;
      case 2:
        // eslint-disable-next-line no-case-declarations
        const cityData1 = countryList[values[0]].child;
        data = Object.keys(cityData1[values[1]].child).map(val => ({
          label: cityData1[values[1]].child[val],
          value: val,
        }));
        break;
      case 3:
        data = streetData;
        break;
      case 4:
        data = streetData;
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
      title: '居住地址',
      placeholder: '选择当前居住城市',
      level: 3,
      data: homeAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区'],
      onChangeLevel: (values: (string | number)[]) => {
        // eslint-disable-next-line no-console
        Toast.loading('加载中', 0.5);
        setTimeout(() => {
          resetHomeAddrList(values);
        }, 500);
      },
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log('存在点击事件');
      },
    },
    {
      type: 'addressPicker',
      fieldProps: 'workAddr',
      title: '工作地址',
      asyncLoad: false,
      // disabled: true,
      required: true,
      placeholder: '请选择',
      positionType: 'vertical',
      level: 4,
      data: workAddrData,
      placeholderList: ['请选择省', '请选择市', '请选择区', '请选择街道'],
      onChangeLevel: (values: (string | number)[]) => {
        // eslint-disable-next-line no-console
        console.log(values);
        resetWorkAddrList(values);
      },
      noData: <div>暂无街道数据</div>,
    },
  ] as IFormItemProps[];

  const formsValues = {
    homeAddr: {
      value: ['350000', '350100', '350102'],
      label: ['福建省', '福州市', '鼓楼区'],
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
