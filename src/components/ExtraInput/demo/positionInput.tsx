/**
 * title: 基础 复杂输入框
 * desc: 位置输入框
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import PositionIcon from '../../../assets/position_ico.png';
import ExtraInput from '..';

// eslint-disable-next-line no-console
const extraImg = () => <img src={PositionIcon} onClick={e => console.log(e)} />;

const PositionInput: FC = () => (
  <Form>
    <List>
      <ExtraInput
        fieldProps="minPosition"
        fieldProps2="maxPosition"
        title="位置区间"
        placeholder="选择最小位置"
        placeholder2="选择最大位置"
        required
        inputType="text"
        extra={extraImg()}
      />
    </List>
  </Form>
);

export default PositionInput;
