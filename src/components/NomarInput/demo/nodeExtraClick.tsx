/**
 * title: 基础 输入框
 * desc: extra 可以自定义样式，并且可设置点击事件
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import PositionIcon from '../../../assets/position_ico.png';
import NomarInput from '..';

const NodeExtraClick: FC = () => {
  const extraImg = () => <img src={PositionIcon} />;

  return (
    <Form>
      <List>
        <NomarInput
          fieldProps="userPosition"
          required
          placeholder="请定位"
          title="定位"
          editable={false}
          extra={extraImg()}
        />
      </List>
    </Form>
  );
};

export default NodeExtraClick;
