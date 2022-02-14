import React, { useState, FC } from 'react';
import { DformInput } from '../../../..';
import PwdIcon from '../../../../assets/look.png';
interface BasicProps {
  onChange: any;
  onBlur: any;
  onFocus: any;
}

const Page: FC<BasicProps> = ({ onChange, onBlur, onFocus }) => {
  const [pwdInputType, setPwdInputType] = useState<boolean>(false);
  const [val, setVal] = useState<string>('123');

  const pwdImg = () => (
    <img
      data-testid="pwdId"
      style={{ width: '0.6rem' }}
      src={PwdIcon}
      onClick={() => {
        setPwdInputType(!pwdInputType);
      }}
    />
  );

  return (
    <DformInput
      fieldProps="userPwd"
      title="请设置密码"
      placeholder="请输入"
      extra={pwdImg()}
      defaultValue={val}
      inputType={pwdInputType ? 'password' : 'text'}
      onChange={(e: string) => {
        setVal(e);
        onChange();
      }}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default Page;
