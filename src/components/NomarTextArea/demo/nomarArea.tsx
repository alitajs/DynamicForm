/**
 * title: 基础 多行文本输入框
 * desc: 基础控件
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarTextArea from '..';

const NomarArea = () => {
  return (
    <Form>
      <List>
        <NomarTextArea
          fieldProps="textArea1"
          required={true}
          placeholder="请输入..."
        />
      </List>
    </Form>
  );
};

export default NomarArea;
