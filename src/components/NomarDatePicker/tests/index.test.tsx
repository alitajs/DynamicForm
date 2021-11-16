import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import NomarDatePiker from '..';
import BasicTest from './demos/basic';
import dayjs from 'dayjs';

const props = {
  fieldProps: 'Date',
  required: true,
  title: 'Date',
};

it('passes datepicker test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarDatePiker {...props} modeType="date" />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('Date'));
  await testA11y(container);
});

test('render Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onChange = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicTest
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={onChange}
    />,
  );
  const newTime = new Date();
  let year: string = newTime.getFullYear() + '';
  let month: string = newTime.getMonth() + 1 + '';
  const dataTime = dayjs(newTime).format('YYYY-MM-DD HH:mm');
  expect(getByText(dataTime)).toBeDefined();
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
  expect(getByText(dayjs(new Date()).format('YYYY-MM-DD')));
  await waitFor(() => {
    expect(
      getAllByText(dayjs(new Date()).format('YYYY-MM-DD'))[0].parentNode
        ?.firstChild,
    ).toHaveClass('alitajs-dform-disabled');
  });
  // expect(onFinishFailed).toBeCalled();
  fireEvent.click(getByText('请选择月份'));
  fireEvent.click(getByText('取消'));
  fireEvent.click(getByText('请选择月份'));
  fireEvent.click(getByText('确认'));
  expect(onChange).toBeCalled();
  await waitFor(() => {
    expect(getByText(dayjs(new Date()).format('YYYY-MM'))).toHaveClass(
      'alitajs-dform-text-item-text',
    );
  });
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
  fireEvent.click(getAllByText('请选择')[0]);
  await waitFor(() => {
    expect(getByText('取消')).toBeDefined;
  });
  fireEvent.click(getAllByText('请选择')[0]);
  await waitFor(() => {
    expect(getByText('时间(date)')).toBeDefined;
    fireEvent.click(getByText('确认'));
  });
  await waitFor(() => {
    expect(getAllByText(dataTime)[1]).toHaveClass(
      'alitajs-dform-text-item-text',
    );
  });
  fireEvent.click(getAllByText('请选择')[0]);
  await waitFor(() => {
    expect(getByText(parseInt(month) + 1 + '月')).toBeDefined();
    fireEvent.click(getByText('确认'));
  });
  fireEvent.click(getAllByText('请选择')[0]);
  await waitFor(() => {
    expect(getByText(parseInt(year) + 1 + '年')).toBeDefined();
    fireEvent.click(getByText('确认'));
  });
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinish).toBeCalled();
});
