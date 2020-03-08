/**
 * title: NomarImagePicker
 * desc: 基础 insertImage
 */
import React, { FC, useEffect } from 'react';
import { List } from 'antd-mobile';
import Form, { useForm } from 'rc-field-form';
import NomarImagePicker from '..';

const dataList = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  },
];

const InsertImage: FC = () => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      insertImg: dataList,
    });
  }, []);

  return (
    <Form form={form}>
      <List>
        <NomarImagePicker fieldProps="insertImg" required title="请添加图片" />
      </List>
    </Form>
  );
};

export default InsertImage;
