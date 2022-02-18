import React, { FC, useState } from 'react';
import { DformSwitch } from '../../../../';

interface SingleProps {
  onChange: any;
}

const Page: FC<SingleProps> = ({ onChange }) => {
  const [vals, setVals] = useState<boolean>(true);
  const change = () => {
    setVals(!vals);
    onChange();
  };
  return (
    <React.Fragment>
      <DformSwitch
        defaultValue={vals}
        fieldProps="off"
        placeholder="选择"
        title="On"
        required
        onChange={change}
      />
    </React.Fragment>
  );
};

export default Page;
