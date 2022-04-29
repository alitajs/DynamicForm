/**
 * title: 基础 选址
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace, Toast } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  AddressPicker,
} from '@alitajs/dform';

import CountryList from '@bang88/china-city-data';

const Page: FC = () => {
  const [form] = useForm();
  const [formsValues] = useState({
    homeAddr: {
      label: ['福建省', '福州市', '鼓楼区'],
      value: ['35', '3501', '350102'],
    },
    commonlyAddr: {
      label: ['福建省', '福州市'],
      value: ['35', '3501'],
    },
  });
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const [homeAddrData, setHomeAddrData] = useState<any>([]);
  const [commonlyAddrData, setCommonlyAddrData] = useState<any>([]);

  const [workAddrData, setWorkAddrData] = useState<any>([]);

  const queryList = (list: any, val: string | number) => {
    let newList: any[] = [];
    list.map((item: { value: string; children: any[] }) => {
      if (item.value === val) {
        newList = item.children;
      }
      if (item.children && Array.isArray(item.children)) {
        const vals = queryList(item.children, val);
        if (vals && vals.length > 0) {
          newList = vals;
        }
      }
    });
    return newList;
  };

  const getResetHomeAddrList = (values: (number | string)[]) => {
    let data: { label: string; value: string }[] = [];
    switch (values.length) {
      case 0:
        data = CountryList;
        break;
      case 1:
      case 2:
        data = queryList(CountryList, values[values.length - 1]);
        break;
      case 3:
        break;
      default:
        break;
    }
    return data;
  };

  const getResetWorkAddrList = (values: (number | string)[]) => {
    let data: { label: string; value: string }[] = [];
    switch (values.length) {
      case 0:
        data = CountryList;
        break;
      case 1:
      case 2:
        data = queryList(CountryList, values[values.length - 1]);
        break;
      case 3:
        data = [
          { label: '街道1', value: 'street1' },
          { label: '街道2', value: 'street2' },
          { label: '街道3', value: 'street3' },
          { label: '街道4', value: 'street4' },
        ];
        break;
      default:
        break;
    }
    return data;
  };

  const resetHomeAddrList = (values: (number | string)[], key: string) => {
    let mValues = JSON.parse(JSON.stringify(values));
    let data: { label: string; value: string }[] =
      getResetHomeAddrList(mValues);
    Toast.hide();
    if (key === 'commonlyAddrData') {
      setCommonlyAddrData(data);
    } else {
      setHomeAddrData(data);
    }
  };

  const resetWorkAddrList = (values: (number | string)[]) => {
    let mValues = JSON.parse(JSON.stringify(values));
    let data: { label: string; value: string }[] =
      getResetWorkAddrList(mValues);
    Toast.hide();
    setWorkAddrData(data);
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    autoLineFeed: false,
    isDev: false,
  };
  return (
    <>
      <AddressPicker
        fieldProps="homeAddr"
        title="工作地址"
        placeholder="选择当前工作地址"
        required
        data={homeAddrData}
        placeholderList={['请选择省', '请选择市', '请选择区']}
        onChangeLevel={(values: (string | number)[]) => {
          console.log('values', values);
          Toast.show('加载中');
          // eslint-disable-next-line no-console
          setTimeout(() => {
            resetHomeAddrList(values, 'homeAddrData');
          }, 300);
        }}
        defaultValue={{
          label: ['福建省', '福州市', '鼓楼区'],
          value: ['35', '3501', '350102'],
        }}
        onChange={(value: any) => {
          console.log('onChangevalue', value);
        }}
      />
      <WhiteSpace size="sm" />
      <Button
        type="primary"
        onClick={() =>
          form.setFieldsValue({
            commonlyAddr: {
              label: ['福建省', '福州市', '鼓楼区'],
              value: ['35', '3501', '350102'],
            },
          })
        }
      >
        changeValue
      </Button>
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
