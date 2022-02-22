import React, { FC, useState } from 'react';
import { DformPicker } from '../../../..';

interface SingleProps {
  onChange: any;
}

const cityList = [
  {
    label: '北京',
    value: 'beijing',
  },
  {
    label: '上海',
    value: 'shanghai',
  },
  {
    label: '福州',
    value: 'fuzhou',
  },
];

const Single: FC<SingleProps> = ({ onChange }) => {
  const [singleUse, setSingleUse] = useState<string | number>('');
  return (
    <DformPicker
      fieldProps="a"
      required
      title="城市"
      data={cityList}
      labelNumber={7}
      defaultValue={singleUse}
      placeholder="请选择我喜欢的城市placeholder"
      onChange={(e) => {
        setSingleUse(e);
        onChange();
      }}
    />
  );
};

export default Single;
