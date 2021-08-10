import React, { useState, FC } from 'react';
import DynamicForm, { DformInput, useForm } from '../../../..';
import PwdIcon from '../../../../assets/look.png';
interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  clickBlur: any;
}

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed, clickBlur }) => {
  const [form] = useForm();
  const [pwdInputType, setPwdInputType] = useState<boolean>(false);
  const [formsValues, setFormsValues] = useState<any>({
    userAge: '这里只读不可编辑',
  });

  const pwdImg = () => (
    <img
      data-testid="pwdId"
      style={{ width: '0.6rem' }}
      src={PwdIcon}
      onClick={() => {
        setPwdInputType(!pwdInputType);
        setFormsValues({
          ...formsValues,
          userPwd: '654321',
        });
      }}
    />
  );

  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    failScroll: false,
  };
  return (
    <div>
      <DynamicForm {...formProps}>
        <DformInput
          fieldProps="username"
          title="用户名"
          placeholder="请输入用户名"
          required
        />
        <DformInput
          fieldProps="defaultValue"
          title="设置默认值"
          placeholder="请输入"
          defaultValue="这是默认值"
        />
        <DformInput
          fieldProps="userAge"
          title="年龄"
          placeholder="请输入"
          editable={false}
          inputType="text"
          clear
        />
        <DformInput
          fieldProps="userPwd"
          title="请设置密码"
          placeholder="请输入"
          extra={pwdImg()}
          inputType={pwdInputType ? 'password' : 'text'}
        />
        <DformInput
          fieldProps="userBlur"
          title="失焦"
          placeholder="请输入"
          onBlur={clickBlur}
        />
      </DynamicForm>
      <button onClick={() => form.submit()}>submit</button>
    </div>
  );
};

export default Page;
