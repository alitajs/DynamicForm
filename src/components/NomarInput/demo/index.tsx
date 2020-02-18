/**
 * title: 基础 输入框
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

const Page: FC<PageProps> = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const extraImg = () => <img src={PositionIcon} />;

  const photoImg = () => <img src={PhotoIcon} style={{ width: '3rem', height: '2rem' }} />;

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
      fieldProps: 'userTitle',
      required: true,
      placeholder: '',
      title: '标题',
      editable: false,
      // eslint-disable-next-line no-console
      onClick: () => console.log('点击事件'),
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
      clear: true,
    },
    {
      type: 'input',
      fieldProps: 'cardNumber',
      required: true,
      placeholder: '请输入',
      title: '身份证号码',
      inputType: 'text',
      clear: true,
      positionType: 'vertical',
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
    data: formsData,
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
