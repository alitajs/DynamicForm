import React, { FC, Fragment } from 'react';
import Card from './Card';

export interface GroupProps {
  type?: 'empty' | 'card';
  title?: string;
  require?: boolean;
  classname?: React.CSSProperties;
}

const Group: FC<GroupProps> = (props) => {
  const { children, type = 'empty', title, require, classname } = props;
  switch (type) {
    case 'empty':
      return <Fragment>{children}</Fragment>;
    case 'card':
      return (
        <Card title={title} require={require} classname={classname}>
          {children}
        </Card>
      );
    default:
      return <></>;
  }
};

export default Group;
