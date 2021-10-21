import React, { FC, Fragment } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import Card from './Card';
import { GroupProps } from '../../PropsType';
import { allPrefixCls } from '@/const';

const Group: FC<GroupProps> = (props) => {
  const {
    children,
    type = 'empty',
    title,
    required,
    classname,
    rightView,
    leftView,
    border = true
  } = props;
  switch (type) {
    case 'empty':
      return <Fragment>{children}</Fragment>;
    case 'card':
      // 这里嵌套一层div 用来书写定义样式
      return (
        <div className={`${allPrefixCls}-group`}>
          <WingBlank>
            <WhiteSpace size="lg" />
            <Card
              title={title}
              require={required}
              classname={classname}
              leftView={leftView}
              rightView={rightView}
              border={border}
            >
              {children}
            </Card>
          </WingBlank>
        </div>
      );
    default:
      return <></>;
  }
};

Group.displayName = 'group';
export default Group;
