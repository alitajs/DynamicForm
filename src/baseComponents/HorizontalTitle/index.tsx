import React, { FC, ReactNode, useContext, useState, useMemo } from 'react';
import classnames from 'classnames';
import { DformContext, DformContextProps } from '../Context';
import { allPrefixCls } from '../../const';

export interface HorizontalTitleProps {
  /**
   * 是否是必填项
   */
  required?: boolean;
  /**
   *
   */
  hasStar?: boolean;
  /**
   * fieldProps
   */
  fieldProps?: string;
  /**
   * 标题
   */
  title?: string | ReactNode;
  /**
   * 标题宽度
   */
  labelNumber?: number;
  /**
   * 是否是纵向效果
   */
  isVertical?: boolean;
  /**
   * style
   */
  style?: React.CSSProperties;
  /**
   * 标题 style
   */
  titleStyle?: React.CSSProperties;
}

const HorizontalTitle: FC<HorizontalTitleProps> = (props) => {
  const {
    required = false,
    hasStar,
    title,
    labelNumber = 7,
    isVertical,
    fieldProps = '',
    titleStyle,
  } = props;
  const [mregedRequired, setMregedRequired] = useState<boolean>(required);

  const { changeForm } = useContext<DformContextProps>(DformContext);

  const labelCls = classnames({
    [`${allPrefixCls}-title-label`]: true,
    [`${allPrefixCls}-title-label-0`]: labelNumber === 0,
    [`${allPrefixCls}-title-label-2`]: labelNumber === 2,
    [`${allPrefixCls}-title-label-3`]: labelNumber === 3,
    [`${allPrefixCls}-title-label-4`]: labelNumber === 4,
    [`${allPrefixCls}-title-label-5`]: labelNumber === 5,
    [`${allPrefixCls}-title-label-6`]: labelNumber === 6,
    [`${allPrefixCls}-title-label-7`]: labelNumber === 7,
    [`${allPrefixCls}-title-label-auto`]: labelNumber > 7,
  });

  useMemo(() => {
    if (changeForm[fieldProps]?.required !== undefined) {
      setMregedRequired(changeForm[fieldProps]?.required);
    } else {
      setMregedRequired(required);
    }
  }, [changeForm[fieldProps], required]);

  return (
    <div
      className={classnames({
        [`${allPrefixCls}-title`]: true,
        [labelCls]: !isVertical,
      })}
    >
      {mregedRequired && hasStar && (
        <div className={`${allPrefixCls}-redStar`}>*</div>
      )}
      <div style={titleStyle}>{title}</div>
    </div>
  );
};

export default HorizontalTitle;
