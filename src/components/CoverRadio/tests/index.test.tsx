import * as React from 'react';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import Form from 'rc-field-form';
import CoverRadio from '../index';
import BasicTest from './demos/basic';
import CoupletText from './demos/couplet';
import { get } from 'lodash';

const sexList = [
  { sexName: '男', sexId: 'man' },
  { sexName: '女', sexId: 'woman' },
];
const myProps = {
  fieldProps: 'sex',
  data: sexList,
  title: '性别',
  required: true,
  alias: {
    label: 'sexName',
    value: 'sexId',
  },
};

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <CoverRadio {...myProps} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('性别'));
  await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicTest onFinish={onFinish} onFinishFailed={onFinishFailed} />,
  );
  expect(getAllByText('男')[0]).toHaveClass(
    'alitajs-dform-cover-radio-wrapper-checked',
  );
  fireEvent.click(getAllByText('男')[0]);
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(getByText('请选择性别'));
    expect(getAllByText('男')[0]).not.toHaveClass(
      'alitajs-dform-cover-radio-wrapper-checked',
    );
    expect(onFinishFailed).toBeCalled();
  });
  fireEvent.click(getAllByText('女')[0]);
  await waitFor(() => {
    expect(getAllByText('女')[0]).toHaveClass(
      'alitajs-dform-cover-radio-wrapper-checked',
    );
  });
  fireEvent.click(getAllByText('男')[1]);
  await waitFor(() => {
    expect(getAllByText('男')[1]).not.toHaveClass(
      'alitajs-dform-cover-radio-wrapper-checked',
    );
  });
  fireEvent.click(getByText('红烧肉'));
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
});

test('render couplet', async () => {
  const { getByText } = render(<CoupletText />);
  expect(getByText('级联--饮料'));
  fireEvent.click(getByText('可乐'));
  await waitFor(() => {
    expect(getByText('可乐')).toHaveClass(
      'alitajs-dform-cover-radio-wrapper-checked',
    );
  });
  fireEvent.click(getByText('要果汁'));
  await waitFor(() => {
    expect(getByText('果汁')).toHaveClass(
      'alitajs-dform-cover-radio-wrapper-checked',
    );
  });
  fireEvent.click(getByText('要可乐'));
  await waitFor(() => {
    expect(getByText('可乐')).toHaveClass(
      'alitajs-dform-cover-radio-wrapper-checked',
    );
  });
  fireEvent.click(getByText('要牛奶'));
  await waitFor(() => {
    expect(getByText('牛奶')).toHaveClass(
      'alitajs-dform-cover-radio-wrapper-checked',
    );
  });
  fireEvent.click(getByText('Submit'));
});
