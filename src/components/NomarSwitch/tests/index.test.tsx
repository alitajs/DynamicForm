import * as React from 'react';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import Form from 'rc-field-form';
import NomarSwitch from '../index';
import BasicTest from './demos/basic';
import SingleTest from './demos/single';

const myProps = {
  fieldProps: 'on',
  placeholder: '选择',
  title: 'On',
};

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarSwitch {...myProps} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('On'));
  await testA11y(container);
});

test('renders switch Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText } = render(
    <BasicTest onFinish={onFinish} onFinishFailed={onFinishFailed} />,
  );
  expect(getByText('Off')).toBeDefined();
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
  expect(getByText('Off').parentNode?.firstChild).toHaveClass(
    'alitajs-dform-redStar',
  );
  //判断是否是必选
  const OnClick: any =
    getByText('On').parentNode?.parentNode?.lastChild?.firstChild?.firstChild;
  expect(OnClick).toHaveClass('adm-switch-checked');
  fireEvent.click(OnClick);
  await waitFor(() => {
    expect(document.querySelectorAll('.adm-switch-checked').length).toBe(1);
  });
  //判断是否可点击
  const disabledOn: any =
    getByText('Disabled On').parentNode?.parentNode?.lastChild?.firstChild;
  fireEvent.click(disabledOn);
  await waitFor(() => {
    expect(document.querySelectorAll('.adm-switch-checked').length).toBe(1);
  });
});

test('renders switch pc', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText } = render(
    <BasicTest onFinish={onFinish} onFinishFailed={onFinishFailed} isPc />,
  );
  expect(getByText('Off')).toBeDefined();
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
  expect(getByText('Off').parentNode?.firstChild).toHaveClass(
    'alitajs-dform-redStar',
  );
  //判断是否是必选
  const OnClick: any =
    getByText('On').parentNode?.parentNode?.lastChild?.firstChild?.firstChild;
  expect(OnClick).toHaveClass('ant-switch-checked');
  fireEvent.click(OnClick);
  await waitFor(() => {
    expect(document.querySelectorAll('.ant-switch-checked').length).toBe(1);
  });
  //判断是否可点击
  const disabledOn: any =
    getByText('Disabled On').parentNode?.parentNode?.lastChild?.firstChild;
  fireEvent.click(disabledOn);
  await waitFor(() => {
    expect(document.querySelectorAll('.ant-switch-checked').length).toBe(1);
  });
});

test('renders switch single', async () => {
  const onChange = jest.fn();
  const { getByText } = render(<SingleTest onChange={onChange} />);

  await waitFor(() => {
    expect(document.querySelectorAll('.adm-switch-checked').length).toBe(1);
  });
  const OnClick: any =
    getByText('On').parentNode?.parentNode?.lastChild?.firstChild?.firstChild;
  fireEvent.click(OnClick);
  await waitFor(() => {
    expect(onChange).toBeCalled();
  });
  expect(document.querySelectorAll('.adm-switch-checked').length).toBe(0);
});
