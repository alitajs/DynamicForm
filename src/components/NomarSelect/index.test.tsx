import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import NomarSelect from './index';
import DynamicForm, { IFormItemProps } from '../../';
import { Button } from 'antd-mobile';
//选择季节
const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];
//选择城市
const citys = [
  [
    {
      label: '福州',
      value: '福州',
    },
    {
      label: '厦门',
      value: '厦门',
    },
  ],
]

const myProps = {
  type: 'select',
  fieldProps: 'userPicker1',
  title: '季节',
  placeholder: '请选择',
  data: seasons,
}
const formsValues = {
  userPicker2: ['厦门'],
  // userPicker3: ['福州'],
};

const formsData = [
  {
    type: 'select',
    fieldProps: 'userPicker1',
    title: '季节',
    placeholder: '请选择',
    data: seasons,
  },
  {
    type: 'select',
    fieldProps: 'userPicker2',
    required: true,
    title: '城市(不可编辑)',
    placeholder: '请选择',
    data: citys,
    disabled: true,
  },
] as IFormItemProps[]

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarSelect  {...myProps} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('请选择'));
  await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();

  function Basic({ onFinish, onFinishFailed }: any) {
    const [form] = Form.useForm();
    // const [formsValues] = React.useState(myProps)
    const formProps = {
      form,
      onFinish,
      onFinishFailed,
      formsValues,
      data: formsData,
      autoLineFeed: false,
      isDev: true,
    };
    return (
      <>
        <DynamicForm {...formProps}></DynamicForm>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </>
    )
  }

  const { getByText } = render(
    <Basic onFinish={onFinish} onFinishFailed={onFinishFailed}></Basic>,
  );
  //第一个选择季节
  fireEvent.click(getByText("请选择"));
  fireEvent.click(getByText("取消"));
  fireEvent.click(getByText("请选择"));
  expect(getByText('确定')).toHaveClass("am-picker-popup-header-right");
  fireEvent.click(getByText('2013'))
  fireEvent.click(getByText('春'))
  fireEvent.click(getByText('确定'));
  await waitFor(() => {
    expect(getByText("2013,春")).toHaveClass("alitajs-dform-text-item-text")
  })
  //选择城市
  fireEvent.click(getByText("厦门"));
  // expect(getByText('确定')).toHaveClass("am-picker-popup-header-right");
  // expect(getByText('福州')).toHaveClass("am-picker-col-item");
  // fireEvent.click(getByText('福州'));
  // fireEvent.click(getByText('确定'));
  fireEvent.click(getByText("Submit"));
})
