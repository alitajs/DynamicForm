import React, { useState } from 'react';
import NomarImagePicker from '../..';

interface BasicProps {}

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
      <NomarImagePicker
        fieldProps="insertImg"
        title="请添加图片"
        required
        defaultValue={value}
        onChange={(files: any) => {
          setValue(files);
        }}
      />
    </>
  );
};
export default Page;
