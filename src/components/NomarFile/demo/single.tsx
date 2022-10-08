/* eslint-disable no-console */
/**
 * title: 基础 文件上传
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import { getRandom, DformFile } from '@alitajs/dform';

const contractList = [
  { title: '合约模板2020.pdf', fileId: '1' },
  { title: '电子协议模板2020.pdf', fileId: '2' },
];

const Page: FC = () => {
  const [fileValue, setFileValue] = useState(contractList);
  return (
    <>
      <DformFile
        required
        fieldProps="contract"
        title="合同"
        onClick={(res: any) => {
          console.log(res);
        }}
        defaultValue={fileValue}
        maxLength={3}
        onChange={(res: any, delItem: any) => {
          console.log(res, delItem);
          setFileValue(res);
        }}
        alias={{
          id: 'fileId',
          title: 'title',
        }}
        upload={(res: any) => {
          const list = [...fileValue];
          if (res && res.length) {
            res.map((item: any) => {
              list.push({
                title: item.name,
                fileId: getRandom(),
              });
            });
          }
          setFileValue(list);
        }}
      />
      <WhiteSpace size="lg" />
      <Button
        type="primary"
        onClick={() => {
          console.log(fileValue);
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default Page;
