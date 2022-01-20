import React, { FC, CSSProperties } from 'react';
import { allPrefixCls } from '../../const';
import { NativeProps } from '../../PropsType';

import './index.less';

const prefixCls = `${allPrefixCls}-grid-item`;

type GridItemProps = {
  span?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & NativeProps<'--item-span'>;

type GridItemStyle = CSSProperties &
  Record<'--item-span', GridItemProps['span']>;

const GridItem: FC<GridItemProps> = (props) => {
  const { span = 1, onClick, children } = props;
  const itemStyle: GridItemStyle = {
    '--item-span': span,
  };

  return (
    <div className={prefixCls} style={itemStyle} onClick={onClick}>
      {children}
    </div>
  );
};

export default GridItem;
