/**
 * title: 基础 多行文本输入框
 * desc: 只读，不可编辑
 */

import React from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarTextArea from '..';

const NomarArea = () => (
  <Form>
    <List>
      <NomarTextArea
        fieldProps="textArea2"
        title="有标题"
        placeholder="只读，不可编辑"
        rows={3}
        editable={false}
      />
    </List>
  </Form>
);

export default NomarArea;
