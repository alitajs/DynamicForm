import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import { allPcPrefixCls } from '../../const';
import './index.less';

export interface PcLayoutProps {
  /**
   * 标题样式
   */
  left: ReactNode;
  /**
   * 右侧效果
   */
  right: ReactNode;
  /**
   * 横向纵向效果
   */
  isVertical?: boolean;
  /**
   * 标题长度
   * @default 5
   */
  labelNumber?: number;
}

const PcLayout: FC<PcLayoutProps> = (props) => {
  const { left, right, isVertical, labelNumber = 5 } = props;

  return (
    <div
      className={classnames({
        [`${allPcPrefixCls}-title`]: !isVertical,
        [`${allPcPrefixCls}-vertical-title`]: isVertical,
      })}
    >
      {left}
      {right}
    </div>
  );
};

export default PcLayout;
