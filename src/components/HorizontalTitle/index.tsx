import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import Hidden from '../Hidden';
import { allPrefixCls } from '../../const/index';
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
  } = useMemo(() => {
    if (props.formFlag) {
      return props;
    }
    return { ...props, ...props.independentProps } as any;
  }, [props]);

  // `${allPrefixCls}-cell` 类名勿动，主要用来配置单一class 取消Group尾部下划线
  return (
    <Hidden hidden={hidden}>
      <div
        className={classnames(`${allPrefixCls}-cell ${allPrefixCls}-item`, {
          [`${allPrefixCls}-horizontal`]: true,
          [`${allPrefixCls}-error`]: error && !!error[fieldProps],
        })}
      >
        <div
          className={classnames({
            [`${allPrefixCls}-title`]: true,
          })}
        >
          <div
            className={classnames({
              [`${allPrefixCls}-horizontal-title`]: true,
            })}
          >
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
          </div>
          <div className={classnames(`${allPrefixCls}-content`)}>
            <div>{children}</div>
            {extra !== '' && (
              <div className={`${allPrefixCls}-extra`}>{extra}</div>
            )}
          </div>
        </div>
        {error && !!error[fieldProps] && (
          <div className={`${allPrefixCls}-error-text`}>
            {error[fieldProps]}
          </div>
        )}
      </div>
    </Hidden>
  );
};

export default Title;
