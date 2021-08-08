/**
 * title: 基础 多行文本输入框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
} from '@alitajs/dform';
import PhotoIcon from '../../../assets/photo.png';

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

  const photoImg = () => (
    <img src={PhotoIcon} style={{ width: '1rem', height: '0.5rem' }} />
  );

  const formsData = [
    {
      type: 'area',
      title: '学校概况',
      fieldProps: 'textArea0',
      placeholder: '支持输入值过长自动换行',
      rows: 1,
      autoHeight: true,
    },
    {
      type: 'area',
      fieldProps: 'textArea1',
      required: true,
      placeholder: '请输入...',
      title: '公司简介',
    },
    {
      type: 'area',
      fieldProps: 'textArea2',
      title: '有标题',
      placeholder: '只读，不可编辑',
      positionType: 'vertical',
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
        background: 'rgb(247, 246, 249)',
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
      positionType: 'vertical',
      placeholder: '存在 extra 自动换行',
      required: true,
    },
  ] as IFormItemProps[];

  const formsValues = {
    textArea2: '只读，不可编辑',
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    isDev: false,
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
