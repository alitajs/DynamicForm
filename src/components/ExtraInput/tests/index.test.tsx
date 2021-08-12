import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import BasicTest from './demos/basic';
import ExtraInput from '../index';

const myProps = {
  fieldProps: 'minPrise',
  fieldProps2: 'maxPrise',
  title: '价格区间(数字输入)',
  firstProps: { placeholder: '输入最小价格' },
  secondProps: { extra: '¥', placeholder: '输入最大价格' },
  required: true,
};
it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <ExtraInput {...myProps} />
      </Form>
    </div>,
  );
  await testA11y(container);
});

test("renders Basic", async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText, getByLabelText } = render(
    <BasicTest onFinish={onFinish} onFinishFailed={onFinishFailed} />
  );
  expect(getByLabelText('minPrise')).toHaveValue('11');
  fireEvent.change(getByLabelText('minPrise'), { target: { value: '12' } });
  expect(getByLabelText('minPosition')).toHaveValue('');
  fireEvent.change(getByLabelText('minLength'), { target: { value: '10' } });
  expect(getByLabelText('minLength')).toHaveValue('10');
  await waitFor(() => {
    fireEvent.click(getByText('Submit'));
  });
  expect(onFinish).toBeCalled();
  fireEvent.change(getByLabelText('price'), { target: { value: '40' } });
  expect(getByLabelText('price')).toHaveValue('40');
  fireEvent.click(getByText('选择区间'));
  await waitFor(() => {
    fireEvent.click(getByText("取消"))
  })
  fireEvent.click(getByText('选择区间'));
  await waitFor(() => {
    expect(getByText("确定")).toBeDefined()
    fireEvent.click(getByText("元"))
    fireEvent.click(getByText("确定"))
  })
  fireEvent.click(getByText('元'));
  await waitFor(() => {
    fireEvent.click(getByText("万元"))
    fireEvent.click(getByText("确定"))
    expect(getByText("万元")).toBeDefined();
  })
  const focu = getByLabelText('minLength');
  focu.focus();
  await waitFor(() => {
    expect(getByLabelText("minLength").parentNode).toHaveClass(
      "alitajs-dform-input-item-focus"
    )
  })
  focu.blur();
  fireEvent.click(getByText("选择长度单位"))
  await waitFor(() => {
    expect(getByText("确定")).toBeDefined();
    fireEvent.click(getByText('百元'));
    fireEvent.click(getByText('确定'))
  })
  await sleep(500)
  fireEvent.click(getByText("百元"))
  await waitFor(() => {
    expect(getByText("确定")).toBeDefined();
    fireEvent.click(getByText('千元'));
    fireEvent.click(getByText('确定'))
    expect(getByText("千元")).toBeDefined();
  })

})
