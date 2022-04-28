import React, { FC } from 'react';
import { CustomGroupProps } from './interface';

const CustomGroup: FC<CustomGroupProps> = (props) => {
  const { children, value, onChange, CustomDom, customDomProps } = props;

  const dom = () => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...children.props,
        value,
        onChange,
      });
    }
    return <CustomDom {...customDomProps} value={value} onChange={onChange} />;
  };
  return <>{dom()}</>;
};

export default CustomGroup;
