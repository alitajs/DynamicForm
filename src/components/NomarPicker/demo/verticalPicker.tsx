/**
 * title: 基础 Select
 * desc: 垂直选择框
 */
import React, { FC } from 'react';
import NomarPicker from '..';
import Form from 'rc-field-form';
import { List } from 'antd-mobile';
const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

const VerticalPicker: FC = () => {
  return (
    <Form>
      <List>
        <NomarPicker
          fieldProps="userPicker4"
          title="季节"
          placeholder="请选择"
          data={seasons}
          positionType="vertical"
        />
      </List>
    </Form>
  );
};

export default VerticalPicker;
