/**
 * title: 基础 多行文本输入框
 * desc: 右边注释
 */
import React from 'react';
import { List } from 'antd-mobile';
import Form from 'rc-field-form';
import NomarTextArea from '..';
import PhotoIcon from '../../../assets/photo.png';

const photoImg = () => {
  return (
    <img src={PhotoIcon} style={{ width: '3rem', height: '2rem' }} onClick={e => console.log(e)} />
  );
};

const ExtraArea = () => {
  return (
    <Form>
      <List>
        <NomarTextArea
          fieldProps="idenPhone"
          title="身份证"
          placeholder="存在 extra 自动换行"
          required
          extra={photoImg()}
        />
      </List>
    </Form>
  );
};

export default ExtraArea;
