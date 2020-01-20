/**
 * title: 基础 Radio
 * desc: 只读，不可选
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
const OnlyRead: FC = () => {
  return (
    <Form>
      <List>
        <NomarRadio
         fieldProps= 'userRadio3'
         required= {true}
         data= {radioList}
         title="发票"
         disabled={true}
        />
      </List>
    </Form>
  );
};

export default OnlyRead;