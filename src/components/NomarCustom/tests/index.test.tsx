import * as React from 'react';
import { render, testA11y, sleep, fireEvent, waitFor } from '@alita/test';
import Form from 'rc-field-form';
import DformCustom from '../';
import BasicTest from './demo/basic';

interface IDemoPage {
  name: string;
  age: number;
  onChange?: (currentActiveLink: string) => void;
  value?: string;
}

const demoPage: React.FC<IDemoPage> = (props) => {
  const { name, onChange, value } = props;
  return (
    <div style={{ textAlign: 'left' }}>
      <p>name: {name}</p>
      <p>
        age:
        <input
          aria-label="input"
          value={value}
          type="text"
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        />
      </p>
    </div>
  );
};
const myProps = {
  title: '自定义组件(受控)',
  required: true,
  fieldProps: 'age',
  CustomDom: demoPage,
  customDomProps: {
    name: 'owen',
  },
  defaultValue: '17',
};

it('passes custom a11y test', async () => {
  const { container, getByLabelText } = render(
    <div>
      <Form>
        <DformCustom {...myProps} />
      </Form>
    </div>,
  );
  await sleep(500);
  expect(getByLabelText('input')).toBeDefined();
  await testA11y(container);
});

it('passes custom basic test', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onChange = jest.fn();
  const { getByText, getByTestId } = render(
    <div>
      <Form>
        <BasicTest
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          isPc
          onChange={onChange}
        />
      </Form>
    </div>,
  );
  expect(getByText('自定义组件(非受控)')).toBeDefined();
  expect(getByText('This is a display page')).toBeDefined();
  expect(getByText('自定义组件(受控)')).toBeDefined();
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinishFailed).toBeCalled();
  fireEvent.change(getByTestId('names'), { target: { value: '小明' } });
  expect(onChange).toBeCalled();
  expect(getByTestId('names')).toHaveValue('小明');
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinish).toBeCalled();
});
it('passes custom pc basic test', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onChange = jest.fn();
  const { getByText, getByTestId } = render(
    <div>
      <Form>
        <BasicTest
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          isPc
          onChange={onChange}
        />
      </Form>
    </div>,
  );
  expect(getByText('自定义组件(非受控)')).toBeDefined();
  expect(getByText('This is a display page')).toBeDefined();
  expect(getByText('自定义组件(受控)')).toBeDefined();
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinishFailed).toBeCalled();
  fireEvent.change(getByTestId('names'), { target: { value: '小明' } });
  expect(onChange).toBeCalled();
  expect(getByTestId('names')).toHaveValue('小明');
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinish).toBeCalled();
});
