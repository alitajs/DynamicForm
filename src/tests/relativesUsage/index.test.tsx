import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import BasicTest from './basic';
import dayjs from 'dayjs';

test('render Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onChange = jest.fn();
  const { getByText, getAllByText, getByLabelText } = render(
    <BasicTest
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={onChange}
    />,
  );
  expect(getByLabelText('username')).toHaveValue('小红');
  // 判断是否选择
  fireEvent.click(getAllByText('是')[0]);
  await waitFor(() => {
    expect(getAllByText('是')[0].parentNode?.firstChild).toHaveClass(
      'alitajs-dform-radio-checked',
    );
  });
  expect(getByText('J用户名')).toBeDefined();
  // 判断是否选择
  fireEvent.click(getAllByText('否')[0]);
  await waitFor(() => {
    expect(getAllByText('否')[0].parentNode?.firstChild).toHaveClass(
      'alitajs-dform-radio-checked',
    );
  });
  // 判断是否选择
  fireEvent.click(getAllByText('女')[0]);
  await waitFor(() => {
    expect(getAllByText('女')[0].parentNode?.firstChild).toHaveClass(
      'alitajs-dform-radio-checked',
    );
  });
  await waitFor(() => {
    fireEvent.click(getByText('submit'));
  });
  expect(onFinishFailed).toBeCalled();
  await waitFor(() => {
    expect(getByText('出生年月').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-redStar',
    );
    expect(getByText('美食').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-redStar',
    );
  });
  fireEvent.click(getByText('请选择出生年月日'));
  fireEvent.click(getByText('取消'));
  fireEvent.click(getByText('请选择出生年月日'));
  fireEvent.click(getByText('确认'));
  expect(onChange).toBeCalled();
  expect(getByText(dayjs(new Date()).format('YYYY-MM-DD')));
  await waitFor(() => {
    fireEvent.click(getByText('submit'));
  });
  expect(onFinish).toBeCalled();
});
