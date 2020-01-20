/**
 * title: 基础 Modal
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

import DynamicForm, { IFormItemProps } from '../../../DynamicForm';
import PositionIcon from '../../../assets/position_ico.png';
import PhotoIcon from '../../../assets/photo.png';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

interface PageProps {}

const Page: FC<PageProps> = props => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const extraImg = () => {
    return <img src={PositionIcon} onClick={e => console.log(e)} />;
  };

  const photoImg = () => {
    return <img src={PhotoIcon} style={{ width: '3rem', height: '2rem' }} onClick={e => console.log(e)} />
  }

  const formsData = [
    {
      type: 'input',
      fieldProps: 'username',
      required: true,
      placeholder: '请输入',
      title: '用户名',
      inputType: 'text',
      clear: true,
    },
    {
      type: 'input',
      fieldProps: 'userAge',
      required: true,
      placeholder: '请输入',
      title: '年龄',
      editable: false,
      inputType: 'text',
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
      fieldProps: 'username6',
      required: true,
      placeholder: '',
      title: '标题',
      editable: false,
      onClick: (e) => console.log(e)
    },
  ] as IFormItemProps[];
  const formsValues = {
    userAge: '这里只读不可编辑',
    username4: '点击图标事件',
    username6: '存在点击事件',
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    formsData,
    formsValues,
    form,
  };
  return (
    <DynamicForm {...formProps}>
      <WhiteSpace size="sm" />
      <Field {...tailLayout}>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </Field>
    </DynamicForm>
  );
};

export default Page;
