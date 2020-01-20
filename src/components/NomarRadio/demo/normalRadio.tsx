/**
 * title: 基础 Radio
 * desc: 按钮
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import NomarRadio from '..';
import Form from 'rc-field-form';
const radioList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
];
const NormalRedio: FC = () => {
  return (
    <Form>
      <List>
        <NomarRadio
          fieldProps='userRadio1'
          required={true}
          data={radioList}
          title= '发票'
        />
      </List>
    </Form>
  );
};

export default NormalRedio;