import React, { FC } from 'react';
import { Checkbox, List } from 'antd';
import 'antd/lib/checkbox/style/index.less';
import 'antd/lib/list/style/index.less';
import { CheckboxGroupProps } from 'antd/lib/checkbox/index';
import Field from '../Field';
import '../../styles/index.less';

interface INomarCheckBoxProps extends CheckboxGroupProps {
  title: string;
  rules?: [];
  required?: boolean;
  data?: any;
  fieldProps: string;
  hasStar?: boolean;
}

const NomarCheckBox: FC<INomarCheckBoxProps> = props => {
  const {
    fieldProps,
    title,
    rules,
    required = false,
    data = [],
    hasStar = true,
    ...otherProps
  } = props;

  return (
    <div className="alitajs-dform-nomarCheckBoxStyle">
      <p className="alitajs-dform-titleFontSize">
        {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
        <span id={fieldProps} className="alitajs-dform-titleColor">
          {title}
        </span>
      </p>
      <Field name={fieldProps} rules={rules || [{ required, message: `请选择${title}` }]}>
        <Checkbox.Group style={{ width: '100%' }} {...otherProps}>
          <div className="alitajs-dform-itemStyle">
            {[...data].map(item => (
              <List.Item key={item.value}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </List.Item>
            ))}
          </div>
        </Checkbox.Group>
      </Field>
    </div>
  );
};

export default NomarCheckBox;
