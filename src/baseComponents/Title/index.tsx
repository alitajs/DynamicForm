import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import { DformContext } from '../DynamicForm';
import Hidden from '../Hidden';
import { allPrefixCls, allPcPrefixCls } from '../../const';

import './index.less';

export interface TitleProps {
  positionType?: 'vertical' | 'horizontal';
  hidden?: boolean;
  required?: boolean;
  hasStar?: boolean;
  title?: string;
  subTitle?: string | React.ReactNode;
  extra?: string | React.ReactNode;
  error: any;
  fieldProps: string;
  independentProps?: TitleProps;
  formFlag?: boolean;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}

const Title: FC<TitleProps> = (props) => {
  const {
    children,
    positionType = 'horizontal',
    hidden = false,
    required = false,
    hasStar = true,
    title = '',
    subTitle,
    extra,
    error,
    fieldProps,
    renderFooter,
    renderHeader,
  } = useMemo(() => {
    if (props.formFlag) {
      return props;
    }
    return { ...props, ...props.independentProps } as any;
  }, [props]);

  const isVertical = positionType === 'vertical';
  // `${allPrefixCls}-cell` 类名勿动，主要用来配置单一class 取消Group尾部下划线
  return (
    <Hidden hidden={hidden}>
      {renderHeader}
      <DformContext.Consumer>
        {({ isPc = false }: any) => {
          return (
            <>
              <div
                className={classnames(`${allPrefixCls}-cell`, {
                  [`${allPrefixCls}${isVertical ? '-vertical' : ''}-item`]:
                    true,
                  // [`${allPrefixCls}-error`]: error && !!error[fieldProps],
                  [`${allPcPrefixCls}-item`]: isPc,
                })}
              >
                {isVertical && !isPc && (
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
                {error && !!error[fieldProps] && (
                  <div className={`${allPrefixCls}-error-text`}>
                    {error[fieldProps]}
                  </div>
                )}
                {renderFooter}
              </div>
            </>
          );
        }}
      </DformContext.Consumer>
    </Hidden>
  );
};

export default Title;
