import React, { FC } from 'react';
import classnames from 'classnames';
import { allPrefixCls } from '../../const/index';
import './index.less';

interface WingBlackProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}
const prefixCls = `${allPrefixCls}-wing-black`;

const WingBlack: FC<WingBlackProps> = (props) => {
  const { size = 'md', children, className, style } = props;
  const wrapCls = classnames(`${prefixCls}-${size}`, className);
  return (
    <div className={wrapCls} style={style}>
      {children}
    </div>
  );
};

export default WingBlack;
