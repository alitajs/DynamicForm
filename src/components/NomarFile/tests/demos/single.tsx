/* eslint-disable no-console */
/**
 * title: 基础 文件上传
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import getRandom from '../../';
import DformFile from '../../';

const contractList = [{ title: '个人简历模板2020.pdf', fileId: '1' }];
interface pageProps {
  onSubmit?: () => void;
}

const Page: FC<pageProps> = (props) => {
  const { onSubmit } = props;
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
          if (onSubmit) onSubmit();
          else console.log(fileValue);
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default Page;
