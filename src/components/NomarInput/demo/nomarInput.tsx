/**
 * title: 基础 输入框
 * desc: 输入框
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarInput from '..';

const UserName: FC = () => (
  <Form>
    <List>
      <NomarInput
        fieldProps="username"
        required
        placeholder="请输入"
        title="用户名"
        inputType="text"
        clear
        coverStyle={{
          textAlign: 'left',
        }}
      />
    </List>
  </Form>
);

export default UserName;
