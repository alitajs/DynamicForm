import React, { useState, FC } from 'react';
import { DformTextArea } from '../../../..';
interface SingleProps {
  onChange: any;
}

const Page: FC<SingleProps> = ({ onChange }) => {
  const [val, setVal] = useState<string>('');

  return (
    <div>
      <DformTextArea
        fieldProps="username"
        required
        placeholder="输入项居左"
        title="用户名"
        onChange={(e) => {
          setVal(e);
          onChange();
        }}
        defaultValue={val}
      />
    </div>
  );
};

export default Page;
