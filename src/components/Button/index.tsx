import React, { FC } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import '../../styles/index.less';

export interface IButtonProps {
  fieldProps: string;
  required?: boolean;
  rules?: Rule[];
  title: string;
  coverStyle?: React.CSSProperties;
  extraType?: 'input' | 'select';
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
}
interface ComProps {
  onChange?: (value: any) => void;
}
const Com: FC<ComProps> = props => {
  const { onChange } = props;
  return (
    <div
      onClick={() => {
        console.log('onClick');
        // eslint-disable-next-line no-unused-expressions
        onChange && onChange(1);
      }}
      style={{
        fontSize: '0.5rem',
      }}
    >
      123
    </div>
  );
};
const Button: FC<IButtonProps> = props => {
  const { fieldProps, rules, required, title } = props;
  return (
    <Field name={fieldProps} rules={rules || [{ required, message: `请输入${title}` }]}>
      <Com />
    </Field>
  );
};

export default Button;
