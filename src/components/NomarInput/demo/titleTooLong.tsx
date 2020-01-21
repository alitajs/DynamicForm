/**
 * title: 基础 输入框
 * desc: 标题名称过长
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import NomarInput from '..';
import Form from 'rc-field-form';

const TitleTooLong: FC = () => {
  return (
    <Form>
      <List>
        <NomarInput
          fieldProps="usernameTooLong"
          required
          placeholder="请输入"
          title="标题名称过长"
          inputType="text"
          labelNumber={7}
          clear={true}
        />
      </List>
    </Form>
  );
};

export default TitleTooLong;
