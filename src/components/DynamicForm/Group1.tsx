import React, { FC, Fragment } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import Card from './Card';
import { GroupProps } from '../../PropsType';

const Group: FC<GroupProps> = (props) => {
  const {
    children,
    type = 'empty',
    title,
    required,
    classname,
    rightView,
    leftView,
  } = props;
  switch (type) {
    case 'empty':
      return <Fragment>{children}</Fragment>;
    case 'card':
      return (
        <WingBlank>
          <WhiteSpace size="lg" />
          <Card
            title={title}
            require={required}
            classname={classname}
            leftView={leftView}
            rightView={rightView}
          >
            {children}
          </Card>
        </WingBlank>
      );
    default:
      return <></>;
  }
};

export default Group;
