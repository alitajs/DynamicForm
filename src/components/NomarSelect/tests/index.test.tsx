import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import NomarSelect from '../index';
import BasicText from './demos/basic'
import CoupletText from './demos/couplet'

// //选择季节
const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

const myProps = {
  type: 'select',
  fieldProps: 'userPicker1',
  title: '季节',
  placeholder: '请选择',
  data: seasons,
}

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarSelect  {...myProps} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('请选择'));
  await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicText onFinish={onFinish} onFinishFailed={onFinishFailed} />
  );
  //第一个选择季节
  fireEvent.click(getAllByText("请选择")[0]);
  fireEvent.click(getByText("取消"));
  fireEvent.click(getAllByText("请选择")[0]);
  expect(getByText('确定')).toHaveClass("am-picker-popup-header-right");
  fireEvent.click(getByText('2013'))
  fireEvent.click(getByText('春'))
  fireEvent.click(getByText('确定'));
  await waitFor(() => {
    expect(getByText("2013,春")).toHaveClass("alitajs-dform-text-item-text")
  })
  //选择城市
  fireEvent.click(getByText("Submit"));
})

test('render couplet', async () => {
  const { getByText } = render(<CoupletText />);
  expect(getByText('请选择延迟赋值'));
  await sleep(1100);
  expect(getByText('上海'));
  fireEvent.click(getByText('delayValue值改为北京'));
  expect(getByText('北京'));
  fireEvent.click(getByText('请选择改值后及联'));
  fireEvent.click(getByText('确定'));
  expect(getByText('福州'));
  await sleep(2100);
  expect(getByText('杭州'));
});

