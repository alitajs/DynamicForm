/* eslint-disable no-console */
/**
 * title: 基础 文件上传
 * desc: 表单使用 demo
 */
import React, { FC } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  getRandom,
  DformFile,
  WhiteSpace,
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

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues: {
      contract: contractList,
    },
    isDev: false,
    // isPc: true,
  };

  return (
    <>
      <DynamicForm {...formProps}>
        <DformFile
          required
          fieldProps="contract"
          title="合同"
          onClick={(res: any) => {
            console.log(res);
          }}
          maxLength={3}
          onChange={(res: any, delItem: any) => {
            console.log(res, delItem);
          }}
          alias={{
            id: 'fileId',
            title: 'title',
          }}
          upload={(res: any) => {
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
          }}
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

export default Page;
