import * as React from 'react';
import { render, fireEvent, waitFor } from '@alita/test';
import GroupUsageTest from './groupUsageTest';
import JsonGroupTest from './jsonGroupTest';

test('group usage test', async () => {
  const { getByText } = render(<GroupUsageTest />);
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(getByText('卡片一')).toBeDefined();
  expect(getByText('卡片二')).toBeDefined();
  expect(getByText('卡片三')).toBeDefined();
  expect(getByText('请选择性别')).toBeDefined();
  expect(getByText('请选择喜欢的水果')).toBeDefined();
  await waitFor(() => {
    expect(getByText('卡片一').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-card-require',
    );
  });
  await waitFor(() => {
    expect(getByText('卡片三').parentNode?.firstChild).toHaveStyle(
      'background: rgb(24, 144, 255)',
    );
  });

  fireEvent.click(getByText('男'));
  await waitFor(() => {
    expect(getByText('男').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-radio-checked',
    );
  });
  fireEvent.click(getByText('香梨'));
  expect(getByText('请选择喜欢的水果')).toBeDefined();
  fireEvent.click(getByText('菠萝'));
  await waitFor(() => {
    expect(getByText('菠萝').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
  });
});

test('json group test', async () => {
  const { getByText } = render(<JsonGroupTest />);
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(getByText('卡片一')).toBeDefined();
  expect(getByText('卡片二')).toBeDefined();
  expect(getByText('卡片三')).toBeDefined();
  expect(getByText('请选择性别')).toBeDefined();
  expect(getByText('请选择喜欢的水果')).toBeDefined();
  await waitFor(() => {
    expect(getByText('卡片一').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-card-require',
    );
  });
  await waitFor(() => {
    expect(getByText('卡片三').parentNode?.firstChild).toHaveStyle(
      'background: rgb(24, 144, 255)',
    );
  });

  fireEvent.click(getByText('男'));
  await waitFor(() => {
    expect(getByText('男').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-radio-checked',
    );
  });
  fireEvent.click(getByText('香梨'));
  expect(getByText('请选择喜欢的水果')).toBeDefined();
  fireEvent.click(getByText('菠萝'));
  await waitFor(() => {
    expect(getByText('菠萝').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-box-botton-checked',
    );
  });
});
