/**
 * title: 动态表单
 * norender: true
 */
import React, { FC, useEffect } from 'react';
import { List } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import Form from 'rc-field-form';
import { Store, FormInstance, ValidateErrorEntity } from 'rc-field-form/es/interface';

import {
  NomarInput,
  NomarPicker,
  NomarSwitch,
  OnlyReadInput,
  NomarTextArea,
  NomarDatePicker,
} from './components';
import useForm from 'rc-field-form/es/useForm';

const FormItemType = {
  input: NomarInput,
  text: OnlyReadInput,
  select: NomarPicker,
  area: NomarTextArea,
  date: NomarDatePicker,
  switch: NomarSwitch,
};

export interface IFormItemProps {
  type: 'input' | 'text' | 'select' | 'area' | 'date';
  title: string;
  fieldProps: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  data?: [];
  inputType?: InputItemPropsType['type'];
  modeType?: DatePickerPropsType['mode'];
}

export interface IDynamicFormProps {
  formsData: IFormItemProps[]; // 动态表单数据
  form: FormInstance; // 表单对象
  formsValues?: Store;
  allDisabled?: boolean; // 全部不可交互，展示状态
  onFinish?: (values: Store) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
}

const DynamicForm: FC<IDynamicFormProps> = ({
  children,
  formsData,
  form,
  allDisabled = false,
  formsValues,
  onFinish,
  onFinishFailed,
}) => {
  useEffect(() => {
    form.setFieldsValue(formsValues as Store);
  }, [formsValues]);
  const getFormItem = (formItem: IFormItemProps, allDisabled: boolean) => {
    const { type, disabled = allDisabled, ...otherProps } = formItem;
    const FormItemComponent = FormItemType[formItem.type];
    return <FormItemComponent {...otherProps} key={formItem.fieldProps} disabled={disabled} />;
  };
  return (
    <Form
      form={form}
      name="basic"
      initialValues={formsValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <List>{formsData.map(item => getFormItem(item, allDisabled))}</List>
      {children}
    </Form>
  );
};

export default DynamicForm;
