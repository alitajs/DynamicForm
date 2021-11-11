import React, { FC } from 'react';
import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import '../../styles/index.less';

const CustomField: FC<FieldProps & { formFlag?: boolean }> = (props: any) => {

  const { formFlag = false, ...restProps } = props;

  const shouldUpdate = (prevValue: any, nextValue: any) => {
    if (props.shouldUpdate && typeof props.shouldUpdate === 'function') {
      props.shouldUpdate(prevValue, nextValue, {});
    }
    return prevValue !== nextValue;
  };

  // 不在DynamicForm中 取消Field包裹;
  if (!formFlag) {
    return (
      <div id={`alita-dform-${props?.name}`}>
        {props.children}
      </div>
    );
  }

  return (
    <div id={`alita-dform-${props?.name}`}>
      <Field {...restProps} shouldUpdate={shouldUpdate} />
    </div>
  );
};

export default CustomField;
