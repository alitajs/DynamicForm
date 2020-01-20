/**
 * title: 基础 Modal
 * desc: 输入框
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import NomarInput from '..';
import Form from 'rc-field-form';

const UserName: FC = () => {
  return (
    <Form>
      <List>
        <NomarInput
          fieldProps="username"
          required
          placeholder="请输入"
          title="用户名"
          inputType="text"
          clear={true}
        />
      </List>
    </Form>
  );
};

export default UserName;
