/* eslint-disable no-param-reassign */
import React, { FC, useEffect, useState } from 'react';
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
import { ErrorValueProps } from './PropsType';
import './index.less';

import {
  DformInput,
  DformSelect,
  DformSwitch,
  DformTextArea,
  DformDatePicker,
  ExtraInput,
  RangeDatePicker,
  DformRadio,
  DformCheckBox,
  CoverRadio,
  DformImagePicker,
  DformCustom,
  MultiplePicker,
  AddressPicker,
  DformText,
  DformPicker,
  DformFile,
} from './components';

import NewFieldPicker from './components/NewFieldPicker/NewFieldPicker';

export interface IAliasProps {
  label: string;
  value: string | number;
}

const FormItemType = {
  input: DformInput,
  select: DformSelect,
  area: DformTextArea,
  date: DformDatePicker,
  switch: DformSwitch,
  radio: DformRadio,
  extraInput: ExtraInput,
  rangeDatePicker: RangeDatePicker,
  checkbox: DformCheckBox,
  coverRadio: CoverRadio,
  image: DformImagePicker,
  custom: DformCustom,
  multiplePicker: MultiplePicker,
  addressPicker: AddressPicker,
  text: DformText,
  picker: DformPicker,
  file: DformFile,
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
  data?: DFormData; // 动态表单数据
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

export const getFormItem = (
  formItem: IFormItemProps,
  allDisabled: boolean,
  errorValue: ErrorValueProps,
) => {
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
      <FormItemComponent
        {...otherProps}
        disabled={disabled}
        errorValue={errorValue}
      />
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

const renderListMain = ({
  formData = [],
  allDisabled = false,
  autoLineFeed = true,
  errorValue = {},
}: {
  formData: DFormData;
  allDisabled: boolean;
  autoLineFeed: boolean;
  errorValue: ErrorValueProps;
}) => (
  <>
    {changeData(formData as IFormItemProps[], autoLineFeed).map((item) =>
      getFormItem(item, allDisabled, errorValue),
    )}
  </>
);

/**
 * 通过 onFinishFailed 的方法
 */
const getAllError = (errorInfo: ValidateErrorEntity) => {
  const { errorFields = [] } = errorInfo;
  const errorObj = {} as any;
  errorFields.forEach((item: any) => {
    errorObj[item[`name`][0]] = item[`errors`][0];
  });
  return errorObj;
};

/**
 * 重置错误信息提示
 */
const resetErrorField = (
  errorValue: ErrorValueProps,
  values: { [key: string]: any },
) => {
  const errorObj = { ...errorValue };
  const key = Object.keys(values)[0];
  if (errorObj[key]) {
    errorObj[key] = undefined;
    return { success: true, errorObj };
  } else {
    return { success: false };
  }
};

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
  const [errorValue, setErrorValue] = useState<any>({});

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

  const childs = React.Children.toArray(children);

  return (
    <>
      <Form
        form={form}
        initialValues={formsValues}
        onFinish={onFinish}
        onFinishFailed={(errorInfo: ValidateErrorEntity) => {
          setErrorValue(getAllError(errorInfo));
          defaultFailed(errorInfo, onFinishFailed, failScroll);
        }}
        onValuesChange={(values: any) => {
          const { success = false, errorObj } = resetErrorField(
            errorValue,
            values,
          );
          if (success) setErrorValue(errorObj);
          if (onValuesChange) onValuesChange(values);
        }}
      >
        {!!data.length &&
          renderListMain({
            formData: data,
            allDisabled,
            autoLineFeed,
            errorValue,
          })}
        {childs &&
          typeof children === 'function' &&
          children({ error: errorValue })}
        {childs &&
          childs.map((child) => {
            if (!React.isValidElement(child)) return;
            return React.cloneElement(child, {
              ...child.props,
              errorValue,
            });
          })}
      </Form>
      {isDev && <NewFieldPicker data={data} />}
    </>
  );
};

export default DynamicForm;
