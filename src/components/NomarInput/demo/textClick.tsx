/**
 * title: 基础 Modal
 * desc: 存在文本点击事件
 */
import React, { FC } from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarInput from '..';

const TextClick: FC = () => {
  return (
    <Form>
      <List>
        <NomarInput
          fieldProps="userTitle"
          required
          placeholder="存在点击事件"
          title="标题"
          onClick={e => console.log(e)}
          editable={false}
        />
      </List>
    </Form>
  );
};

export default TextClick;
