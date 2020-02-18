/**
 * title: 基础 输入框
 * desc: 标题名称过长
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarInput from '..';

const TitleTooLong: FC = () => (
  <Form>
    <List>
      <NomarInput
        fieldProps="usernameTooLong"
        required
        placeholder="请输入"
        title="标题名称过长"
        inputType="text"
        labelNumber={7}
        clear
      />
    </List>
  </Form>
);

export default TitleTooLong;
