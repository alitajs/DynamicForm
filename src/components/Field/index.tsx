import React, { FC } from 'react';
import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import '../../styles/index.less';

const CustomField: FC<FieldProps> = (props: any) => {
  const shouldUpdate = (prevValue: any, nextValue: any) => {
    if (props.shouldUpdate && typeof props.shouldUpdate === 'function') {
      props.shouldUpdate(prevValue, nextValue, {});
    }
    return prevValue !== nextValue;
  };

  return (
    <div id={`alita-dform-${props?.name}`}>
      <Field {...props} shouldUpdate={shouldUpdate} />
    </div>
  );
};

export default CustomField;
