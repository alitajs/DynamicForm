import * as React from 'react';
import Form from 'rc-field-form';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import { DformInput } from '../../..';
import BasicTest from './demos/basic';
import PcTest from './demos/pc';
import SingleTest from './demos/single';

it('passes input a11y test', async () => {
  const { container, getAllByText } = render(
    <div>
      <Form>
        <DformInput fieldProps="username" title="用户名" />
      </Form>
    </div>,
  );
  fireEvent.click(getAllByText('用户名')[0]);
  testA11y(container);
});

test('render input Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const clickBlur = jest.fn();

  const { getByText, getByLabelText, getAllByTestId, getAllByText } = render(
    <BasicTest
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      clickBlur={clickBlur}
    />,
  );
  await waitFor(() => {
    fireEvent.click(getByText('submit'));
  });
  expect(onFinishFailed).toBeCalled();
  expect(getByLabelText('username')).toHaveValue('');
  expect(getByLabelText('defaultValue')).toHaveValue('这是默认值');
  // expect(getByLabelText('userAge')).toHaveValue('不可编辑');
  fireEvent.change(getByLabelText('username'), { target: { value: '小明' } });
  expect(getByLabelText('username')).toHaveValue('小明');
  await waitFor(() => {
    fireEvent.click(getByText('submit'));
  });
  expect(onFinish).toBeCalled();
  expect(getByLabelText('userPwd')).toHaveValue('');
  fireEvent.change(getByLabelText('userPwd'), { target: { value: '123456' } });
  expect(getByLabelText('userPwd')).toHaveValue('123456');
  expect(getByLabelText('userPwd')).toHaveAttribute('type', 'text');
  await waitFor(() => {
    fireEvent.click(getAllByTestId('pwdId')[0]);
  });
  expect(getByLabelText('userPwd')).toHaveValue('654321');
  expect(getByLabelText('userPwd')).toHaveAttribute('type', 'password');
  fireEvent.change(getByLabelText('userBlur'), { target: { value: '1' } });
  const blu = getByLabelText('userBlur');
  blu.focus();
  blu.blur();
  expect(clickBlur).toBeCalled();
  expect(getAllByText('身份证')[0]).toBeDefined();
  fireEvent.change(getByLabelText('username5'), { target: { value: 111 } });
  fireEvent.change(getByLabelText('bankCard'), {
    target: { value: 'bankCard' },
  });
  fireEvent.change(getByLabelText('phone'), { target: { value: '1' } });
  fireEvent.change(getByLabelText('phone'), { target: { value: '6666' } });
  fireEvent.change(getByLabelText('phone'), {
    target: { value: '1468282282' },
  });
  fireEvent.change(getByLabelText('digit'), { target: { value: 'digit' } });
});

test('render input pc', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const clickBlur = jest.fn();

  const {
    getByText,
    getByLabelText,
    getByTestId,
    getAllByTestId,
    getAllByText,
  } = render(
    <PcTest
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      clickBlur={clickBlur}
    />,
  );
  await waitFor(() => {
    fireEvent.click(getByText('submit'));
  });
  expect(onFinishFailed).toBeCalled();
  fireEvent.change(getByLabelText('username5'), { target: { value: '123' } });
  expect(getByLabelText('username5')).toHaveValue('123');

  await waitFor(() => {
    fireEvent.click(getByText('submit'));
  });
  expect(onFinishFailed).toBeCalled();

  expect(getByLabelText('userPwd')).toHaveValue('');
  fireEvent.change(getByLabelText('userPwd'), { target: { value: '123456' } });
  expect(getByLabelText('userPwd')).toHaveValue('123456');
  expect(getByLabelText('userPwd')).toHaveAttribute('type', 'text');
  await waitFor(() => {
    fireEvent.click(getAllByTestId('pwdId')[0]);
  });
  expect(getByLabelText('userPwd')).toHaveValue('654321');
  expect(getByLabelText('userPwd')).toHaveAttribute('type', 'password');

  fireEvent.change(getByLabelText('username5'), { target: { value: '1' } });
  const blu = getByLabelText('username5');
  blu.focus();
  blu.blur();
  expect(clickBlur).toBeCalled();
  expect(getAllByText('身份证')[0]).toBeDefined();
  expect(getAllByText('身份证')[0]).toBeDefined();
  expect(getByTestId('photoId')).toBeDefined();
  expect(getByTestId('photoId')).toBeDefined();
  expect(getByLabelText('userTitle')).toHaveAttribute('disabled', '');
});

test('render input single', async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const onFocus = jest.fn();

  const { getByLabelText, getByTestId, getByText } = render(
    <SingleTest onChange={onChange} onBlur={onBlur} onFocus={onFocus} />,
  );

  expect(getByText('请设置密码')).toBeDefined();
  expect(getByLabelText('userPwd')).toHaveValue('123');
  expect(getByLabelText('userPwd')).toHaveAttribute('type', 'text');
  await waitFor(() => {
    fireEvent.click(getByTestId('pwdId'));
  });
  expect(getByLabelText('userPwd')).toHaveAttribute('type', 'password');

  const blu = getByLabelText('userPwd');
  blu.focus();
  expect(onFocus).toBeCalled();
  blu.blur();
  expect(onBlur).toBeCalled();
  fireEvent.change(getByLabelText('userPwd'), { target: { value: '111' } });
  expect(onChange).toBeCalled();
  expect(getByLabelText('userPwd')).toHaveValue('111');
});
