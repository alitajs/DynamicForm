import React from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm, { getRandom } from '../../../../index';
import { useForm } from 'rc-field-form';
import NomarTextArea from '../../';
import PhotoIcon from '../../../../assets/photo.png';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onBlur: any;
}

const NomarTextAreaTestPage: React.FC<BasicProps> = ({
  onFinish,
  onFinishFailed,
  onBlur,
}) => {
  const [form] = useForm();
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
  const photoImg = () => (
    <img src={PhotoIcon} style={{ width: '1rem', height: '0.5rem' }} />
  );

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
          fieldProps="textArea2"
          title="有标题"
          placeholder="只读，不可编辑"
          positionType="vertical"
          rows={3}
          editable={false}
        />
        <NomarTextArea
          fieldProps=""
          fieldName="titleTooLong"
          title="标题文字内容过长"
          placeholder="请输入"
          positionType="vertical"
          labelNumber={8}
          required={true}
          onBlur={onBlur}
          coverStyle={{
            border: '1px solid #108ee9',
            background: 'rgb(247, 246, 249)',
            boxSizing: 'border-box',
          }}
        />
        <NomarTextArea
          fieldProps="idenPhone"
          title="身份证"
          extra={photoImg()}
          positionType="vertical"
          placeholder="存在 extra 自动换行"
          required={true}
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
