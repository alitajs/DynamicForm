/**
 * title: 基础 文本展示框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';
import PhotoIcon from '../../../assets/photo.png';

const Page: FC = () => {
  const [form] = useForm();

  const photoImg = () => <img src={PhotoIcon} style={{ width: '3rem', height: '2rem' }} />;

  const subTitle = () => <div style={{ color: 'red' }}>此为必填项(副标题)</div>;

  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const formsData = [
    {
      type: 'text',
      fieldProps: 'username',
      required: true,
      placeholder: '输入项居左',
      title: '用户名',
      clear: true,
      subTitle: subTitle(),
      coverStyle: {
        textAlign: 'left',
      },
      onClick: () => {
        console.log();
      },
    },
    {
      type: 'text',
      fieldProps: 'area',
      required: true,
      title: '学校概况',
      placeholder: '值过长会自动换行',
      rows: 1,
      autoHeight: true,
    },
    {
      type: 'text',
      fieldProps: 'username5',
      required: true,
      title: '身份证',
      extra: photoImg(),
      inputType: 'number',
      onClick: (vals: string) => {
        // eslint-disable-next-line no-console
        console.log(vals);
      },
    },
    {
      type: 'text',
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
      type: 'text',
      fieldProps: 'titleTooLong',
      required: true,
      placeholder: '请输入',
      title: '标题名称过长',
      labelNumber: 7,
      inputType: 'text',
      clear: true,
    },
    {
      type: 'text',
      fieldProps: 'titleTooLong2',
      required: true,
      placeholder: '请输入',
      title: '标题名称过长(超过14个字符自动换行)',
      inputType: 'text',
      extra: photoImg(),
      clear: true,
    },
  ] as IFormItemProps[];

  const formsValues = {
    userAge: '这里只读不可编辑',
    username5: 'disabled 为 true, 则 onClick 失效',
    userTitle: '点击获取表单全部数据',
    area: '值过长会自动换行',
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
