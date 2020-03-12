/**
 * title: 基础 输入框
 * desc: 垂直方向的输入框
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarInput from '..';

const VerticalInput: FC = () => (
  <Form>
    <List>
      <NomarInput
        fieldProps="cardNumber"
        required
        placeholder="请输入"
        title="身份证号码"
        inputType="text"
        clear
        positionType="vertical"
        rules={[
          { required: true, message: `请输入` },
          {
            pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, 'g'),
            message: '名称只允许包含数字、字母和下划线',
          },
        ]}
      />
    </List>
  </Form>
);

export default VerticalInput;
