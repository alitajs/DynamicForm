import * as React from 'react';
import {
  render,
  testA11y,
  fireEvent,
  waitFor,
  sleep,
  getAllByTestId,
} from '@alita/test';
import { useForm } from '../../../';
import Form from 'rc-field-form';
import { getRandom } from '../../../index';
import NomarFile from '../index';
import TestPage from './demos/basic';

const NomarFileTestPage = TestPage.NomarFileTestPage;
const form = TestPage.forms;
const contractList = [
  { title: '合约模板2020.pdf', fileId: '1' },
  { title: '电子协议模板2020.pdf', fileId: '2' },
];

const myProps = {
  required: true,
  title: '合同',
  fieldProps: 'contract',
  formsValues: {
    contract: contractList,
  },
  onClick: (res: any) => {
    // console.log(res);
  },
  onChange: (res: any, delItem: any) => {
    // console.log(res, delItem);
  },
  alias: {
    id: 'fileId',
    title: 'title',
  },
  upload: (res: any) => {
    const list = form.getFieldsValue().contract || [];
    if (res && res.length) {
      res.map((item: any) => {
        list.push({
          title: item.name,
          fileId: getRandom(),
        });
      });
    }
    form.setFieldsValue({
      contract: list,
    });
  },
};

it('passes file a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarFile {...myProps} />
      </Form>
    </div>,
  );
  // fireEvent.click(getByText('未知合同1'));
  await testA11y(container);
});

test('passes file basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onMyClick = jest.fn();
  const { getByText } = render(
    <NomarFileTestPage
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onMyClick={onMyClick}
    />,
  );
  expect(getByText('合同')).toBeDefined();
  expect(getByText('房子买卖协议.pdf')).toBeDefined();
  fireEvent.click(getByText('房子买卖协议.pdf'));
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onMyClick).toBeCalled();
    expect(onFinish).toBeCalled();
  });
  expect(document.querySelectorAll('.alitajs-dform-file-input').length).toBe(0); // 判断文件上传数量大小限制
  fireEvent.click(getByText('房子买卖协议.pdf').parentNode?.lastChild!);
  await sleep(500);
  expect(document.querySelectorAll('.alitajs-dform-file-input').length).toBe(1);
  fireEvent.click(getByText('房屋租赁合同说明书.pdf').parentNode?.lastChild!);
  await sleep(500);

  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
});
test('passes file pc basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  const onMyClick = jest.fn();
  const { getByText } = render(
    <NomarFileTestPage
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onMyClick={onMyClick}
      isPc
    />,
  );
  expect(getByText('合同')).toBeDefined();
  expect(getByText('房子买卖协议.pdf')).toBeDefined();
  fireEvent.click(getByText('房子买卖协议.pdf'));
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onMyClick).toBeCalled();
    expect(onFinish).toBeCalled();
  });
  expect(document.querySelectorAll('.alitajs-dform-file-input').length).toBe(0); // 判断文件上传数量大小限制
  fireEvent.click(getByText('房子买卖协议.pdf').parentNode?.lastChild!);
  await sleep(500);
  expect(document.querySelectorAll('.alitajs-dform-file-input').length).toBe(1);
  fireEvent.click(getByText('房屋租赁合同说明书.pdf').parentNode?.lastChild!);
  await sleep(500);

  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
});
