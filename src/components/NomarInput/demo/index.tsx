/**
 * title: 基础 输入框
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformInput,
} from '@alitajs/dform';
import PositionIcon from '../../../assets/position_ico.png';
import PhotoIcon from '../../../assets/photo.png';
import PwdIcon from '../../../assets/look.png';

const { Group } = DynamicForm;

const Page: FC = () => {
  const [form] = useForm();
  const [pwdInputType, setPwdInputType] = useState<boolean>(true);
  const [editFlag, setEditFlag] = useState<boolean>(false);
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
    username: 'this is dform',
    userTitle: '点击获取表单全部数据',
    allTooLong:
      '欢迎使用 dform 动态表单欢迎使用 dform 动态表单欢迎使用 dform 动态表单欢迎使用 dform 动态表单欢迎使用 dform 动态表单欢迎使用 dform 动态表单',
    valueTooLong:
      '欢迎使用 dform 动态表单欢迎使用 dform 动态表单欢迎使用 dform 动态表单欢迎使用 dform 动态表单欢迎使用 dform 动态表单欢迎使用 dform 动态表单',
    titleTooLong: '11',
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
        <Group type="card" title="输入类型">
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
            extra={photoImg()}
            inputType="number"
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
        </Group>
        <Group
          type="card"
          title="显示类型"
          rightView={
            <div
              style={{ fontSize: '0.3rem' }}
              onClick={() => setEditFlag(!editFlag)}
            >
              点击切换是否可编辑
            </div>
          }
        >
          <DformInput
            fieldProps="userTitle"
            title="标题"
            placeholder="点击获取表单全部数据"
            editable={editFlag}
            onClick={() => console.log(form.getFieldsValue())}
          />
          <DformInput
            fieldProps="allTooLong"
            required
            title="标题很长内容也很长"
            placeholder="暂无数据"
            labelNumber={7}
            maxLine={2}
            editable={editFlag}
          />
          <DformInput
            fieldProps="valueTooLong"
            required
            title="内容过长隐藏"
            placeholder="暂无数据"
            labelNumber={7}
            maxLine={2}
            editable={editFlag}
          />
          <DformInput
            fieldProps="titleTooLong"
            required
            title="标题很长，内容很短(labelNumber 设置为8)"
            placeholder="暂无数据"
            labelNumber={8}
            editable={editFlag}
          />
        </Group>
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
