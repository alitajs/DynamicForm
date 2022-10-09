import React, { useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import { DformRadio } from '@alitajs/dform';

const Page: React.FC = () => {
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
      <DformRadio
        fieldProps="radio"
        title="性别"
        placeholder="请选择"
        required
        data={dataSource}
        defaultValue={value}
        onChange={(gender) => {
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
