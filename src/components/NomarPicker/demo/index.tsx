/**
 * title: Select
 */
import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import { Field, useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';

import DynamicForm, { IFormItemProps } from '../../../DynamicForm';

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

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
  ]
]

interface PageProps {}

const Page: FC<PageProps> = props => {
  const [form] = useForm();
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  }
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log(errorInfo);
  }
  const formsData = [
    {
      type: 'select',
      fieldProps: 'userPicker1',
      title: '季节',
      placeholder: '请选择',
      data: seasons,
    },
    {
      type: 'select',
      fieldProps: 'userPicker2',
      required: true,
      title: '城市',
      placeholder: '请选择',
      data: citys,
    },
    {
      type: 'select',
      fieldProps: 'userPicker3',
      required: true,
      title: '城市(不可编辑)',
      placeholder: '请选择',
      data: citys,
      disabled: true,
    }
  ] as IFormItemProps[];

  const formsValues = {
    userPicker2: ['厦门'],
    userPicker3: ['福州'],
  }

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
    formsData,
  }

  return (
    <DynamicForm {...formProps}>
      <WhiteSpace size="sm" />
      <Field {...tailLayout}>
        <Button type="primary" onClick={() => form.submit()}>
          Submit
        </Button>
      </Field>
    </DynamicForm>
  )
}

export default Page;