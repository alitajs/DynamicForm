import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import RangeDatePicker from '../';
import BasicText from './demos/basic';
import dayjs from 'dayjs';

const props = {
  fieldProps: 'rangeTime1',
  fieldProps2: 'rangeTime2',
  title: '时间(datetime)',
  firstProps: {
    onOk: (val: any) => {
      // eslint-disable-next-line no-console
      console.log(val);
    },
  },
};

it('passes picker a11y test', async () => {
  const { container, getAllByText } = render(
    <div>
      <Form>
        <RangeDatePicker {...props} />
      </Form>
    </div>,
  );
  // fireEvent.click(getAllByText('请选择')[0]);
  await testA11y(container);
});

test('render Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicText onFinish={onFinish} onFinishFailed={onFinishFailed} />,
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
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
});
