import React, { FC } from 'react';
import classnames from 'classnames';
import { allPrefixCls } from '../../const/index';
import { CardProps } from '../../PropsType';
import './index.less';

const prefixCls = `${allPrefixCls}-card`;

const Card: FC<CardProps> = ({
  children,
  leftView,
  require,
  title,
  rightView,
  classname,
}) => {
  return (
    <div
      className={classnames({
        [prefixCls]: true,
        classname,
      })}
    >
      <div className={`${prefixCls}-title-box`}>
        {leftView}
        {require && <div className={`${prefixCls}-require`}>*</div>}
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {rightView && rightView}
      </div>
      {children}
    </div>
  );
};

export default Card;
