import * as React from 'react';
import { render, testA11y, fireEvent, waitFor } from '@alita/test';
import Form from 'rc-field-form';
import NomarSwitch from '../index';
import BasicTest from './demos/basic';

const myProps = {
  fieldProps: 'on',
  placeholder: '选择',
  title: 'On',
}

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarSwitch  {...myProps} />
      </Form>
    </div>
  );
  fireEvent.click(getByText('On'));
  // await testA11y(container);
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicTest onFinish={onFinish} onFinishFailed={onFinishFailed} />
  );
  expect(getByText('Off')).toBeDefined();
  fireEvent.click(getByText("Submit"));
  await waitFor(() => {
    expect(onFinish).toBeCalled();
  });
  expect(getByText("Off").parentNode?.firstChild).toHaveClass('alitajs-dform-redStar');
  //判断是否是必选
  const OnClick: any = getByText("On").parentNode?.parentNode?.lastChild?.firstChild;
  expect(OnClick.firstChild.getAttribute('value')).toBe('on');
  fireEvent.click(OnClick);
  await waitFor(() => {
    expect(OnClick.firstChild.getAttribute('value')).toBe("off");
  });
  //判断是否可点击
  const disabledOn: any = getByText('Disabled On').parentNode?.parentNode?.lastChild?.firstChild;
  fireEvent.click(disabledOn)
  await waitFor(() => {
    expect(disabledOn.firstChild.getAttribute('value')).toBe("on");
  })
})