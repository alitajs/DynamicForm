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

const { Group } = DynamicForm;

const Page: FC = () => {
  const [form] = useForm();
  const [pwdInputType] = useState<boolean>(true);
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const subTitle = () => <div style={{ color: 'red' }}>此为必填项(副标题)</div>;

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
        <Group>
          <DformInput
            fieldProps="username"
            required
            clear
            placeholder="输入项居左"
            title="用户名"
            subTitle={subTitle()}
            coverStyle={{ textAlign: 'left' }}
          />
        </Group>
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
          defaultValue="这是默认值"
        />
        <DformInput
          fieldProps="username5"
          title="身份证"
          placeholder="请输入身份证"
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
            { required: true, message: `请输入身份证号码` },
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
