import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile-v2';
import DynamicForm, { IFormItemProps } from '../../../../';
import { useForm } from 'rc-field-form';
import DformSelect from '../../';

interface BasicProps {
  onFinish: any;
  onFinishFailed: any;
}
const Page: FC<BasicProps> = ({ onFinish, onFinishFailed }) => {
  const [form] = useForm();
  //选择季节
  const seasons = [
    [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ],
    [
      {
        label: '春',
        value: '春',
      },
      {
        label: '夏',
        value: '夏',
      },
    ],
  ];
  //选择城市
  const citys = [
    [
      {
        label: '福州',
        value: '福州',
      },
      {
        label: '厦门',
        value: '厦门',
      },
    ],
  ];

  const myProps = {
    type: 'select',
    fieldProps: 'userPicker1',
    title: '季节',
    placeholder: '请选择',
    data: seasons,
  };
  const formsValues = {
    userPicker2: ['厦门'],
    // userPicker3: ['福州'],
  };

  const formsData = [
    {
      type: 'select',
      fieldProps: 'userPicker1',
      title: '季节',
      placeholder: '请选择',
      data: seasons,
      maxLine: 1,
    },
    {
      type: 'select',
      fieldProps: 'userPicker2',
      required: true,
      title: '城市(不可编辑)',
      placeholder: '请选择',
      data: citys,
      disabled: true,
      maxLine: 1,
    },
  ] as IFormItemProps[];

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    autoLineFeed: false,
    isDev: true,
  };

  return (
    <>
      <DynamicForm {...formProps}>
        <DformSelect
          type="select"
          fieldProps="userPicker1"
          title="季节"
          placeholder="请选择"
          data={seasons}
          maxLine={1}
          cascade={false}
        />
        <DformSelect
          type="select"
          fieldProps=""
          fieldName="userPicker3"
          required={true}
          title="城市(不可编辑)"
          placeholder="请选择"
          data={citys}
          disabled={true}
          cascade={false}
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
