/**
 * title: 基础 多行文本输入框
 * desc: 表单使用 demo
 */
import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformTextArea,
  WhiteSpace,
} from '@alitajs/dform';
import PhotoIcon from '../../../assets/photo.png';

const Page: FC = () => {
  const [form] = useForm();

  const [singleUse, setSingleUse] = useState<string>('小明');

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
    setDisabled: '只读，不可编辑，不存在点击事件',
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
        <DformTextArea
          title="学校概况"
          fieldProps="autoSize"
          placeholder="允许设置行数区间"
          rows={2}
          autoSize={{
            minRows: 2,
            maxRows: 5,
          }}
          labelNumber={7}
        />
        <DformTextArea
          fieldProps="setEditable"
          title="不可编辑状态"
          defaultValue="只读，不可编辑，存在点击事件"
          editable={false}
          labelNumber={7}
          required
          onClick={(e) => console.log(e)}
        />
        <DformTextArea
          fieldProps="setDisabled"
          title="禁用状态"
          disabled
          onClick={(e) => console.log(e)}
          labelNumber={7}
        />
        <DformTextArea
          fieldProps="numLimit"
          placeholder="请输入..."
          title="公司简介（字数限制）"
          labelNumber={8}
          showCount
          maxLength={10}
        />
        <DformTextArea
          fieldProps="numTotal"
          placeholder="请输入..."
          title="公司简介（字数统计）"
          positionType="vertical"
          labelNumber={8}
          showCount
        />
        <DformTextArea
          fieldProps="remarks"
          title="备注"
          placeholder="请输入"
          required
          positionType="vertical"
          extra={photoImg()}
          rows={4}
          coverStyle={{
            background: 'rgb(247, 246, 249)',
            boxSizing: 'border-box',
            padding: '0.1rem',
          }}
          onChange={(e) => console.log(e)}
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
      <h1>单独使用</h1>
      <DformTextArea
        fieldProps="a"
        required
        placeholder="请输入"
        title="用户名"
        onChange={(e: string) => setSingleUse(e)}
        defaultValue={singleUse}
        showCount
        maxLength={10}
      />
    </>
  );
};

export default Page;
