import React from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, { useForm, DformTextArea, WhiteSpace } from '../../../..';
import PhotoIcon from '../../../../assets/photo.png';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onChange: any;
  onBlur: any;
}

const NomarTextAreaTestPage: React.FC<BasicProps> = ({
  onFinish,
  onFinishFailed,
  onChange,
  onBlur,
}) => {
  const [form] = useForm();
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
  const photoImg = () => (
    <img src={PhotoIcon} style={{ width: '1rem', height: '0.5rem' }} />
  );

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
          onBlur={onBlur}
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
          onChange={onChange}
        />
      </DynamicForm>
      <WhiteSpace size="lg" />
      <Button
        type="primary"
        onClick={() => {
          form.submit();
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default NomarTextAreaTestPage;
