import React, { FC } from 'react';
import Form, { Field, useForm } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import { allPrefixCls } from '../../const/index';
import '../../styles/index.less';

const CustomField: FC<FieldProps> = (props: any) => {
  // const [valueFlag, setValueFlag] = React.useState(false);

  const shouldUpdate = (prevValue: any, nextValue: any) => {
    if (props.shouldUpdate && typeof props.shouldUpdate === 'function') {
      props.shouldUpdate(prevValue, nextValue, {});
    }
    // setValueFlag(nextValue && nextValue[props.name as any]);
    return prevValue !== nextValue;
  };

  return (
    <div
      id={`alita-dform-${props?.name}`}
      // className={
      //   valueFlag
      //     ? `${allPrefixCls}-value-content`
      //     : `${allPrefixCls}-placeholder`
      // }
    >
      <Field {...props} shouldUpdate={shouldUpdate} />
    </div>
  );
};

export { useForm, Form };

export default CustomField;
