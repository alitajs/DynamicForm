/**
 * title: 基础 复杂输入框
 * desc: 垂直样式，输入长度区间
 */

import React, { FC } from 'react';
import { List } from 'antd-mobile';
import ExtraInput from '..';
import Form from 'rc-field-form';

const VerticalExtraInput: FC = () => {
  return (
    <Form>
      <List>
        <ExtraInput
          fieldProps="minLength"
          fieldProps2="maxLength"
          title="长度区间"
          placeholder="输入长度"
          placeholder2="输入长度"
          positionType="vertical"
          required
        />
      </List>
    </Form>
  );
};

export default VerticalExtraInput;
