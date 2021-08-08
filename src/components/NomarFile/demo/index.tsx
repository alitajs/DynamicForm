/* eslint-disable no-console */
/**
 * title: 基础 文件上传
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, {
  IFormItemProps,
  useForm,
  Store,
  ValidateErrorEntity,
  getRandom,
} from '@alitajs/dform';

const contractList = [
  { title: '合约模板2020.pdf', fileId: '1' },
  { title: '电子协议模板2020.pdf', fileId: '2' },
];

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

  const formsData = [
    {
      type: 'file',
      required: true,
      fieldProps: 'contract',
      title: '合同',
      onClick: (res: any) => {
        console.log(res);
      },
      onChange: (res: any, delItem: any) => {
        console.log(res, delItem);
      },
      alias: {
        id: 'fileId',
      },
      upload: (res: any) => {
        const list = form.getFieldsValue().contract || [];
        if (res && res.length) {
          res.map((item: any) => {
            list.push({
              title: item.name,
              fileId: getRandom(),
            });
          });
        }
        form.setFieldsValue({
          contract: list,
        });
      },
    },
  ] as unknown as IFormItemProps[];

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues: {
      contract: contractList,
    },
    isDev: false,
  };

  return (
    <>
      <DynamicForm {...formProps} />
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

export default Page;
