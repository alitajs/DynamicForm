import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import DformCheckBox from '../index';
import BasicTest from './demos/basic';
import CoupletText from './demos/couplet';

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

  // expect(getByText('喜欢的水果').parentNode).toHaveClass(
  //   'alitajs-dform-vertical-title',
  // );
  // await act(async () => {
  //   await fireEvent.click(getByText('橙子'))
  // })
  fireEvent.click(getByText('橙子'));
  fireEvent.click(getByText('Submit'));
  // await waitFor(() => {
  //   expect(onFinishFailed).toBeCalled();
  // })
  // await act(async () => {
  //   await fireEvent.click(getByText('苹果'))
  // })
  fireEvent.click(getByText('苹果'));
  await waitFor(() => {
    expect(getByText('苹果').parentNode?.firstChild).toHaveClass(
      "alitajs-dform-box-botton-checked"
    )
  })
  fireEvent.click(getByText('Submit'))
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  })
});

<<<<<<< HEAD
// test('render couple', async () => {
//   const { getByText } = render(<CoupletText />);
//   expect(getByText('级联选择饮料'));
//   await sleep(1000);
//   expect(getByText('可乐')).toHaveClass('alitajs-dform-box-label');
//   fireEvent.click(getByText('全选'));
//   await waitFor(() => {
//     expect(getByText('可乐').parentNode?.firstChild).toHaveClass(
//       'alitajs-dform-box-botton-checked',
//     );
//     expect(getByText('牛奶').parentNode?.firstChild).toHaveClass(
//       'alitajs-dform-box-botton-checked',
//     );
//     expect(getByText('果汁').parentNode?.firstChild).toHaveClass(
//       'alitajs-dform-box-botton-checked',
//     );
//   });
//   fireEvent.click(getByText('全选'));
//   await waitFor(() => {
//     expect(getByText('可乐').parentNode?.firstChild).not.toHaveClass(
//       'alitajs-dform-box-botton-checked',
//     );
//     expect(getByText('牛奶').parentNode?.firstChild).not.toHaveClass(
//       'alitajs-dform-box-botton-checked',
//     );
//   });
//   fireEvent.click(getByText('只要可乐'));
//   await waitFor(() => {
//     expect(getByText('可乐').parentNode?.firstChild).toHaveClass(
//       'alitajs-dform-box-botton-checked',
//     );
//   });
//   fireEvent.click(getByText('只要可乐'));
//   await waitFor(() => {
//     expect(getByText('可乐').parentNode?.firstChild).not.toHaveClass(
//       'alitajs-dform-box-botton-checked',
//     );
//   });
// });
=======
test('render couple', async () => {
  const { getByText } = render(<CoupletText />);
  await sleep(1000);
  expect(getByText('级联选择饮料'));
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
>>>>>>> 15730078390c639705b2f18ca5b087208c7434ae
