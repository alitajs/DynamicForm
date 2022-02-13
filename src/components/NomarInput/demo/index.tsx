/**
 * title: 基础 输入框
 * desc: 表单使用 demo
 */
import React, { FC, useState, useEffect } from 'react';
import { Button } from 'antd-mobile-v2';
import Form from 'rc-field-form';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformInput,
  WhiteSpace,
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
      <DformInput fieldProps="username" title="用户名" />
    </>
  );
};

export default Page;
