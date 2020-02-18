/**
 * title: 基础 多行文本输入框
 * desc: 标题文字内容过长
 */
import React from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarTextArea from '..';

const NomarArea = () => (
  <Form>
    <List>
      <NomarTextArea
        fieldProps="titleTooLong"
        required
        placeholder="请输入..."
        title="标题文字内容过长"
        labelNumber={8}
      />
    </List>
  </Form>
);

export default NomarArea;
