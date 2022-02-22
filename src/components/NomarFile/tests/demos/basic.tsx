import React from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, { getRandom, DformFile, WhiteSpace } from '../../../..';
import { useForm } from 'rc-field-form';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
  onMyClick: any;
  isPc?: boolean;
}
let forms: any;

const NomarFileTestPage: React.FC<BasicProps> = ({
  onFinish,
  onFinishFailed,
  onMyClick,
  isPc = false,
}) => {
  const [form] = useForm();
  forms = form;
  const contractList = [
    { title: '房子买卖协议.pdf', fileId: '1' },
    { title: '房屋租赁合同说明书.pdf', fileId: '2' },
  ];
  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues: {
      contract: contractList,
    },
    isDev: false,
    isPc,
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <DformFile
          // type='file'
          required={true}
          fieldProps="contract"
          title="合同"
          onClick={(res: any) => {
            onMyClick();
          }}
          onChange={(res: any, delItem: any) => {}}
          alias={{
            id: 'fileId',
            title: 'title',
          }}
          maxLength={2}
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
export default { NomarFileTestPage, forms };
