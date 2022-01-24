import React from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, { WhiteSpace, DformImagePicker } from '../../../..';
import { useForm } from 'rc-field-form';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onChange: any;
  onImageClick: any;
}

const Page: React.FC<BasicProps> = ({
  onFinish,
  onFinishFailed,
  onChange,
  onImageClick,
}) => {
  const fileList = [
    {
      url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
      id: '2121',
    },
    {
      url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
      id: '2122',
    },
  ];
  const [form] = useForm();
  const formsValues = {
    maxLengthImg: fileList,
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    form,
    isDev: true,
    formsValues,
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <DformImagePicker
          fieldProps="insertImg"
          title="请添加图片(自动压缩)"
          required
          compressRatio={0.5}
          onChange={(files: any, type: string, index: number | undefined) => {
            // eslint-disable-next-line no-console
            console.log(files, type, index);
          }}
          maxLength={2}
        />
        <DformImagePicker
          fieldProps="showImg"
          title="展示图片(限制上传的图片大小)"
          // disableDelete: true,
          onImageClick={onImageClick}
          limitSize={3 * 1024 * 1024}
          defaultValue={fileList}
          onChange={() => onChange()}
          showView={false}
        />
        <DformImagePicker
          fieldProps="noInsertImg"
          title="不可添加图片"
          required
          selectable={false}
          defaultValue={fileList}
        />
        <DformImagePicker
          fieldProps="maxLengthImg"
          title="限制上传数量(2张)"
          maxLength={2}
          defaultValue={fileList}
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
