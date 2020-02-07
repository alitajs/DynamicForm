/**
 * title: 基础 输入框
 * desc: 垂直方向的输入框
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import NomarInput from '..';
import Form from 'rc-field-form';

const VerticalInput: FC = () => {
  return (
    <Form>
      <List>
        <NomarInput
          fieldProps="cardNumber"
          required
          placeholder="请输入"
          title="身份证号码"
          inputType="text"
          clear={true}
          positionType="vertical"
        />
      </List>
    </Form>
  );
};

export default VerticalInput;
