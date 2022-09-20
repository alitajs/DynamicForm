/**
 * title: 基础 时间选择框
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile-v2';
import { DformDatePicker } from '../../../../index';

interface SingleProps {}

const Page: FC<SingleProps> = () => {
  const [value, setValue] = useState<string | Date | undefined>(
    '2022年01月01日',
  );
  return (
    <div>
      <DformDatePicker
        fieldProps=""
        fieldName="Date"
        modeType="date"
        formFlag={false}
        title="Date"
        defaultValue={value}
        onChange={(e) => setValue(e)}
        replaceName={{
          [`年`]: '-',
          [`月`]: '-',
          [`日`]: '',
        }}
      />
      <Button onClick={() => setValue('2022-01-02')}>changeValue</Button>
    </div>
  );
};

export default Page;
