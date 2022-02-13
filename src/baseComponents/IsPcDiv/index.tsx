import React, { FC, CSSProperties } from 'react';

interface IsPcDivProps {
  /**
   * Dform 中传进来的 是否是 pc 的标识
   */
  isPc: boolean | undefined;
  /**
   * className
   */
  className: string;
  /**
   * 是否是 pc
   */
  pcFlag?: boolean;
  /**
   * 是否是 mobile
   */
  mobileFlag?: boolean;
  /**
   * 组件样式
   */
  style?: CSSProperties;
}

const IsPcDiv: FC<IsPcDivProps> = (props) => {
  const { isPc, className, pcFlag, mobileFlag, children, style = {} } = props;

  let display = '';
  if (mobileFlag) {
    display = isPc ? 'none' : '';
  } else if (pcFlag) {
    display = isPc ? '' : 'none';
  }

  return (
    <div className={className} style={{ display: display, ...style }}>
      {children}
    </div>
  );
};

export default IsPcDiv;
