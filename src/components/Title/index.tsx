import React, { FC, useMemo, useContext, useState } from 'react';
import classnames from 'classnames';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import Hidden from '../Hidden';
import { allPrefixCls } from '../../const';
import { DFORM_COMP_DETAULT, NO_SUPPORT_VERTICAL } from '../../utils/menu';
import { TitleTypePorps } from '../../PropsType';

export interface TitleProps {
  children?: any;
  type: TitleTypePorps;
  // hidden?: boolean;
  // required?: boolean;
  // hasStar?: boolean;
  // title?: string;
  // subTitle?: string | React.ReactNode;
  extra?: string | React.ReactNode;
  // error: any;
  // fieldProps: string;
  independentProps?: any;
  // renderHeader?: string | React.ReactNode;
  // renderFooter?: string | React.ReactNode;
}

const Title: FC<TitleProps> = (props) => {
  const {
    children,
    type = '',
    independentProps = {},
  } = useMemo(() => {
    return { ...props, ...props.independentProps } as any;
  }, [props]);

  const {
    hidden = false,
    required = false,
    hasStar = true,
    title = '',
    subTitle,
    extra,
    fieldProps,
    renderFooter,
    renderHeader,
  } = independentProps;

  const [mregedRequired, setMregedRequired] = useState<boolean>(required);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  useMemo(() => {
    if (changeForm[fieldProps]?.required !== undefined) {
      setMregedRequired(changeForm[fieldProps]?.required);
    }
  }, [changeForm[fieldProps]]);

  // 表单对齐方向
  let positionType =
    independentProps.positionType || DFORM_COMP_DETAULT[type]?.positionType;

  // 是否是不可变更对齐方式的表单类型
  if (NO_SUPPORT_VERTICAL.includes(type)) {
    positionType = DFORM_COMP_DETAULT[type]?.positionType;
  }

  // @ts-ignore
  const { errorValue = {} } = useContext<DformContextProps>(DformContext);

  const isVertical = positionType === 'vertical';
  // `${allPrefixCls}-cell` 类名勿动，主要用来配置单一class 取消Group尾部下划线
  return (
    <Hidden hidden={hidden}>
      {renderHeader}
      <div
        className={classnames(`${allPrefixCls}-cell`, {
          [`${allPrefixCls}${isVertical ? '-vertical' : ''}-item`]: true,
          [`${allPrefixCls}-error`]: errorValue && !!errorValue[fieldProps],
        })}
      >
        {isVertical && (
          <div
            className={classnames({
              [`${allPrefixCls}-title`]: true,
              [`${allPrefixCls}-vertical-title`]: true,
            })}
          >
            {mregedRequired && hasStar && (
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
        {errorValue && !!errorValue[fieldProps] && (
          <div className={`${allPrefixCls}-error-text`}>
            {errorValue[fieldProps]}
          </div>
        )}
        {renderFooter}
      </div>
    </Hidden>
  );
};

export default Title;
