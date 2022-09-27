import * as React from 'react';
import { render, testA11y, fireEvent, waitFor, sleep } from '@alita/test';
import Form from 'rc-field-form';
import NomarImagePicker from '../index';
import BasicText from './demos/basic';
import SingleText from './demos/single';

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
  expect(
    document.querySelectorAll('.am-image-picker-item-content').length,
  ).toBe(2);
  //判断是否有上传按钮
  expect(document.querySelector('.am-image-picker-upload-btn')).toBeDefined();
});

test('renders Basic', async () => {
  const onFinish = jest.fn();
  const onFinishFailed = jest.fn();
  //点击图片操作
  const onImageClick = jest.fn();
  //图片数量修改时，默认触发的事件
  const onChange = jest.fn();
  const { getByText, getAllByText } = render(
    <BasicText
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onImageClick={onImageClick}
      onChange={onChange}
    />,
  );
  expect(getAllByText('请添加图片(自动压缩)'));
  expect(getByText('不可添加图片')).toBeDefined();
  fireEvent.click(getByText('Submit'));
  await waitFor(() => {
    expect(onFinishFailed).toBeCalled();
  });
  expect(document.querySelectorAll('.am-image-picker-item-remove').length).toBe(
    6,
  );
  //进行删除操作
  fireEvent.click(document.querySelectorAll('.am-image-picker-item-remove')[0]);
  await waitFor(() => {
    expect(
      document.querySelectorAll('.am-image-picker-item-remove').length,
    ).toBe(5);
    expect(onChange).toBeCalled();
  });
  //进行点击图片的操作
  fireEvent.click(
    document.querySelectorAll('.am-image-picker-item-content')[0],
  );
  await waitFor(() => {
    expect(onImageClick).toBeCalled();
  });

  // 判断图片上传数量限制
  expect(document.querySelectorAll('.am-image-picker-upload-btn').length).toBe(
    2,
  );
  fireEvent.click(document.querySelectorAll('.am-image-picker-item-remove')[4]);
  expect(document.querySelectorAll('.am-image-picker-upload-btn').length).toBe(
    3,
  );

  // 点击Submit
  fireEvent.click(document.querySelectorAll('.am-image-picker-upload-btn')[0]);
  await waitFor(() => {
    expect(onChange).toBeCalled();
  });
});

test('renders single', async () => {
  const { getAllByText } = render(<SingleText />);
  expect(getAllByText('请添加图片'));
  expect(document.querySelectorAll('.am-image-picker-item-remove').length).toBe(
    2,
  );
  //进行删除操作
  fireEvent.click(document.querySelectorAll('.am-image-picker-item-remove')[0]);
  expect(document.querySelectorAll('.am-image-picker-item-remove').length).toBe(
    1,
  );
});
