import React, { FC } from 'react';
import { Icon } from 'antd-mobile-v2';
import './index.less';

interface ExpandViewProps {
  /**
   * @description 是否展开
   */
  isExtand: boolean;

  /**
   * @description 展开回调
   */
  onChange: (isExtand: boolean) => void;
}

const prefixCls = 'alitajs-dform';
const ExpandView: FC<ExpandViewProps> = ({ isExtand = false, onChange }) => {
  return (
    <div className={`${prefixCls}-expand-view`}>
      <div
        className={`${prefixCls}-expand-view-center`}
        onClick={() => {
          onChange && onChange(!isExtand);
        }}
      >
        <Icon size="xxs" type={isExtand ? 'up' : 'down'} />
      </div>
    </div>
  );
};

ExpandView.displayName = 'ExpandView';
export default ExpandView;
