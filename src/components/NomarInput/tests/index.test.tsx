import * as React from 'react';
import Form from 'rc-field-form';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import { DformInput } from '../../..';
import BasicText from './demos/basic';

it('passes input a11y test', async () => {
  const { getByText, container } = render(
    <div>
      <Form>
        <DformInput fieldProps="username" title="用户名" />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('用户名'));
  testA11y(container);
});

test('render Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const clickBlur = jest.fn();

  const { getByText, getByLabelText, getByTestId } = render(
    <BasicText
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
    fireEvent.click(getByTestId('pwdId'));
  });
  expect(getByLabelText('userPwd')).toHaveValue('654321');
  expect(getByLabelText('userPwd')).toHaveAttribute('type', 'password');
  fireEvent.change(getByLabelText('userBlur'), { target: { value: '1' } });
  const blu = getByLabelText('userBlur');
  blu.focus();
  blu.blur();
  expect(clickBlur).toBeCalled();
  expect(getByText('身份证')).toBeDefined();
  let username5 = getByLabelText('username5');
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
