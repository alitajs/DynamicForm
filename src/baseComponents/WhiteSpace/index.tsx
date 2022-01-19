import React, { FC } from 'react';
import classnames from 'classnames';
import { allPrefixCls } from '../../const/index';
import './index.less';

interface WhiteSpaceProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const prefixCls = `${allPrefixCls}-white-space`;

const WhiteSpace: FC<WhiteSpaceProps> = (props) => {
  const { size = 'md', className, style, onClick } = props;
  const wrapCls = classnames(`${prefixCls}-${size}`, className);
  return <div className={wrapCls} style={style} onClick={onClick} />;
};

export default WhiteSpace;
