import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import { DformContext } from '../DynamicForm';
import { allPrefixCls, allPcPrefixCls } from '../../const/index';
import './index.less';

export interface HorizontalTitleProps {
  /**
   * 是否是必填项
   */
  required: boolean;
  /**
   *
   */
  hasStar: boolean;
  /**
   * 标题
   */
  title: string | ReactNode;
  /**
   * 标题宽度
   */
  labelNumber?: number;
  /**
   * 是否是纵向效果
   */
  isVertical?: boolean;
}

const HorizontalTitle: FC<HorizontalTitleProps> = (props) => {
  const {
    required = false,
    hasStar,
    title,
    labelNumber = 5,
    isVertical,
  } = props;

  return (
    <DformContext.Consumer>
      {({ isPc }: any) => {
        const labelCls = classnames({
          [`${allPcPrefixCls}-title-label`]: isPc,
          [`${isPc ? allPcPrefixCls : allPrefixCls}-title-label-0`]:
            labelNumber === 0,
          [`${isPc ? allPcPrefixCls : allPrefixCls}-title-label-2`]:
            labelNumber === 2,
          [`${isPc ? allPcPrefixCls : allPrefixCls}-title-label-3`]:
            labelNumber === 3,
          [`${isPc ? allPcPrefixCls : allPrefixCls}-title-label-4`]:
            labelNumber === 4,
          [`${isPc ? allPcPrefixCls : allPrefixCls}-title-label-5`]:
            labelNumber === 5,
          [`${isPc ? allPcPrefixCls : allPrefixCls}-title-label-6`]:
            labelNumber === 6,
          [`${isPc ? allPcPrefixCls : allPrefixCls}-title-label-7`]:
            labelNumber === 7,
          [`${isPc ? allPcPrefixCls : allPrefixCls}-title-label-auto`]:
            labelNumber > 7,
        });

        return (
          <div
            className={classnames({
              [`${allPrefixCls}-title`]: true,
              [labelCls]: !isVertical,
            })}
          >
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
          </div>
        );
      }}
    </DformContext.Consumer>
  );
};

export default HorizontalTitle;
