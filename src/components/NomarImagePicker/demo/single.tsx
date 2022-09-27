import React, { useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import { DformImagePicker } from '@alitajs/dform';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onChange: any;
  onImageClick: any;
}

const fileList = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  },
];

const Page: React.FC<BasicProps> = ({}) => {
  const [value, setValue] = useState<any[]>(fileList);

  return (
    <>
      <DformImagePicker
        fieldProps="insertImg"
        title="请添加图片"
        required
        defaultValue={value}
        onChange={(files: any) => {
          setValue(files);
        }}
      />
      <WhiteSpace />
      <Button onClick={() => console.log({ value })}>值</Button>
    </>
  );
};
export default Page;
