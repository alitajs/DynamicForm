/**
 * title: 基础 Modal
 * desc: 只读，不可编辑
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import NomarInput from '..';
import Form from 'rc-field-form';

const Age: FC = () => {
  return (
    <Form>
      <List>
        <NomarInput
          fieldProps="userAge"
          placeholder="这里只读不可编辑"
          title="年龄"
          inputType="text"
          editable={false}
        />
      </List>
    </Form>
  );
};

export default Age;
