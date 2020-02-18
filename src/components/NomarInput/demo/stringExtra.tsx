/**
 * title: 基础 输入框
 * desc: 文字类型的extra
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarInput from '..';

const StringExtra: FC = () => (
  <Form>
    <List>
      <NomarInput
        fieldProps="userPrice"
        required
        placeholder="0.00"
        title="价格"
        extra="¥"
        inputType="number"
      />
    </List>
  </Form>
);

export default StringExtra;
