/* eslint-disable no-param-reassign */
import React, { FC, useEffect, useState } from 'react';
import { List } from 'antd-mobile';
import { InputItemPropsType } from 'antd-mobile/es/input-item/PropsType';
import { DatePickerPropsType } from 'antd-mobile/es/date-picker/PropsType';
import Form from 'rc-field-form';
import {
  Store,
  FormInstance,
  ValidateErrorEntity,
  Rule,
} from 'rc-field-form/es/interface';
import { getByteLen } from './utils';
import './index.less';

import {
  NomarInput,
  NomarSelect,
  NomarSwitch,
  NomarTextArea,
  NomarDatePicker,
  ExtraInput,
  RangeDatePicker,
  NomarRadio,
  NomarCheckBox,
  CoverRadio,
  NomarImagePicker,
  NomarCustom,
  MultiplePicker,
  AddressPicker,
  NomarText,
  NomarPicker,
  NomarFile,
} from './components';

import NewFieldPicker from './components/NewFieldPicker/NewFieldPicker';

export interface IAliasProps {
  label: string;
  value: string | number;
}

const FormItemType = {
  input: NomarInput,
  select: NomarSelect,
  area: NomarTextArea,
  date: NomarDatePicker,
  switch: NomarSwitch,
  radio: NomarRadio,
  extraInput: ExtraInput,
  rangeDatePicker: RangeDatePicker,
  checkbox: NomarCheckBox,
  coverRadio: CoverRadio,
  image: NomarImagePicker,
  custom: NomarCustom,
  multiplePicker: MultiplePicker,
  addressPicker: AddressPicker,
  text: NomarText,
  picker: NomarPicker,
  file: NomarFile,
} as any;

export interface IFormItemProps {
  type:
    | 'input'
    | 'select'
    | 'area'
    | 'date'
    | 'switch'
    | 'extraInput'
    | 'radio'
    | 'rangeDatePicker'
    | 'coverRadio'
    | 'image'
    | 'custom'
    | 'multiplePicker'
    | 'addressPicker'
    | 'text'
    | 'picker'
    | 'file'
    | 'checkbox';
  title: string;
  fieldProps: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  data?: any[];
  inputType?: InputItemPropsType['type'];
  modeType?: DatePickerPropsType['mode'];
  fieldProps2?: string;
  placeholder2?: string;
  rules?: Rule[];
  extraType?: 'input' | 'select';
  editable?: boolean;
  rows?: number;
  labelNumber?: number;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  firstProps?: any;
  secondProps?: any;
  radioType?: 'vertical' | 'horizontal';
  selectable?: boolean;
  limitSize?: number;
  CustomDom?: any;
  customDomProps?: any;
  subTitle?: string | React.ReactNode;
  maxValueLength?: number;
  onBlur?: (value?: string) => void;
  level?: number;
  onChangeLevel?: (val: any) => void;
  placeholderList?: string[];
  chunk?: number;
  leftContent?: string | React.ReactNode;
  rightContent?: string | React.ReactNode;
  onClick?: any;
  height?: number | string;
  noData?: string | React.ReactNode;
  loading?: boolean;
  alias?: IAliasProps;
  maxLine?: number;
  compressRatio?: number;
  onChange?: (val: (string | number)[] | string | number | boolean) => void;
  hidden?: boolean;
  defaultValue?: any;
  coverStyle?: React.CSSProperties;
  renderHeader?: string | React.ReactNode;
  initKey?: string | number;
  className?: string;
}

export type DFormData = IFormItemProps[];

export interface IDynamicFormProps {
  data: DFormData; // 动态表单数据
  form: FormInstance; // 表单对象
  formsValues?: Store;
  allDisabled?: boolean; // 全部不可交互，展示状态
  onFinish?: (values: Store) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
  isDev?: boolean; // 手动声明是开发模式
  onValuesChange?: (values: any) => void; // 字段改变时抛出事件
  autoLineFeed?: boolean; // 当 title 过长自动增加 positionType 为 vertical
  failScroll?: boolean; // 当字段 rule 验证不通过后，是否滚动到 错误位置，默认开启
}

export const getFormItem = (formItem: IFormItemProps, allDisabled: boolean) => {
  const {
    type,
    disabled = allDisabled,
    renderHeader,
    ...otherProps
  } = formItem;
  const FormItemComponent = FormItemType[formItem.type];
  return (
    <div key={formItem.fieldProps}>
      {renderHeader}
      <FormItemComponent {...otherProps} disabled={disabled} />
    </div>
  );
};

export const defaultFailed = (
  errorInfo: ValidateErrorEntity,
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void,
  failScroll?: boolean,
) => {
  if (
    !errorInfo ||
    !errorInfo.errorFields ||
    errorInfo.errorFields.length === 0
  ) {
    if (onFinishFailed) onFinishFailed(errorInfo);
    return;
  }
  const scrollToField = (fieldKey: any) => {
    const labelNode = document.getElementById(`alita-dform-${fieldKey}`);
    if (labelNode) {
      // labelNode.scrollIntoView(true);
      labelNode.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };
  if (failScroll) scrollToField(errorInfo.errorFields[0].name[0]);
  if (onFinishFailed) onFinishFailed(errorInfo);
};

// /**
//  * 根据传进来的数据判断 DForm 的类型
//  * @param data
//  */
// export const getDFormType = (data: DFormData): DFormType => {
//   if (data instanceof Array) {
//     let isTwoDimensional = false;
//     let isCardListType = false;
//     data.forEach((item: IFormItemProps[] | IFormItemProps | CardDForm) => {
//       if (item instanceof Array) {
//         isTwoDimensional = true;
//       } else {
//         isCardListType = !(item as IFormItemProps).fieldProps;
//       }
//     });
//     if (isTwoDimensional) {
//       return 'NORMALLIST';
//     }
//     return isCardListType ? 'CARDLIST' : 'NORMAL';
//   }
//   return 'CARD';
// };

const changeData = (oldData: IFormItemProps[], autoLineFeed: boolean) =>
  oldData.map((item) => {
    if (item?.hidden) {
      item.required = false;
    }
    if (item.positionType === 'vertical' || !autoLineFeed) return item;
    if (item.title) {
      const titleSize = getByteLen(item.title);
      if (titleSize >= 16) {
        item.positionType = 'vertical';
      } else if (item.type === 'input' || item.type === 'extraInput') {
        if (titleSize > 8) {
          item.labelNumber = titleSize / 2 + 1;
        } else {
          item.labelNumber = 5;
        }
      }
    }
    return item;
  });

const renderListMain = (
  formData: DFormData,
  allDisabled: boolean,
  autoLineFeed: boolean,
) => (
  <>
    {changeData(formData as IFormItemProps[], autoLineFeed).map((item) =>
      getFormItem(item, allDisabled),
    )}
  </>
);

const DynamicForm: FC<IDynamicFormProps> = ({
  children,
  data = [],
  form,
  allDisabled = false,
  formsValues = {},
  onFinish,
  onFinishFailed,
  onValuesChange,
  isDev,
  autoLineFeed = true,
  failScroll = true,
}) => {
  const [defaultValueFlag, setDefaultValueFlag] = useState<any>(true);

  useEffect(() => {
    if (defaultValueFlag) {
      if (data && data.length) {
        const filter = data.filter(
          (dataItem: any) =>
            dataItem?.defaultValue !== undefined &&
            formsValues[dataItem?.fieldProps] === undefined,
        );

        if (filter && filter.length) {
          filter.forEach((filterItem: any) => {
            formsValues[filterItem?.fieldProps] = filterItem.defaultValue;
          });
          setDefaultValueFlag(false);
        }
      }
    }
    form.setFieldsValue(formsValues as Store);
  }, [formsValues]);

  // const dFormType = getDFormType(data);

  const rederChildren = renderListMain(data, allDisabled, autoLineFeed);
  return (
    <>
      <Form
        form={form}
        initialValues={formsValues}
        onFinish={onFinish}
        onFinishFailed={(errorInfo: ValidateErrorEntity) =>
          defaultFailed(errorInfo, onFinishFailed, failScroll)
        }
        onValuesChange={onValuesChange}
      >
        {rederChildren}
        {children}
      </Form>
      {isDev && <NewFieldPicker data={data} />}
    </>
  );
};

export default DynamicForm;
