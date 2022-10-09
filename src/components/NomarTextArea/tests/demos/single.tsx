import React, { useState } from 'react';
import NomarTextArea from '../../';

interface BasicProps {
  onChange: (val: string | undefined) => void;
  onBlur: (val: string | undefined) => void;
}

const Page: React.FC<BasicProps> = ({ onChange, onBlur }) => {
  const [value, setValue] = useState<string | undefined>('123');

  return (
    <>
      <NomarTextArea
        fieldProps="text"
        title="文本框"
        placeholder="请输入"
        required
        value={value}
        // defaultValue={'000'}
        onChange={(str: string | undefined) => {
          onChange(str);
          setValue(str);
        }}
        onBlur={(str: string | undefined) => {
          onBlur(str);
          setValue(str);
        }}
      />
    </>
  );
};
export default Page;
