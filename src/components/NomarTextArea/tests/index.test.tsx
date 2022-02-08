import * as React from 'react';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import Form from 'rc-field-form';
import DformTextArea from '..';
import BasicText from './demos/basic';

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
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const { getByText } = render(
    <BasicText
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={onChange}
      onBlur={onBlur}
    />,
  );
  expect(getByText('学校概况')).toBeDefined();
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
    expect(getByText('请输入备注')).toBeDefined();
  });

  const school: any =
    getByText('备注')?.parentNode?.parentNode?.childNodes[1]?.lastChild
      ?.lastChild;
  fireEvent.change(school, { target: { value: '我的学校很漂亮' } });

  expect(onChange).toBeCalled();
  await waitFor(() => {
    expect(getByText('我的学校很漂亮')).toBeDefined();
  });

  //判断textarea标签有readonly属性
  expect(
    getByText('只读，不可编辑，不存在点击事件').getAttribute('readonly') === '',
  ).toBe(true);
  expect(
    getByText('只读，不可编辑，存在点击事件').getAttribute('readonly') === '',
  ).toBe(true);

  const blus: any =
    getByText('公司简介（字数统计）').parentNode?.parentNode?.lastChild
      ?.lastChild?.childNodes[0];
  blus.focus();
  blus.blur();
  expect(onBlur).toBeCalled();
  const limit: any =
    getByText('公司简介（字数限制）').parentNode?.parentNode?.lastChild
      ?.childNodes[0];
  fireEvent.change(limit, { target: { value: '123' } });
  await waitFor(() => {
    expect(getByText('3/10')).toBeDefined();
  });

  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
});
