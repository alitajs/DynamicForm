/**
 * title: 基础 多行文本输入框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import DynamicForm, { IFormItemProps } from '../../../DynamicForm';
import PhotoIcon from '../../../assets/photo.png';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

const Page: FC = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const photoImg = () => <img src={PhotoIcon} style={{ width: '3rem', height: '2rem' }} />;

  const formsData = [
    {
      type: 'area',
      fieldProps: 'textArea1',
      required: true,
      placeholder: '请输入...',
      title: '公司简介',
      positionType: 'horizontal',
    },
    {
      type: 'area',
      fieldProps: 'textArea2',
      title: '有标题',
      placeholder: '只读，不可编辑',
      rows: 3,
      editable: false,
    },
    {
      type: 'area',
      fieldProps: 'titleTooLong',
      title: '标题文字内容过长',
      placeholder: '请输入',
      labelNumber: 8,
      required: true,
      coverStyle: {
        border: '1px solid #108ee9',
        background: '#fff',
      },
    },
    {
      type: 'area',
      fieldProps: 'Remarks',
      title: '备注',
      placeholder: '请输入',
      required: true,
    },
    {
      type: 'area',
      fieldProps: 'idenPhone',
      title: '身份证',
      extra: photoImg(),
      placeholder: '存在 extra 自动换行',
      required: true,
    },
  ] as IFormItemProps[];

  const formsValues = {};

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
