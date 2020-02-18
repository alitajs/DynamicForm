/**
 * title: 基础 开关控件
 * desc: 设置不可编辑状态
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarSwitch from '..';

const DisabledOff: FC = () => (
  <Form>
    <List>
      <NomarSwitch
        fieldProps="disabledOff"
        placeholder="选择"
        title="Disabled Off"
        required
        disabled
      />
    </List>
  </Form>
);

export default DisabledOff;
