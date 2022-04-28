import React, { FC, useEffect, useState } from 'react';
import Form, { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import { getByteLen } from '../../utils';
import {
  ErrorValueProps,
  IFormItemProps,
  IDynamicFormProps,
} from '../../PropsType';
import { DFORM_COMP_NAME, DFORM_COMP_DETAULT } from '../../utils/menu';
import Group from './Group';

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
} from '../';

import Title from '../Title';

import NewFieldPicker from '../NewFieldPicker/NewFieldPicker';

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

export type DFormData = IFormItemProps[];

export const getFormItem = (
  formItem: IFormItemProps,
  allDisabled: boolean,
  errorValue?: ErrorValueProps,
) => {
  const {
    type,
    disabled = allDisabled,
    renderHeader,
    ...otherProps
  } = formItem;
  const FormItemComponent = FormItemType[formItem.type];
  return (
    <Title
      key={otherProps?.fieldProps}
      error={errorValue}
      positionType={
        otherProps?.positionType || DFORM_COMP_DETAULT[type].positionType
      }
      hidden={otherProps?.hidden}
      required={otherProps?.required}
      hasStar={otherProps?.hasStar}
      title={otherProps?.title}
      subTitle={otherProps?.subTitle}
      extra={otherProps?.extra || ''}
      fieldProps={otherProps?.fieldProps}
    >
      {renderHeader}
      <FormItemComponent
        {...otherProps}
        disabled={disabled}
        errorValue={errorValue}
      />
    </Title>
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
    if (labelNode && labelNode.scrollIntoView) {
      labelNode.scrollIntoView?.({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };
  if (failScroll) scrollToField(errorInfo.errorFields[0].name[0]);
  if (onFinishFailed) onFinishFailed(errorInfo);
};

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
          item.labelNumber = 7;
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
  relatives = {},
}) => {
  const [defaultValueFlag, setDefaultValueFlag] = useState<any>(true);
  const [errorValue, setErrorValue] = useState<any>({});
  const [changeForm, setChangeForm] = useState<any>({});

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

  // 字段变更联动
  const fieldChange = (fieldProps: string, e: any, relatives: any) => {
    // 当前表单规则
    const curFieldRel: any[] = relatives[fieldProps];
    // 改变表单字段
    const mChangeForm: any = {};

    if (
      !!Object.keys(relatives).length &&
      !!curFieldRel &&
      !!curFieldRel.length
    ) {
      curFieldRel.forEach((rel: any) => {
        const { type, targetValue, targetSet = [] } = rel;
        const fieldValues = {} as any;
        switch (type) {
          case 'changeFormValue':
            if (targetValue.includes(e)) {
              targetSet.forEach((row: any) => {
                const { targetField, targetValue } = row;
                fieldValues[targetField] = targetValue;
              });
              form.setFieldsValue(fieldValues);
            }
            break;
          case 'required':
          case 'hidden':
          case 'disabled':
            targetSet.forEach((row: any) => {
              const { targetField } = row;
              mChangeForm[targetField] = {
                [type]: targetValue.includes(e),
              };
            });
            break;
          case 'custom':
            targetSet.forEach((row: any) => {
              const { targetField, targetContent = {} } = row;
              mChangeForm[targetField] = targetValue.includes(e)
                ? targetContent
                : {};
            });
            break;
          default:
            break;
        }
      });
      if (!!Object.keys(mChangeForm).length) {
        setChangeForm({
          ...changeForm,
          ...mChangeForm,
        });
      }
    }
  };

  const dformItems = (childs: any) => {
    return childs.map((child: any, index: number) => {
      if (!React.isValidElement(child)) return;
      const { props = {} as any } = child;
      const mProps: any = { ...props, ...(changeForm[props.fieldProps] || {}) };
      const {
        positionType,
        hidden,
        required = false,
        hasStar = true,
        title,
        subTitle,
        extra,
        fieldProps,
      } = mProps;
      const { name } = child.type as any;
      if (DFORM_COMP_NAME.indexOf(name) !== -1) {
        return (
          <Title
            key={fieldProps || index}
            error={errorValue}
            positionType={positionType || DFORM_COMP_DETAULT[name].positionType}
            hidden={hidden}
            required={required}
            hasStar={hasStar}
            title={title}
            subTitle={subTitle}
            extra={extra}
            fieldProps={fieldProps}
          >
            {React.cloneElement(child, {
              ...mProps,
              errorValue,
              onChange: (e: any) => {
                const { onChange } = mProps as any;
                fieldChange(fieldProps, e, relatives);
                if (onChange) onChange(e);
              },
            })}
          </Title>
        );
        // } else if (name === 'Group') {
        //   return React.cloneElement(child, {
        //     ...props,
        //     children: child,
        //   });
      } else {
        return child;
      }
    });
  };

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
        {childs && typeof children === 'function' && children({ errorValue })}
        {childs && dformItems(childs)}
      </Form>
      {isDev && <NewFieldPicker data={data} />}
    </>
  );
};

// 为自定义 useForm 预留入口
export { useForm, IDynamicFormProps };

//@ts-ignore
DynamicForm.Group = Group;

export default DynamicForm;
