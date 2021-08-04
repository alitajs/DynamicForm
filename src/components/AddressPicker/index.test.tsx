import * as React from 'react';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import Form from 'rc-field-form';
import DynamicForm, { IFormItemProps } from '../../';
import CountryList from '@bang88/china-city-data';
import { Button } from 'antd-mobile';
import AddressPicker from './';

const props = {
  type: 'addressPicker',
  fieldProps: 'homeAddr',
  title: '居住地址',
  placeholder: '选择当前居住城市',
  level: 3,
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
          data = queryList(CountryList, values[values.length - 2]);
          break;
        default:
          break;
      }
      setHomeAddrData(data);
    };
    const formsData = [
      {
        type: 'addressPicker',
        fieldProps: 'homeAddr',
        title: '居住地址',
        placeholder: '选择当前居住城市',
        level: 3,
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
  const { getByText, getByRole } = render(
    <Basic onFinish={onFinish} onFinishFailed={onFinishFailed} />,
  );
  fireEvent.click(getByText('福建省,福州市,鼓楼区'));
  expect(getByText('确定')).toHaveClass('am-picker-popup-header-right');
  fireEvent.click(getByText('福建省'));
  fireEvent.click(getByText('福建省'));
  fireEvent.click(getByText('福州市'));
  fireEvent.click(getByText('台江区'));
  fireEvent.click(getByText('确定'));
  await waitFor(() => {
    expect(getByText('福建省,福州市,台江区')).toHaveClass(
      'alitajs-dform-text-item-text',
    );
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinish).toBeCalled();
  fireEvent.click(getByText('福建省,福州市,台江区'));
  fireEvent.click(getByText('福建省'));
  fireEvent.click(getByText('确定'));
  await waitFor(() => {
    expect(getByText('选择当前居住城市')).toHaveClass(
      'alitajs-dform-text-item-text',
    );
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinishFailed).toBeCalled();
});
