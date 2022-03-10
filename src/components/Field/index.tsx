import React, { FC } from 'react';
import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import '../../styles/index.less';

interface CustomFieldProps extends FieldProps {
  formFlag?: boolean;
  params?: any;
}

const CustomField: FC<CustomFieldProps> = (props: any) => {
  const { formFlag = false, rules = [], params = {}, ...restProps } = props;
  const { hidden = false } = params;

  const shouldUpdate = (prevValue: any, nextValue: any) => {
    if (props.shouldUpdate && typeof props.shouldUpdate === 'function') {
      props.shouldUpdate(prevValue, nextValue, {});
    }
    return prevValue !== nextValue;
  };

  // 不在DynamicForm中 取消Field包裹;
  if (!formFlag) {
    return <div id={`alita-dform-${props?.name}`}>{props.children}</div>;
  }

  return (
    <div id={`alita-dform-${props?.name}`}>
      <Field
        {...restProps}
        rules={hidden ? [] : rules}
        shouldUpdate={shouldUpdate}
      />
    </div>
  );
};

export default CustomField;
