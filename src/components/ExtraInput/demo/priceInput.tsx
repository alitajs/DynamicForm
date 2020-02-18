/**
 * title: 基础 复杂输入框
 * desc: 价格输入框
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import ExtraInput from '..';

const PriceInput: FC = () => (
  <Form>
    <List>
      <ExtraInput
        fieldProps="minPrise"
        fieldProps2="maxPrise"
        title="价格区间(数字输入)"
        placeholder="输入最小价格"
        placeholder2="输入最大价格"
        required
        inputType="number"
        labelNumber={8}
        extra="¥"
      />
    </List>
  </Form>
);

export default PriceInput;
