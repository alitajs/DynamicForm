/**
 * title: 基础 输入框
 * desc: 单独使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import { DformTextArea } from '@alitajs/dform';

const Page: FC = () => {
  const [value, setValue] = useState<string | undefined>('123');
  return (
    <>
      <DformTextArea
        fieldProps="text"
        title="文本框"
        placeholder="请输入"
        required
        value={value}
        onChange={(str: string | undefined) => {
          setValue(str);
        }}
      />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => console.log({ value })}>
        Submit
      </Button>
    </>
  );
};

export default Page;
