import React, { FC, useState, useEffect } from 'react';
import Form, { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import Group from './Group';
import NewFieldPicker from '../NewFieldPicker/NewFieldPicker';
import { DformContext } from '../Context';
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
import { IDynamicFormProps, IFormItemProps } from '../../PropsType';

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
  coverRadio: CoverRadio,
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
  childProps = {},
  fieldChange,
  relatives = {},
}: {
  formItem?: IFormItemProps;
  allDisabled: boolean;
  child?: any;
  isComponent?: boolean;
  childProps?: any;
  relatives?: any;
  fieldChange: (fieldProps: string, e: any, relatives: any) => void;
}) => {
  const mFormItem = {
    ...formItem,
    ...childProps,
  };
  const { type, disabled = allDisabled, ...otherProps } = mFormItem;
  const FormItemComponent = FormItemType[type];

  const key = otherProps?.fieldName || otherProps?.fieldProps;

  return (
    <React.Fragment key={key}>
      <FormItemComponent
        {...otherProps}
        disabled={disabled}
        onChange={(e: any, ...otherChange: any) => {
          const { onChange } = otherProps as any;
          fieldChange(key, e, relatives);
          if (onChange) onChange(e, ...otherChange);
        }}
      />
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
  } = fatherProps;
  const [defaultValueFlag, setDefaultValueFlag] = useState<any>(true);
  const [errorValue, setErrorValue] = useState<any>({});
  const [changeForm, setChangeForm] = useState<any>({});

  useEffect(() => {
    Object.keys(relatives).map((item) => {
      if (formsValues[item]) {
        fieldChange(item, formsValues[item], relatives);
      }
    });
  }, []);

  useEffect(() => {
    if (defaultValueFlag) {
      if (data && data.length) {
        const filter = data.filter(
          (dataItem: any) =>
            dataItem?.defaultValue !== undefined &&
            formsValues[dataItem?.fieldName || dataItem?.fieldProps] ===
              undefined,
        );

        if (filter && filter.length) {
          filter.forEach((filterItem: any) => {
            const key = filterItem?.fieldName || filterItem?.fieldProps;
            formsValues[key] = filterItem.defaultValue;
            if (relatives[key]) {
              fieldChange(key, filterItem.defaultValue, relatives);
            }
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
      const newCurFieldRel = [...curFieldRel];
      const ind = curFieldRel.findIndex((it: any) =>
        it?.targetValue.includes(e),
      );
      const findObj = curFieldRel.find((it: any) =>
        it?.targetValue.includes(e),
      );
      if (ind > -1) {
        newCurFieldRel.splice(ind, 1);
        newCurFieldRel.push(findObj);
      }
      newCurFieldRel.forEach((rel: any) => {
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
          isComponent: true,
          childProps: changeData(mProps, autoLineFeed),
          fieldChange,
          relatives,
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
      // const mItem = { ...item, ...(changeForm[item.fieldProps] || {}) };
      const { type, groupProps, fieldProps, children, fieldName } = item;

      if (type === 'group') {
        return (
          <Group {...groupProps} key={fieldName || fieldProps}>
            {jsonDataContent({ jsonData: children })}
          </Group>
        );
      }
      return getFormItem({
        formItem: changeData(item, autoLineFeed),
        allDisabled,
        // errorValue,
        fieldChange,
        relatives,
      });
    });
  };

  const showChildren = ({ context }: any) => {
    // const childs = React.Children.toArray(context);

    return (
      <React.Fragment>
        {!!data.length && jsonDataContent({ jsonData: data })}
        {/* {childs && typeof children === 'function' && children()}
        {childs && dformItems(childs)} */}
        {context}
      </React.Fragment>
    );
  };

  const updateErrorValue = (fieldProps: string) => {
    const newErrorValue = { ...errorValue };
    delete newErrorValue[fieldProps];
    setErrorValue(newErrorValue);
  };

  return (
    <DformContext.Provider
      value={{ errorValue, changeForm, formFlag: true, updateErrorValue }}
    >
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

            fieldChange(
              Object.keys(values)[0],
              Object.values(values)[0],
              relatives,
            );
            if (onValuesChange) onValuesChange(values);
          }}
        >
          {showChildren({ context: children })}
        </Form>
      )}
      {sonFlag && showChildren({ context: children })}
      {isDev && <NewFieldPicker />}
    </DformContext.Provider>
  );
};

export { useForm };

export default Dform;
