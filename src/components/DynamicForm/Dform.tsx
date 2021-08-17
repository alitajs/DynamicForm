import React, { FC, useState, useEffect } from 'react';
import Form, { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import Group from './Group1';
import Title from '../Title';
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
  CoverRadio,
  DformImagePicker,
  DformCustom,
  MultiplePicker,
  AddressPicker,
  DformText,
  DformPicker,
  DformFile,
} from '../';

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

export interface DformContextProps extends IDynamicFormProps {}

export const DformContext = React.createContext<DformContextProps | null>(null);

export const getFormItem = ({
  formItem = {} as IFormItemProps,
  allDisabled,
  errorValue,
  isComponent = false,
  child = () => <div></div>,
  childProps = {},
  fieldChange,
  relatives = {},
}: {
  formItem?: IFormItemProps;
  allDisabled: boolean;
  errorValue?: ErrorValueProps;
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
  const {
    type,
    disabled = allDisabled,
    renderHeader,
    ...otherProps
  } = mFormItem;
  const FormItemComponent = FormItemType[type];

  // 表单对齐方向
  let positionType =
    otherProps?.positionType ||
    DFORM_COMP_DETAULT[type]?.positionType ||
    DFORM_COMP_DETAULT[otherProps.name]?.positionType;

  // 是否是不可变更对齐方式的表单类型
  if (NO_SUPPORT_VERTICAL.includes(type || otherProps.name)) {
    positionType =
      DFORM_COMP_DETAULT[type]?.positionType ||
      DFORM_COMP_DETAULT[otherProps.name]?.positionType;
  }
  return (
    <Title
      key={otherProps?.fieldProps}
      error={errorValue}
      positionType={positionType}
      hidden={otherProps?.hidden}
      required={otherProps?.required}
      hasStar={otherProps?.hasStar}
      title={otherProps?.title}
      subTitle={otherProps?.subTitle}
      extra={otherProps?.extra || ''}
      fieldProps={otherProps?.fieldProps}
    >
      {!isComponent && (
        <FormItemComponent
          {...otherProps}
          disabled={disabled}
          errorValue={errorValue}
          onChange={(e: any) => {
            const { onChange } = otherProps as any;
            fieldChange(childProps.fieldProps, e, relatives);
            if (onChange) onChange(e);
          }}
        />
      )}
      {isComponent &&
        React.cloneElement(child, {
          ...childProps,
          errorValue,
          onChange: (e: any) => {
            const { onChange } = childProps as any;
            fieldChange(childProps.fieldProps, e, relatives);
            if (onChange) onChange(e);
          },
        })}
    </Title>
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
    autoLineFeed = true,
    failScroll = true,
    relatives = {},
    sonFlag = false,
    isDev = false,
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
  }, [formsValues]);

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
      const { name } = child.type as any;
      const mProps: any = {
        ...props,
        ...(changeForm[props.fieldProps] || {}),
        name,
      };
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
      if (DFORM_COMP_NAME.indexOf(name) !== -1) {
        return getFormItem({
          child,
          allDisabled,
          errorValue,
          isComponent: true,
          childProps: mProps,
          fieldChange,
          relatives,
        });
      } else if (name === 'Group') {
        return (
          <Group key={fieldProps || index} {...props}>
            {showChildren({ context: props.children })}
          </Group>
        );
      } else {
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
      const { type, groupProps, fieldProps, children } = item;
      if (type === 'group') {
        return (
          <Group {...groupProps} key={fieldProps}>
            {jsonDataContent({ jsonData: children })}
          </Group>
        );
      }
      return getFormItem({
        formItem: changeData(item, autoLineFeed),
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
    <DformContext.Provider value={{ ...fatherProps }}>
      {!sonFlag && (
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
