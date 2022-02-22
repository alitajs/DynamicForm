import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import DformPicker from '../../NomarPicker';
import BasicTest from './demos/basic';
import CoupletTest from './demos/couplet';
import PcTest from './demos/pc';
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

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <DformPicker {...props} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('请选择我喜欢的城市'));
  await testA11y(container);
});

test('render picker Basic', async () => {
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
  expect(getByText('福州')).toBeDefined();
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinishFailed).toBeCalled();
  fireEvent.click(getByText('请选择我喜欢的城市placeholder'));
  fireEvent.click(getByText('取消'));
  fireEvent.click(getByText('请选择我喜欢的城市placeholder'));
  fireEvent.click(getByText('确定'));
  expect(onChange).toBeCalled();
  await waitFor(() => {
    expect(getByText('深圳')).toHaveClass('alitajs-dform-text-item-text');
  });
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinish).toBeCalled();
  fireEvent.click(getByText('不可点击'));
});

test('render picker couplet', async () => {
  const { getByText } = render(<CoupletTest />);
  expect(getByText('请选择延迟赋值'));
  await sleep(1100);
  expect(getByText('上海')).toBeDefined();
  fireEvent.click(getByText('delayValue值改为北京'));
  expect(getByText('北京')).toBeDefined();
  fireEvent.click(getByText('请选择改值后及联'));
  fireEvent.click(getByText('确定'));
  expect(getByText('福州')).toBeDefined();
  await sleep(2100);
  expect(getByText('杭州')).toBeDefined();
  fireEvent.click(getByText('设不存在的值'));
  expect(getByText('请选择延迟赋数据源'));
});

test('render picker Pc', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onChange = jest.fn();
  const { getByText } = render(
    <PcTest
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={onChange}
    />,
  );
  expect(getByText('福州')).toBeDefined();
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinishFailed).toBeCalled();
  fireEvent.click(getByText('请选择我喜欢的城市placeholder'));
  fireEvent.click(getByText('深圳'));
  fireEvent.click(getByText('不可点击'));
});
test('render picker single', async () => {
  const onChange = jest.fn();
  const { getByText } = render(<SingleTest onChange={onChange} />);
  expect(getByText('城市')).toBeDefined();
  fireEvent.click(getByText('请选择我喜欢的城市placeholder'));
  fireEvent.click(getByText('确定'));
  expect(onChange).toBeCalled();
  fireEvent.click(getByText('北京'));
});
