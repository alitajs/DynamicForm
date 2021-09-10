import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep, screen } from '@alita/test';
import Form from 'rc-field-form';
import DformCheckBox from '../index';
import BasicTest from './demos/basic';
import CoupletText from './demos/couplet';
import Formtest from './demos/formtest';

const fruitsList = [
  { foodId: 'apple', foodName: '苹果' },
  { foodId: 'banana', foodName: '香蕉' },
  { foodId: 'orange', foodName: '橙子' },
  { foodId: 'watermelon', foodName: '西瓜' },
  { foodId: 'hami', foodName: '哈密瓜' },
  { foodId: 'pineapple', foodName: '菠萝' },
  { foodId: 'pear', foodName: '香梨' },
];
const myProps = {
  type: 'checkbox',
  title: '喜欢的水果',
  required: true,
  data: fruitsList,
  fieldProps: 'fruit',
  chunk: 2,
  alias: {
    label: 'foodName',
    value: 'foodId',
  },
};
it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <DformCheckBox {...myProps} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('苹果'));
  await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText } = render(
    <BasicTest onFinish={onFinish} onFinishFailed={onFinishFailed} />,
  );
  await sleep(1000)
  expect(getByText('苹果')).toBeDefined()
  fireEvent.click(getByText('橙子'))
  fireEvent.click(getByText('Submit'))
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  })
  fireEvent.click(getByText('苹果'))
  await waitFor(() => {
    expect(getByText('苹果').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
  });
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
});

test('render couple', async () => {
  const { getByText } = render(<CoupletText />);
  await sleep(1000);
  expect(getByText('可乐')).toHaveClass('alitajs-dform-box-label');
  fireEvent.click(getByText('全选'));
  await waitFor(() => {
    expect(getByText('可乐').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
    expect(getByText('牛奶').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
    expect(getByText('果汁').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
  });
  fireEvent.click(getByText('全选'));
  await waitFor(() => {
    expect(getByText('可乐').parentNode?.firstChild).not.toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
    expect(getByText('牛奶').parentNode?.firstChild).not.toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
  });
  fireEvent.click(getByText('只要可乐'));
  await waitFor(() => {
    expect(getByText('可乐').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
  });
  fireEvent.click(getByText('只要可乐'));
  await waitFor(() => {
    expect(getByText('可乐').parentNode?.firstChild).not.toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
  });
});

it('This is test form', async () => {
  const { getByText, getAllByText, container } = render(
    <Formtest />,
  );
  fireEvent.click(getByText("拷贝配置"))
  fireEvent.click(getByText("新增表单"))
  expect(getByText("开关")).toBeDefined()
  fireEvent.click(getByText("取 消"))
  fireEvent.click(getByText("新增表单"))
  // expect(getByText('选择表单类型')).toBeDefined()
  await sleep(500)
  let clicKDom = getByText("选择表单类型").parentNode?.parentNode?.lastChild?.firstChild?.firstChild
  // console.log(clicKDom?.firstChild?.firstChild?.firstChild.getAttribute('class'))
  // fireEvent.click(clicKDom?.firstChild?.firstChild?.firstChild)
  // fireEvent.click(clicKDom?.firstChild?.firstChild)
  // fireEvent.click(clicKDom?.firstChild)  
  // fireEvent.click(clicKDom)
  // console.log(document.querySelectorAll(".alitajs-dform-input-item")[0].innerHTML)

  fireEvent.click(document.querySelectorAll(".alitajs-dform-input-item")[0])
  // await sleep(1000)

  fireEvent.click(getByText("输入框"))
  // await sleep(3000)
  await waitFor(() => {
    console.log(getByText("选择表单类型"));

  })

  // expect(getByText("编辑表单数据")).toBeDefined();
  // expect(screen.getByText("编辑表单数据")).toBeDefined();
  // await waitFor(() => {
  //   expect(getByText("编辑表单数据")).toBeDefined();
  //   expect(screen.getByText("编辑表单数据")).toBeDefined();
  // })




  // let completeDom = getByText("编辑表单数据").parentNode?.parentNode?.lastChild?.lastChild
  // fireEvent.click(getAllByText("完 成")[0])
  // fireEvent.click(getByText("text"))
  // await sleep(500)
  // findAllByText("确定");
  // fireEvent.click(getAllByText("确定")[0])
  // await sleep(500)
  // fireEvent.click(completeDom)
  // await sleep(500)
  // expect(findAllByAltText("输入框")).toBeDisabled()

});
