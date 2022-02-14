import React, { useState, FC } from 'react';
import DynamicForm, { DformInput, useForm } from '../../../..';
import PwdIcon from '../../../../assets/look.png';
import PhotoIcon from '../../../../assets/photo.png';
interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  clickBlur: any;
}

const Page: FC<BasicProps> = ({ onFinish, onFinishFailed, clickBlur }) => {
  const [form] = useForm();
  const [pwdInputType, setPwdInputType] = useState<boolean>(false);
  const [formsValues, setFormsValues] = useState<any>({
    username: 'this is dform',
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

  const photoImg = () => (
    <img
      src={PhotoIcon}
      data-testid="photoId"
      style={{ width: '40px', height: '20px' }}
    />
  );

  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    failScroll: false,
    isPc: true,
  };
  return (
    <div>
      <DynamicForm {...formProps}>
        <DformInput
          fieldProps="username"
          required
          clear
          placeholder="输入项居左"
          title="用户名"
          coverStyle={{ textAlign: 'left' }}
          onChange={(e) => console.log(e)}
        />
        <DformInput
          fieldProps="userPwd"
          title="请设置密码"
          placeholder="请输入"
          extra={pwdImg()}
          inputType={pwdInputType ? 'password' : 'text'}
        />
        <DformInput
          fieldProps="username5"
          title="身份证"
          placeholder="请输入身份证"
          inputType="number"
          onBlur={clickBlur}
        />
        <DformInput
          fieldProps="cardNumber"
          title="身份证号码(增加规则)"
          required
          placeholder="请输入"
          labelNumber={7}
          inputType="text"
          clear
          extra={photoImg()}
          positionType="vertical"
          rules={[
            {
              pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, 'g'),
              message: '名称只允许包含数字、字母和下划线',
            },
          ]}
        />
        <DformInput
          fieldProps="userTitle"
          title="标题"
          placeholder="点击获取表单全部数据"
          editable={false}
          onClick={() => console.log(form.getFieldsValue())}
        />
      </DynamicForm>
      <button onClick={() => form.submit()}>submit</button>
    </div>
  );
};

export default Page;
