/**
 * title: 基础 多行文本输入框
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
} from '@alitajs/dform';
import PhotoIcon from '../../../assets/photo.png';
import NomarTextArea from '../';

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

  const formsValues = {
    textArea2: '只读，不可编辑',
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
        <NomarTextArea
          title="学校概况"
          fieldProps="textArea0"
          placeholder="支持输入值过长自动换行"
          rows={1}
          autoHeight={true}
        />
        <NomarTextArea
          fieldProps="textArea1"
          placeholder="请输入..."
          title="公司简介"
        />
        <NomarTextArea
          fieldProps="textArea2"
          title="有标题"
          placeholder="只读，不可编辑"
          positionType="vertical"
          rows={3}
          editable={false}
          required
        />
        <NomarTextArea
          fieldProps="titleTooLong"
          title="标题文字内容过长"
          placeholder="请输入"
          positionType="vertical"
          labelNumber={8}
          coverStyle={{
            border: '1px solid #108ee9',
            background: 'rgb(247, 246, 249)',
            boxSizing: 'border-box',
          }}
        />
        <NomarTextArea
          fieldProps="Remarks"
          title="备注(默认值)"
          placeholder="请输入"
          required
          defaultValue="这里可以设置默认值"
          labelNumber={7}
        />
        <NomarTextArea
          fieldProps="idenPhone"
          title="身份证"
          extra={photoImg()}
          positionType="vertical"
          placeholder="存在 extra 自动换行"
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
