import React, { FC } from 'react';
import DynamicForm from './index';

export interface GroupProps {}

const Group: FC<GroupProps> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default Group;
