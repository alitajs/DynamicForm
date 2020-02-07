/**
 * title: 基础 Radio
 * desc: 垂直按钮
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import NomarRadio from '..';
import Form from 'rc-field-form';
const dayList = [
  {
    label: '晴',
    value: '晴',
  },
  {
    label: '阴',
    value: '阴',
  },
  {
    label: '雨',
    value: '雨',
  },
];
const VerticalRadio: FC = () => {
  return (
    <Form>
      <List>
        <NomarRadio
          fieldProps="userRadio4"
          required={true}
          data={dayList}
          title="天气情况"
          positionType="vertical"
        />
      </List>
    </Form>
  );
};

export default VerticalRadio;
