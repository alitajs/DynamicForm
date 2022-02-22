import * as React from 'react';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import Form from 'rc-field-form';
import NomarMultiplePicker from '..';
import BasicTest from './demos/basic';
import SingleTest from './demos/single';

const cityData = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '福州', value: 'fuzhou' },
];

const props = {
  fieldProps: 'myCity',
  required: true,
  data: cityData,
  title: '我喜欢的城市',
  labelNumber: 7,
  placeholder: '请选择我喜欢的城市',
};

it('passes multiplepicker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarMultiplePicker {...props} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('请选择我喜欢的城市'));
  await testA11y(container);
});

test('render multiplePicker Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onChange = jest.fn();
  const { getByText } = render(
    <BasicTest
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={onChange}
    />,
  );
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinishFailed).toBeCalled();
  fireEvent.click(getByText('请选择我喜欢的食物111'));
  fireEvent.click(getByText('取消'));
  fireEvent.click(getByText('请选择我喜欢的食物111'));
  fireEvent.click(getByText('宫保鸡丁'));
  await waitFor(() => {
    expect(getByText('宫保鸡丁')?.parentElement?.lastChild).toHaveClass(
      'alitajs-dform-tick',
    );
  });
  fireEvent.click(getByText('确定'));
  expect(onChange).toBeCalled();
  await waitFor(() => {
    expect(getByText('宫保鸡丁')).toHaveClass('alitajs-dform-text-item-text');
  });
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinish).toBeCalled();
});
test('render multiplePicker pc Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onChange = jest.fn();
  const { getByText } = render(
    <BasicTest
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={onChange}
      isPc
    />,
  );
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinishFailed).toBeCalled();
  expect(getByText('我喜欢的食物').parentNode).toHaveClass(
    'alitajs-dform-pc-title-label',
  );
  expect(
    getByText('选择你喜欢的食物(不可编辑)')?.parentNode?.parentNode,
  ).toHaveClass('alitajs-dform-pc-vertical-title');

  expect(document.querySelectorAll('.ant-select-disabled').length).toBe(1);
});
test('render multiplePicker single Basic', async () => {
  const onChange = jest.fn();
  const { getByText } = render(<SingleTest onChange={onChange} />);
  expect(getByText('食物')).toBeDefined();
  expect(getByText('宫保鸡丁')).toBeDefined();
  fireEvent.click(getByText('宫保鸡丁'));
  fireEvent.click(getByText('可乐鸡翅'));
  fireEvent.click(getByText('确定'));
  expect(onChange).toBeCalled();
  expect(getByText('宫保鸡丁,可乐鸡翅')).toBeDefined();
});
