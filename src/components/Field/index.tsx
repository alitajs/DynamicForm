import React, { FC } from 'react';
import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import '../../styles/index.less';

const CustomField: FC<FieldProps> = props => {
  const [valueFlag, setValueFlag] = React.useState(false);

  const shouldUpdate = (prevValue: any, nextValue: any) => {
    setValueFlag(nextValue && nextValue[props.name as any]);
    return prevValue !== nextValue;
  };

  return (
    <div className={valueFlag ? 'alitajs-dform-value-color' : ''}>
      <Field {...props} shouldUpdate={shouldUpdate} />
    </div>
  );
};

export default CustomField;
