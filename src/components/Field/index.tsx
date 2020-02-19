import React, { FC } from 'react';
import Form, { Field, useForm } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import classNames from 'classnames';
import '../../styles/index.less';

const CustomField: FC<FieldProps> = props => {
  const [valueFlag, setValueFlag] = React.useState(false);

  const shouldUpdate = (prevValue: any, nextValue: any) => {
    setValueFlag(nextValue && nextValue[props.name as any]);
    return prevValue !== nextValue;
  };

  return (
    <div
      className={classNames({
        'alitajs-dform-value-color': valueFlag,
        'alitajs-dform-value-size': true,
      })}
    >
      <Field {...props} shouldUpdate={shouldUpdate} />
    </div>
  );
};

export { useForm, Form };

export default CustomField;
