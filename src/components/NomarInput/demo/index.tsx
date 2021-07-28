/**
 * title: 基础 输入框
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
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

  const formsData = [
    {
      type: 'input',
      fieldProps: 'username',
      required: true,
      placeholder: '输入项居左',
      title: '用户名',
      inputType: 'bankCard',
      clear: true,
      subTitle: subTitle(),
      coverStyle: {
        textAlign: 'left',
      },
    },
    {
      type: 'input',
      fieldProps: 'userAge',
      required: true,
      placeholder: '请输入',
      title: '年龄',
      // editable: false,
      inputType: 'text',
      clear: true,
    },
    {
      type: 'area',
      fieldProps: 'area',
      required: true,
      title: '学校概况',
      placeholder: '支持输入值过长自动换行',
      rows: 1,
      autoHeight: true,
    },
    {
      type: 'input',
      fieldProps: 'userPwd',
      required: true,
      title: '请设置密码',
      extra: pwdImg(),
      inputType: pwdInputType ? 'password' : 'text',
    },
    {
      type: 'input',
      fieldProps: 'userPrice',
      required: true,
      placeholder: '0.00',
      title: '价格',
      extra: '¥',
      inputType: 'number',
    },
    {
      type: 'input',
      fieldProps: 'userPosition',
      required: true,
      placeholder: '请定位',
      title: '定位',
      extra: extraImg(),
      inputType: 'number',
    },
    {
      type: 'input',
      fieldProps: 'username5',
      required: true,
      placeholder: '',
      title: '身份证',
      extra: photoImg(),
      inputType: 'number',
    },
    {
      type: 'input',
      fieldProps: 'userTitle',
      required: true,
      placeholder: '点击获取表单全部数据',
      title: '标题',
      editable: false,
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log(form.getFieldsValue());
      },
    },
    {
      type: 'input',
      fieldProps: 'titleTooLong',
      required: true,
      placeholder: '请输入',
      title: '标题名称过长',
      labelNumber: 7,
      inputType: 'text',
      clear: true,
    },
    {
      type: 'input',
      fieldProps: 'titleTooLong2',
      required: true,
      placeholder: '请输入',
      title: '标题名称过长(超过14个字符自动换行)',
      inputType: 'text',
      extra: photoImg(),
      clear: true,
    },
    {
      type: 'input',
      fieldProps: 'cardNumber',
      required: true,
      placeholder: '请输入',
      title: '身份证号码(增加规则)',
      inputType: 'text',
      clear: true,
      subTitle: subTitle(),
      positionType: 'vertical',
      rules: [
        { required: true, message: `请输入` },
        {
          pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, 'g'),
          message: '名称只允许包含数字、字母和下划线',
        },
      ],
    },
  ] as IFormItemProps[];
  const formsValues = {
    userAge: '这里只读不可编辑',
    username4: '点击图标事件',
    username6: '存在点击事件',
    userTitle: '点击获取表单全部数据',
    userPwd: '123456',
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    isDev: true,
  };
  return (
    <>
      <DynamicForm {...formProps} />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Page;
