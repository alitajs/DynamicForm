/**
 * title: 基础 输入框
 * desc: 单独使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import { DformInput } from '@alitajs/dform';

const Page: FC = () => {
  const [inputValue, setInputValue] = useState<string>('1');
  return (
    <>
      <DformInput
        fieldProps="a"
        required
        clear
        placeholder="请输入"
        title="用户名"
        onChange={(e: any) => setInputValue(e)}
        defaultValue={inputValue}
      />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => console.log({ inputValue })}>
        Submit
      </Button>
    </>
  );
};

export default Page;
