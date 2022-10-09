import React, { useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import NomarRadio from '../../';

interface BasicProps {
  onChange: (val: string) => void;
}

const Page: React.FC<BasicProps> = ({ onChange }) => {
  const dataSource = [
    {
      label: '男',
      value: '1',
    },
    {
      label: '女',
      value: '0',
    },
  ];
  const [value, setValue] = useState<string | undefined>('0');

  return (
    <>
      <NomarRadio
        fieldProps="radio"
        title="性别"
        placeholder="请选择"
        required
        data={dataSource}
        defaultValue={value}
        onChange={(gender) => {
          onChange(gender as string);
          setValue(gender as string);
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
