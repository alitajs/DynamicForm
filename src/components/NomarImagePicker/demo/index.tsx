/**
 * title: 基础 NomarImagePicker
 * desc: 表单使用 demo
 */

import React from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformImagePicker,
  WhiteSpace,
  IDynamicFormProps,
} from '@alitajs/dform';

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

const Page = () => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const formsValues = {
    maxLengthImg: fileList,
  };

  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    isDev: true,
  } as IDynamicFormProps;

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
          positionType="horizontal"
        />
        <DformImagePicker
          fieldProps="showImg"
          title="展示图片(限制上传的图片大小)"
          // disableDelete: true,
          onImageClick={(index: number | undefined, files: any) => {
            // eslint-disable-next-line no-console
            console.log(index, files);
          }}
          limitSize={3 * 1024 * 1024}
          defaultValue={fileList}
          disabled
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
