import React, { FC } from 'react';
import { DformContext } from '../../baseComponents/DynamicForm';
import PcLayout from '../../baseComponents/PcLayout';
import { CustomGroupProps } from './interface';

const CustomGroup: FC<CustomGroupProps> = (props) => {
  const {
    children,
    value,
    onChange,
    CustomDom,
    customDomProps,
    isVertical,
    cutomTitle,
  } = props;

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
  return (
    <DformContext.Consumer>
      {({ isPc }: any) => (
        <>
          {!isPc && dom()}
          {isPc && (
            <PcLayout isVertical={isVertical} left={cutomTitle} right={dom()} />
          )}
        </>
      )}
    </DformContext.Consumer>
  );
};

export default CustomGroup;
