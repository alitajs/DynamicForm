/**
 * title: 基础 Modal
 * desc: extra 可以自定义样式，并且可设置点击事件
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import NomarInput from '..';
import Form from 'rc-field-form';
import PositionIcon from '../../../assets/position_ico.png';

const NodeExtraClick: FC = () => {
  const extraImg = () => {
    return <img src={PositionIcon} onClick={e => console.log(e)} />;
  };

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
