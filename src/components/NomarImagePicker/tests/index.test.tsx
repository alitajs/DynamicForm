import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import NomarImagePicker from '../index';
import BasicTest from './demos/basic';

const fileList = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  },
];

const myProps = {
  fieldProps: 'insertImg',
  title: '请添加图片(自动压缩)',
  required: true,
  compressRatio: 0.5,
  onChange: (files: any, type: string, index: number | undefined) => {
    console.log(files, type, index);
  },
  defaultValue: fileList,
};

it('passes picker a11y test', async () => {
  const { container, getByText } = render(
    <div>
      <Form>
        <NomarImagePicker {...myProps} />
      </Form>
    </div>,
  );
  //判断图片数量
  expect(document.querySelectorAll('.alitajs-dform-image-content').length).toBe(
    2,
  );
  //判断是否有上传按钮
  expect(document.querySelector('#alitajs-dform-image-upload')).toBeDefined();
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  //点击图片操作
  const onImageClick = jest.fn();
  //图片数量修改时，默认触发的事件
  const onChange = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicTest
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onImageClick={onImageClick}
      onChange={onChange}
    />,
  );
  expect(getAllByText('请添加图片(自动压缩)')).toBeDefined();
  expect(getByText('不可添加图片')).toBeDefined();
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
  expect(
    document.querySelectorAll('.alitajs-dform-image-cell-delete').length,
  ).toBe(4);
  //进行删除操作
  fireEvent.click(
    document.querySelectorAll('.alitajs-dform-image-cell-delete')[0],
  );
  await waitFor(() => {
    expect(
      document.querySelectorAll('.alitajs-dform-image-cell-delete').length,
    ).toBe(3);
    expect(onChange).toBeCalled();
  });

  // 判断图片上传数量限制
  expect(document.querySelectorAll('.alitajs-dform-image-upload').length).toBe(
    1,
  );
  fireEvent.click(
    document.querySelectorAll('.alitajs-dform-image-cell-delete')[2],
  );
  expect(document.querySelectorAll('.alitajs-dform-image-upload').length).toBe(
    2,
  );
});
