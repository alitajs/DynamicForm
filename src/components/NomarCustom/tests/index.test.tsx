import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import NomarCustom from '../index';
import BasicTest from './demos/basic';

const showDemoPage = () => (
  <div style={{ textAlign: 'left' }}>This is a display page</div>
);

const myProps = {
  title: '自定义组件(非受控)',
  fieldProps: 'custom',
  CustomDom: showDemoPage,
};

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarCustom {...myProps} />
      </Form>
    </div>,
  );
  expect(getByText('This is a display page')).toBeDefined()
  await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText } = render(
    <BasicTest onFinish={onFinish} onFinishFailed={onFinishFailed} />,
  );
  // console.log(getByText("123"));
  expect(getByText("自定义组件(受控)")).toBeDefined()
  fireEvent.click(getByText('Submit'))
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  })
  expect(getByText('*')).toHaveClass('alitajs-dform-redStar')
  const input: any = getByText('age:').lastChild;
  expect(input).toHaveValue('17')
  fireEvent.change(input, { target: { value: '123456' } });
  expect(input).toHaveValue('123456');
})