import React, { FC, useState, useEffect } from 'react';
import Form, { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import Group from './Group';
import NewFieldPicker from '../NewFieldPicker/NewFieldPicker';
import {
  DFORM_COMP_NAME,
  DFORM_COMP_DETAULT,
  NO_SUPPORT_VERTICAL,
} from '../../utils/menu';
import {
  resetErrorField,
  getAllError,
  defaultFailed,
  changeData,
} from '../../utils/tool';
import {
  IDynamicFormProps,
  IFormItemProps,
  ErrorValueProps,
} from '../../PropsType';

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
  DformImagePicker,
  DformCustom,
  MultiplePicker,
  AddressPicker,
  DformText,
  DformPicker,
  DformFile,
} from '../../components';

export const FormItemType = {
  input: DformInput,
  select: DformSelect,
  area: DformTextArea,
  date: DformDatePicker,
  switch: DformSwitch,
  radio: DformRadio,
  extraInput: ExtraInput,
  rangeDatePicker: RangeDatePicker,
  checkbox: DformCheckBox,
  image: DformImagePicker,
  custom: DformCustom,
  multiplePicker: MultiplePicker,
  addressPicker: AddressPicker,
  text: DformText,
  picker: DformPicker,
  file: DformFile,
} as any;

export const getFormItem = ({
  formItem = {} as IFormItemProps,
  allDisabled,
  errorValue,
  isComponent = false,
  child = () => <div></div>,
  childProps = {},
  fieldChange,
  relatives = {},
  isPc,
}: {
  formItem?: IFormItemProps;
  allDisabled: boolean;
  errorValue?: ErrorValueProps;
  child?: any;
  isComponent?: boolean;
  childProps?: any;
  relatives?: any;
  fieldChange: (fieldProps: string, e: any, relatives: any) => void;
  isPc?: boolean;
}) => {
  const mFormItem = {
    ...formItem,
    ...childProps,
  };
  const {
    type,
    disabled = allDisabled,
    renderHeader,
    renderFooter,
    ...otherProps
  } = mFormItem;
  const FormItemComponent = FormItemType[type];

  // 表单对齐方向
  let positionType =
    otherProps?.positionType ||
    DFORM_COMP_DETAULT[type]?.positionType ||
    DFORM_COMP_DETAULT[otherProps.displayName]?.positionType;

  // 是否是不可变更对齐方式的表单类型
  if (NO_SUPPORT_VERTICAL.includes(type || otherProps.displayName)) {
    positionType =
      DFORM_COMP_DETAULT[type]?.positionType ||
      DFORM_COMP_DETAULT[otherProps.displayName]?.positionType;
  }

  const titleProps = {
    key: otherProps?.fieldProps,
    error: errorValue,
    positionType,
    hidden: otherProps?.hidden,
    required: otherProps?.required,
    hasStar: otherProps?.hasStar,
    title: otherProps?.title,
    subTitle: otherProps?.subTitle,
    extra: otherProps?.extra || '',
    fieldProps: otherProps?.fieldProps,
    renderFooter,
    renderHeader,
  };
  return (
    <React.Fragment key={otherProps?.fieldProps}>
      {!isComponent && (
        <FormItemComponent
          isPc={isPc}
          {...otherProps}
          disabled={disabled}
          onChange={(e: any, b?: any, c?: any) => {
            const { onChange } = otherProps as any;
            fieldChange(otherProps.fieldProps, e, relatives);
            if (onChange) onChange(e, b, c);
          }}
          titleProps={titleProps}
          formFlag={true}
        />
      )}
      {isComponent &&
        React.cloneElement(child, {
          isPc,
          ...childProps,
          onChange: (e: any, ...other: any) => {
            const { onChange } = childProps as any;
            fieldChange(childProps.fieldProps, e, relatives);
            if (onChange) onChange(e, ...other);
          },
          titleProps,
          formFlag: true,
        })}
    </React.Fragment>
  );
};

const Dform: FC<IDynamicFormProps> = (fatherProps) => {
  const {
    children,
    data = [],
    form,
    allDisabled = false,
    formsValues = {},
    onFinish,
    onFinishFailed,
    onValuesChange,
    autoLineFeed = false,
    failScroll = true,
    relatives = {},
    sonFlag = false,
    isDev = false,
    errorFlag = true,
    isPc,
  } = fatherProps;
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
    let newErrorValue = { ...errorValue };
    if (!!Object.keys(errorValue).length) {
      Object.keys(errorValue).forEach((item: string) => {
        if (!!formsValues[item] && !!formsValues[item]?.length) {
          delete newErrorValue[item];
        }
      });
      if (errorFlag) {
        setErrorValue(newErrorValue);
      }
    }
  }, [JSON.stringify(formsValues)]);

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

  const dformItems = (childs: any): React.ReactNode => {
    return childs.map((child: any, index: number) => {
      const { props = {} as any } = child;
      // 字符串、null等类型
      if (!React.isValidElement(child)) return child;
      const { displayName } = child.type as any;
      const mProps: any = {
        ...props,
        ...(changeForm[props.fieldProps] || {}),
        displayName,
      };
      const { fieldProps } = mProps;
      // 内部表单类型
      if (DFORM_COMP_NAME.indexOf(displayName) !== -1) {
        return getFormItem({
          child,
          allDisabled,
          errorValue,
          isComponent: true,
          childProps: changeData(mProps, autoLineFeed),
          fieldChange,
          relatives,
          isPc,
        });
      } else if (displayName === 'group') {
        // 内部Group组件
        return React.cloneElement(
          child,
          { ...props, key: fieldProps || index },
          showChildren({ context: props.children }),
        );
      } else {
        // 其他类型组件
        const isArray = Array.isArray(props.children);
        if (
          props.children &&
          ((isArray && !!props.children.length) ||
            (!isArray &&
              props.children.type &&
              !!Object.keys(props.children).length))
        ) {
          const childs = React.Children.toArray(props?.children);
          return React.cloneElement(child, props, dformItems(childs));
        }
        return child;
      }
    });
  };

  const jsonDataContent = ({
    jsonData = [],
  }: {
    jsonData: IFormItemProps[];
  }) => {
    return jsonData.map((item: any) => {
      const mItem = { ...item, ...(changeForm[item.fieldProps] || {}) };
      const { type, groupProps, fieldProps, children } = mItem;
      if (type === 'group') {
        return (
          <Group {...groupProps} key={fieldProps}>
            {jsonDataContent({ jsonData: children })}
          </Group>
        );
      }
      return getFormItem({
        formItem: changeData(mItem, autoLineFeed),
        allDisabled,
        errorValue,
        fieldChange,
        relatives,
      });
    });
  };

  const showChildren = ({ context }: any) => {
    const childs = React.Children.toArray(context);
    return (
      <React.Fragment>
        {!!data.length && jsonDataContent({ jsonData: data })}
        {childs && typeof children === 'function' && children({ errorValue })}
        {childs && dformItems(childs)}
      </React.Fragment>
    );
  };

  return (
    <>
      {!sonFlag && (
        <Form
          form={form}
          initialValues={formsValues}
          onFinish={onFinish}
          onFinishFailed={(errorInfo: ValidateErrorEntity) => {
            if (errorFlag) setErrorValue(getAllError(errorInfo));
            defaultFailed(errorInfo, onFinishFailed, failScroll);
          }}
          onValuesChange={(values: any) => {
            const { success = false, errorObj } = resetErrorField(
              errorValue,
              values,
            );
            if (success && errorFlag) setErrorValue(errorObj);
            if (onValuesChange) onValuesChange(values);
          }}
        >
          {showChildren({ context: children })}
        </Form>
      )}
      {sonFlag && showChildren({ context: children })}
      {isDev && <NewFieldPicker />}
    </>
  );
};

export { useForm };

export default Dform;
