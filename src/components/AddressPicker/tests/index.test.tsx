import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import DynamicForm, { IFormItemProps } from '../../..';
import CountryList from '@bang88/china-city-data';
import { Button, Toast } from 'antd-mobile-v2';
import AddressPicker from '..';

import SingleText from './demos/single';

const props = {
  type: 'addressPicker',
  fieldName: 'homeAddr',
  fieldProps: 'homeAddr',
  title: '居住地址',
  placeholder: '选择当前居住城市',
  data: [],
  placeholderList: ['请选择省', '请选择市', '请选择区'],
  onChangeLevel: (values: (string | number)[]) => {},
};

interface IAddrDataProps {
  label: string;
  value: string | number;
}

it('passes a11y test', async () => {
  const { container, getByText } = render(
    <Form>
      <AddressPicker {...props} />
    </Form>,
  );
  fireEvent.click(getByText('选择当前居住城市'));
  await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();

  function Basic({ onFinish, onFinishFailed }: any) {
    const [form] = Form.useForm();
    const [formsValues] = React.useState({
      homeAddr: {
        label: ['福建省', '福州市', '鼓楼区'],
        value: ['35', '3501', '350102'],
      },
    });
    const [homeAddrData, setHomeAddrData] = React.useState<
      IAddrDataProps[] | []
    >([]);
    const queryList = (list: any, val: string | number) => {
      let newList: any[] = [];
      list.map((item: { value: string; children: any[] }) => {
        if (item.value === val) {
          newList = item.children;
        }
        if (item.children && Array.isArray(item.children)) {
          const vals = queryList(item.children, val);
          if (vals && vals.length > 0) newList = vals;
        }
      });
      return newList;
    };

    const resetHomeAddrList = (values: (number | string)[]) => {
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
      setHomeAddrData(data);
    };
    const formsData = [
      {
        type: 'addressPicker',
        fieldName: 'homeAddr',
        title: '居住地址',
        placeholder: '选择当前居住城市',
        required: true,
        data: homeAddrData,
        placeholderList: ['请选择省', '请选择市', '请选择区'],
        onChangeLevel: (values: (string | number)[]) => {
          // eslint-disable-next-line no-console
          resetHomeAddrList(values);
        },
      },
    ] as IFormItemProps[];
    const formProps = {
      onFinish,
      onFinishFailed,
      data: formsData,
      formsValues,
      form,
      autoLineFeed: false,
      isDev: false,
      failScroll: false,
    };
    return (
      <>
        <DynamicForm {...formProps}></DynamicForm>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </>
    );
  }
  const { getByText } = render(
    <Basic onFinish={onFinish} onFinishFailed={onFinishFailed} />,
  );
  fireEvent.click(getByText('福建省 福州市 鼓楼区'));
  expect(getByText('确定')).toHaveClass('am-picker-popup-header-right');
  fireEvent.click(getByText('福建省'));
  fireEvent.click(getByText('福建省'));
  fireEvent.click(getByText('福州市'));
  fireEvent.click(getByText('台江区'));
  fireEvent.click(getByText('确定'));
  expect(getByText('福建省 福州市 台江区')).toHaveClass(
    'alitajs-dform-text-item-text',
  );
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });

  fireEvent.click(getByText('福建省 福州市 台江区'));
  fireEvent.click(getByText('福建省'));
  fireEvent.click(getByText('确定'));
  expect(getByText('选择当前居住城市')).toHaveClass(
    'alitajs-dform-text-item-text',
  );
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
});
// 无level参数的测试
test('renders Basic', async () => {
  const onChange = jest.fn();
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();

  function Basic({ onFinish, onFinishFailed }: any) {
    const [form] = Form.useForm();
    const [formsValues] = React.useState({
      homeAddr: {
        label: ['福建省', '福州市', '鼓楼区'],
        value: ['35', '3501', '350102'],
      },
      commonlyAddr: {
        label: ['福建省', '福州市'],
        value: ['35', '3501'],
      },
    });

    const [homeAddrData, setHomeAddrData] = React.useState<any>([]);
    const [commonlyAddrData, setCommonlyAddrData] = React.useState<any>([]);

    const [workAddrData, setWorkAddrData] = React.useState<any>([]);

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
        <DynamicForm {...formProps}>
          <AddressPicker
            fieldProps=""
            fieldName="homeAddr"
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
            onChange={onChange}
          />
          <AddressPicker
            fieldProps="commonlyAddr"
            title="常用地址"
            placeholder="选择常用地址"
            required
            data={commonlyAddrData}
            placeholderList={['请选择省', '请选择市', '请选择区']}
            onChangeLevel={(values: (string | number)[]) => {
              console.log('values', values);
              Toast.show('加载中');
              // eslint-disable-next-line no-console
              setTimeout(() => {
                resetHomeAddrList(values, 'commonlyAddrData');
              }, 300);
            }}
            onChange={onChange}
          />
          <AddressPicker
            fieldProps=""
            fieldName="workAddr"
            title="居住地址"
            placeholder="选择当前居住城市"
            positionType="vertical"
            data={workAddrData}
            placeholderList={['请选择省', '请选择市', '请选择区', '请选择街道']}
            onChangeLevel={(values: (string | number)[]) => {
              Toast.show('加载中');
              setTimeout(() => {
                resetWorkAddrList(values);
              }, 300);
            }}
            onChange={onChange}
            noData={<div>暂无街道数据</div>}
          />
        </DynamicForm>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </>
    );
  }
  const { getByText, getByRole } = render(
    <Basic onFinish={onFinish} onFinishFailed={onFinishFailed} />,
  );
  fireEvent.click(getByText('福建省 福州市 鼓楼区'));
  expect(getByText('确定')).toHaveClass('am-picker-popup-header-right');
  await waitFor(() => {
    fireEvent.click(getByText('福建省'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('福建省'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('福州市'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('台江区'));
  });

  fireEvent.click(getByText('确定'));
  await waitFor(() => {
    expect(onChange).toBeCalled();
  });
  expect(getByText('福建省 福州市 台江区')).toHaveClass(
    'alitajs-dform-text-item-text',
  );
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });

  fireEvent.click(getByText('福建省 福州市 台江区'));
  fireEvent.click(getByText('福建省'));
  fireEvent.click(getByText('确定'));
  expect(getByText('选择当前居住城市')).toHaveClass(
    'alitajs-dform-text-item-text',
  );
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
  fireEvent.click(getByText('福建省 福州市'));
  await waitFor(() => {
    expect(getByText('请选择区')).toHaveClass(
      'alitajs-dform-address-value-select',
    );
  });
  await waitFor(() => {
    fireEvent.click(getByText('确定'));
  });
  await waitFor(() => {
    expect(onChange).toBeCalled();
  });
  fireEvent.click(getByText('福建省 福州市'));
  fireEvent.click(getByText('鼓楼区'));
  fireEvent.click(getByText('确定'));
  expect(getByText('福建省 福州市 鼓楼区')).toHaveClass(
    'alitajs-dform-text-item-text',
  );
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
  expect(getByText('请选择工作地址')).toHaveClass('alitajs-dform-error-text');
  fireEvent.click(getByText('选择当前居住城市'));
  await waitFor(() => {
    fireEvent.click(getByText('北京市'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('市辖区'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('东城区'));
  });
  await waitFor(() => {
    expect(getByText('请选择街道')).toHaveClass(
      'alitajs-dform-address-value-select',
    );
  });
  await waitFor(() => {
    fireEvent.click(getByText('街道1'));
  });
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
});

test('renders single', async () => {
  const { getByText } = render(<SingleText />);

  expect(getByText('福建省 福州市 鼓楼区')).toBeDefined();
  await waitFor(() => {
    fireEvent.click(getByText('福建省 福州市 鼓楼区'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('福建省'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('河北省'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('石家庄市'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('长安区'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('确定'));
  });

  expect(getByText('河北省 石家庄市 长安区')).toBeDefined();
});
