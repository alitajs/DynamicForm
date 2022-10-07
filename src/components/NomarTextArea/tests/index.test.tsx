import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import DformTextArea from '../index';
import BasicText from './demos/basic';
import SingleText from './demos/single';

const mtProps = {
  type: 'area',
  title: '学校概况',
  fieldProps: 'textArea0',
  placeholder: '支持输入值过长自动换行',
  rows: 1,
  autoHeight: true,
};

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <DformTextArea {...mtProps} />
      </Form>
    </div>,
  );
  fireEvent.click(getByText('学校概况'));
  await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onBlur = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicText
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onBlur={onBlur}
    />,
  );
  expect(getByText('学校概况')).toBeDefined();
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
    expect(getByText('请输入身份证')).toBeDefined();
  });

  const school: any =
    getByText('学校概况')?.parentNode?.parentNode?.parentNode?.lastChild
      ?.lastChild;
  fireEvent.change(school, { target: { value: '我的学校很漂亮' } });

  await waitFor(() => {
    expect(getByText('我的学校很漂亮')).toBeDefined();
  });
  //判断textarea标签有readonly属性
  expect(getByText('只读，不可编辑').getAttribute('readonly') === '').toBe(
    true,
  );

  const blus: any =
    getAllByText('标题文字内容过长')[1].parentNode?.parentNode?.parentNode
      ?.lastChild?.lastChild;
  blus.focus();
  blus.blur();
  expect(onBlur).toBeCalled();

  const titleLong: any =
    getAllByText('标题文字内容过长')[1].parentNode?.parentNode?.parentNode
      ?.lastChild?.lastChild;
  fireEvent.change(titleLong, { target: { value: '标题文字内容过长' } });

  const ID: any =
    getAllByText('身份证')[1].parentNode?.parentNode?.parentNode?.lastChild
      ?.lastChild;

  expect(ID.getAttribute('placeholder') === '存在 extra 自动换行').toBe(true);

  fireEvent.change(ID, { target: { value: '身份证' } });
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
});

test('single basic', async () => {
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const { getAllByText } = render(
    <SingleText onChange={onChange} onBlur={onBlur} />,
  );
  const area: any =
    getAllByText('文本框')[0].parentNode?.parentNode?.parentNode?.lastChild
      ?.lastChild;
  expect(area.getAttribute('placeholder') === '请输入').toBe(true);
  expect(area).toHaveValue('123');

  area.focus();
  area.blur();
  expect(onBlur).toBeCalled();

  fireEvent.change(area, { target: { value: 'test' } });
  expect(onChange).toBeCalled();
  area.blur();
  expect(area).toHaveValue('test');
});
