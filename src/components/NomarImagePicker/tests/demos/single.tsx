import React, { useState } from 'react';
import { DformImagePicker } from '../../../..';

interface SingleProps {
  onChange: any;
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

const Page: React.FC<SingleProps> = ({ onChange }) => {
  const [singleUse, setSingleUse] = useState<any[]>(fileList);

  return (
    <DformImagePicker
      fieldProps="a"
      title="图片"
      required
      defaultValue={singleUse}
      onChange={(files: any) => {
        setSingleUse(files);
        onChange();
      }}
    />
  );
};
export default Page;
