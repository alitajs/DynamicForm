/**
 * title: 基础 开关控件
 * desc: 基础控件
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarSwitch from '..';

const Off: FC = () => (
  <Form>
    <List>
      <NomarSwitch fieldProps="off" placeholder="选择" title="Off" required />
    </List>
  </Form>
);

export default Off;
