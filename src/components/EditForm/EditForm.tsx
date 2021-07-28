// /* eslint-disable no-param-reassign */
// import React, { FC, useState } from 'react';
// import { List, Button, WhiteSpace } from 'antd-mobile';
// import Form, { Field, useForm } from 'rc-field-form';
// import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
// import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
// import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';

// import { IFormItemProps } from '../../DynamicForm';

// import {
//   NomarInput,
//   NomarSelect,
//   NomarSwitch,
//   NomarTextArea,
//   NomarDatePicker,
//   ExtraInput,
//   RangeDatePicker,
//   NomarRadio,
//   CoverRadio,
//   MultiplePicker,
//   NomarImagePicker,
//   NomarCheckBox,
//   NomarText,
//   NomarPicker,
// } from '..';

// const FormItemType = {
//   input: NomarInput,
//   select: NomarSelect,
//   area: NomarTextArea,
//   date: NomarDatePicker,
//   switch: NomarSwitch,
//   radio: NomarRadio,
//   extraInput: ExtraInput,
//   rangeDatePicker: RangeDatePicker,
//   coverRadio: CoverRadio,
//   multiplePicker: MultiplePicker,
//   image: NomarImagePicker,
//   checkbox: NomarCheckBox,
//   text: NomarText,
//   picker: NomarPicker,
// };

// const radioList = [
//   {
//     label: '是',
//     value: 'yes',
//   },
//   {
//     label: '否',
//     value: 'no',
//   },
// ];

// export interface IEditFormProps {
//   data?: IFormItemProps; // 动态表单数据
//   onChange?: (data: any) => void;
// }

// const EditFormItemLabel = {
//   title: '标题',
//   fieldProps: '绑定关键字',
//   required: '是否必填',
//   placeholder: '输入提示',
//   disabled: '是否可编辑',
//   data: '表单数据',
//   inputType: '输入框类型',
//   modeType: '选择器类型',
//   fieldProps2: '副绑定关键字',
//   placeholder2: '副输入提示',
//   extraType: '扩展类型',
//   type: '类型',
//   positionType: '位置',
// };
// // inputType:'text' | 'bankCard' | 'phone' | 'password' | 'number' | 'digit' | 'money';
// // modeType:mode?: 'datetime' | 'date' | 'year' | 'month' | 'time';
// const EditFormItemType = {
//   title: NomarInput,
//   fieldProps: NomarInput,
//   required: NomarSwitch,
//   placeholder: NomarInput,
//   disabled: NomarRadio,
//   data: NomarInput,
//   type: NomarInput,
//   positionType: (props: any) => (
//     <NomarSelect
//       data={[
//         ['horizontal', 'vertical'].map((item: string) => ({
//           value: item,
//           label: item,
//         })),
//       ]}
//       cols={1}
//       {...props}
//     />
//   ),
//   inputType: (props: any) => (
//     <NomarSelect
//       data={[
//         [
//           'text',
//           'bankCard',
//           'phone',
//           'password',
//           'number',
//           'digit',
//           'money',
//         ].map((item: string) => ({
//           value: item,
//           label: item,
//         })),
//       ]}
//       cols={1}
//       {...props}
//     />
//   ),
//   modeType: (props: any) => (
//     <NomarSelect
//       data={[
//         ['datetime', 'date', 'year', 'month', 'time'].map((item: string) => ({
//           value: item,
//           label: item,
//         })),
//       ]}
//       cols={1}
//       {...props}
//     />
//   ),
//   fieldProps2: NomarInput,
//   placeholder2: NomarInput,
//   extraType: (props: any) => (
//     <NomarSelect
//       data={[
//         ['input', 'select'].map((item: string) => ({
//           value: item,
//           label: item,
//         })),
//       ]}
//       cols={1}
//       {...props}
//     />
//   ),
// };

// const getFormItem = (fieldItemKey: string) => {
//   const EditFormItemComponent = EditFormItemType[fieldItemKey];
//   const title = EditFormItemLabel[fieldItemKey];
//   return (
//     <EditFormItemComponent
//       key={`alita-dform-edit-${fieldItemKey}`}
//       fieldProps={fieldItemKey}
//       title={title}
//       editable={fieldItemKey !== 'type'}
//     />
//   );
// };

// const getShowDeitItem = (editData?: IFormItemProps) => {
//   if (!editData) return;
//   let { inputType, modeType, extraType, positionType } = editData as any;
//   const { type, ...otherProps } = editData as any;
//   // 选择类型的初始值要手动转化一下 2/3
//   if (inputType) {
//     inputType = inputType[0] as InputItemPropsType['type'];
//     otherProps.inputType = inputType;
//   }
//   if (modeType) {
//     modeType = modeType[0] as DatePickerPropsType['mode'];
//     otherProps.modeType = modeType;
//   }
//   if (extraType) {
//     extraType = extraType[0] as DatePickerPropsType['mode'];
//     otherProps.extraType = extraType;
//   }
//   if (positionType) {
//     // eslint-disable-next-line prefer-destructuring
//     positionType = positionType[0];
//     otherProps.positionType = positionType;
//   }
//   const ShowItemComponent = FormItemType[type];
//   // eslint-disable-next-line consistent-return
//   return <ShowItemComponent {...otherProps} />;
// };
// export const defaultFailed = (
//   errorInfo: ValidateErrorEntity,
//   onFinishFailed?: (errorInfo: ValidateErrorEntity) => void,
// ) => {
//   if (
//     !errorInfo ||
//     !errorInfo.errorFields ||
//     errorInfo.errorFields.length === 0
//   ) {
//     if (onFinishFailed) {
//       onFinishFailed(errorInfo);
//     }

//     return;
//   }
//   const scrollToField = (fieldKey: any) => {
//     const labelNode = document.getElementById(`aliat-dform-${fieldKey}`);
//     if (labelNode) {
//       labelNode.scrollIntoView(true);
//     }
//   };
//   scrollToField(errorInfo.errorFields[0].name[0]);
//   if (onFinishFailed) onFinishFailed(errorInfo);
// };

// const EditForm: FC<IEditFormProps> = ({ data = [] as any, onChange }) => {
//   const [form] = useForm();
//   // 选择类型的初始值要手动转化一下 1/3
//   if (data.fieldProps) {
//     // 加了随机数
//     data.fieldProps = `${Math.random().toString(36).slice(2, 6)}${
//       data.fieldProps
//     }`;
//   }
//   if (data.fieldProps2) {
//     // 加了随机数
//     data.fieldProps2 = `${Math.random().toString(36).slice(2, 6)}${
//       data.fieldProps2
//     }`;
//   }
//   if (data.inputType) {
//     data.inputType = [data.inputType];
//   }
//   if (data.modeType) {
//     data.modeType = [data.modeType];
//   }
//   if (data.extraType) {
//     data.extraType = [data.extraType];
//   }
//   if (data.positionType) {
//     data.positionType = [data.positionType];
//   }
//   const [editData, setEditData] = useState({ ...data });

//   const onFinish = (values: Store) => {
//     // eslint-disable-next-line no-console
//     console.log('Success:', values);
//     // 选择类型的初始值要手动转化一下 3/3
//     const newFormItem = { ...values };
//     const { inputType, modeType, extraType, type, positionType } = newFormItem;
//     if (inputType && typeof inputType !== 'string') {
//       newFormItem.inputType = inputType[0] as InputItemPropsType['type'];
//     }
//     if (modeType && typeof modeType !== 'string') {
//       newFormItem.modeType = modeType[0] as DatePickerPropsType['mode'];
//     }
//     if (extraType && typeof extraType !== 'string') {
//       newFormItem.extraType = extraType[0] as 'input' | 'select';
//     }
//     if (positionType && typeof positionType !== 'string') {
//       newFormItem.positionType = positionType[0] as
//         | 'inhorizontalput'
//         | 'vertical';
//     }
//     if (
//       type === 'radio' ||
//       type === 'coverRadio' ||
//       type === 'checkbox' ||
//       type === 'picker' ||
//       type === 'multiplePicker'
//     ) {
//       newFormItem.data = radioList;
//     }
//     if (type === 'select' || type === 'extraInput') {
//       newFormItem.data = [radioList];
//     }
//     // newFormItem.type = 'input';
//     if (onChange) onChange(newFormItem);
//   };

//   const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
//     // eslint-disable-next-line no-console
//     console.log('Failed:', errorInfo);
//   };
//   return (
//     <div style={{ textAlign: 'left' }}>
//       <Form>
//         <List renderHeader={() => '效果演示'}>{getShowDeitItem(editData)}</List>
//       </Form>
//       <Form
//         form={form}
//         initialValues={{ ...editData }}
//         onFinish={onFinish}
//         onFinishFailed={(errorInfo: ValidateErrorEntity) =>
//           defaultFailed(errorInfo, onFinishFailed)
//         }
//         onValuesChange={(changFeil) => {
//           const newData = { ...editData, ...changFeil } as IFormItemProps;
//           setEditData(newData);
//         }}
//       >
//         <List renderHeader={() => '编辑数据'}>
//           {Object.keys(data || {})
//             .filter((i) => i !== 'data')
//             // .filter(i => i !== 'type' && i !== 'data')
//             .map((fieldItemKey) => getFormItem(fieldItemKey))}
//         </List>
//         <WhiteSpace size="lg"></WhiteSpace>

//         <Field>
//           <Button type="primary" onClick={() => form.submit()}>
//             完成
//           </Button>
//         </Field>
//       </Form>
//     </div>
//   );
// };

// export default EditForm;
