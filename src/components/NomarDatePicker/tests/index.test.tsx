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

  expect(getByText('2020-02-03'));
  fireEvent.click(getByText('2020-02-03'));
  fireEvent.click(getByText('取消'));
  expect(getByText('2020-02-03'));

  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinish).toBeCalled();
});
