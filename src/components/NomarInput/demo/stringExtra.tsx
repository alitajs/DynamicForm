/**
 * title: 基础 Modal
 * desc: 文字类型的extra
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import NomarInput from '..';
import Form from 'rc-field-form';

const StringExtra: FC = () => {
  return (
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
};

export default StringExtra;
