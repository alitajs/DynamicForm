/**
 * title: 基础 NomarImagePicker
 * desc: 表单使用 demo
 */

import React from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';

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

const Page = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const formsData = [
    {
      type: 'image',
      fieldProps: 'insertImg',
      title: '请添加图片(自动压缩)',
      required: true,
      compressRatio: 0.5,
      onChange: (files: any, type: string, index: number | undefined) => {
        // eslint-disable-next-line no-console
        console.log(files, type, index);
      },
    },
    {
      type: 'image',
      fieldProps: 'showImg',
      title: '展示图片(限制上传的图片大小)',
      // disableDelete: true,
      onImageClick: (index: number, files: any) => {
        // eslint-disable-next-line no-console
        console.log(index, files);
      },
      limitSize: 3 * 1024 * 1024,
    },
    {
      type: 'image',
      fieldProps: 'noInsertImg',
      title: '不可添加图片',
      required: true,
      selectable: false,
    },
  ] as IFormItemProps[];

  const formsValues = {
    // insertImg: fileList,
    showImg: fileList,
    noInsertImg: fileList,
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    isDev: true,
  };

  return (
    <>
      <DynamicForm {...formProps} />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
