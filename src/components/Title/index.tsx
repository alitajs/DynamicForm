import React, { FC } from 'react';
import classnames from 'classnames';
import Hidden from '../Hidden';
import { allPrefixCls } from '../../const/index';

export interface TitleProps {
  positionType?: 'vertical' | 'horizontal';
  hidden?: boolean;
  required?: boolean;
  hasStar?: boolean;
  title?: string;
  subTitle?: string | React.ReactNode;
  extra?: string | React.ReactNode;
}

const Title: FC<TitleProps> = ({
  children,
  positionType = 'horizontal',
  hidden = false,
  required = false,
  hasStar = true,
  title = '',
  subTitle,
  extra,
}) => {
  const isVertical = positionType === 'vertical';
  return (
    <Hidden hidden={hidden}>
      <div className={`${allPrefixCls}${isVertical ? '-vertical' : ''}-item`}>
        {isVertical && (
          <div
            className={classnames({
              [`${allPrefixCls}-title`]: true,
              [`${allPrefixCls}-vertical-title`]: true,
            })}
          >
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
            {subTitle}
            {extra !== '' && isVertical && (
              <div className={`${allPrefixCls}-extra`}>{extra}</div>
            )}
          </div>
        )}
        {children}
      </div>
    </Hidden>
  );
};

export default Title;
