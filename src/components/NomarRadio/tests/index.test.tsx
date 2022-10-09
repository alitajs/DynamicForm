import * as React from 'react';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import Form from 'rc-field-form';
import NomarRadio from '../index';
import BasicTest from './demos/basic';
import SingleText from './demos/single';

const radioList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
];
const myProps = {
  type: 'redio',
  title: '上学',
  fieldProps: 'goToSchool',
  required: true,
  data: radioList,
};

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarRadio {...myProps} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('否'));
  await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicTest onFinish={onFinish} onFinishFailed={onFinishFailed} />,
  );
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
  expect(getByText('发票')).toBeDefined();
  // 判断是否选择
  fireEvent.click(getAllByText('否')[0]);
  await waitFor(() => {
    expect(getAllByText('否')[0].parentNode?.firstChild).toHaveClass(
      'alitajs-dform-radio-checked',
    );
  });
  //不可选中
  fireEvent.click(getByText('晴'));
  await waitFor(() => {
    expect(getByText('雨').parentNode?.firstChild).toHaveClass(
      'alitajs-dform-radio-checked',
    );
  });
  fireEvent.click(getAllByText('是')[1]);
  fireEvent.click(getByText('宫保鸡丁'));
  fireEvent.click(getByText('宫保鸡丁'));
  fireEvent.click(getByText('宫保鸡丁'));
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
});

test('single basic', async () => {
  const onChange = jest.fn();
  const { getByText, getAllByText } = render(
    <SingleText onChange={onChange} />,
  );

  // with default value
  expect(getByText('女')).parentNode?.firstChild.toHaveClass(
    'litajs-dform-radio-checked',
  );

  // onchange
  fireEvent.click(getAllByText('男')[0]);
  expect(onChange).toBeCalled();
  expect(getByText('男')).parentNode?.firstChild.toHaveClass(
    'litajs-dform-radio-checked',
  );
  expect(getByText('女'))
    .parentNode?.firstChild.toHaveClass('litajs-dform-radio-checked')
    .toBeFalsy();

  // console.log after submit
  const consoleSpy = jest.spyOn(console, 'log');
  fireEvent.click(getByText('Submit'));
  expect(consoleSpy).toHaveBeenCalledWith({ value: '1' });
});
