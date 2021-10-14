/**
 * title: 基础 输入框
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformInput,
} from '@alitajs/dform';
import PositionIcon from '../../../assets/position_ico.png';
import PhotoIcon from '../../../assets/photo.png';
import PwdIcon from '../../../assets/look.png';

const Page: FC = () => {
  const [form] = useForm();
  const [pwdInputType, setPwdInputType] = useState<boolean>(true);
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const extraImg = () => <img src={PositionIcon} style={{ width: '0.5rem' }} />;

  const photoImg = () => (
    <img src={PhotoIcon} style={{ width: '1rem', height: '0.5rem' }} />
  );

  const subTitle = () => <div style={{ color: 'red' }}>此为必填项(副标题)</div>;

  const pwdImg = () => (
    <img
      style={{ width: '0.6rem' }}
      src={PwdIcon}
      onClick={() => {
        setPwdInputType(!pwdInputType);
      }}
    />
  );

  const formsValues = {
    userAge: '这里只读不可编辑',
    username4: '点击图标事件',
    username6: '存在点击事件',
    userTitle: '点击获取表单全部数据',
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    isDev: false,
  };

  return (
    <>
      <DynamicForm {...formProps}>
        <DformInput
          fieldProps="username"
          required
          clear
          placeholder="输入项居左"
          title="用户名"
          subTitle={subTitle()}
          coverStyle={{ textAlign: 'left' }}
          onChange={(e) => console.log(e)}
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
          fieldProps="titleTooLong"
          title="标题名称过长"
          placeholder="请输入"
          labelNumber={7}
          inputType="text"
          clear
        />
        <DformInput
          fieldProps="defaultValue"
          title="设置默认值"
          placeholder="请输入"
          extra={extraImg()}
          defaultValue="这是默认值"
        />
        <DformInput
          fieldProps="username5"
          title="身份证"
          placeholder="请输入身份证"
          extra={photoImg()}
          inputType="number"
        />
        <DformInput
          fieldProps="userTitle"
          title="标题"
          placeholder="点击获取表单全部数据"
          editable={false}
          onClick={() => console.log(form.getFieldsValue())}
        />
        <DformInput
          fieldProps="cardNumber"
          title="身份证号码(增加规则)"
          required
          placeholder="请输入"
          labelNumber={7}
          inputType="text"
          clear
          positionType="vertical"
          rules={[
            {
              pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, 'g'),
              message: '名称只允许包含数字、字母和下划线',
            },
          ]}
        />
        <DformInput
          fieldProps="subTitle"
          title="副标题"
          placeholder="请输入"
          labelNumber={7}
          inputType="text"
          clear
          subTitle={subTitle()}
          positionType="vertical"
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
