import React, { FC, useMemo, useContext, useState } from 'react';
import classnames from 'classnames';
import { DformContext, DformContextProps } from '../Context';
import Hidden from '../Hidden';
import { allPrefixCls } from '../../const';
import { DFORM_COMP_DETAULT, NO_SUPPORT_VERTICAL } from '../../utils/menu';
import { TitleTypePorps } from '../../PropsType';

export interface TitleProps {
  children?: any;
  type: TitleTypePorps;
  extra?: string | React.ReactNode;
  independentProps?: any;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}

const Title: FC<TitleProps> = (props) => {
  const {
    children,
    type = '',
    independentProps = {},
    style = {},
    titleStyle = {},
  } = props;

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
    fieldName,
  } = independentProps;

  const fieldKey: any = fieldName || fieldProps;

  const [mregedRequired, setMregedRequired] = useState<boolean>(required);
  const [mregedHidden, setMregedHidden] = useState<boolean>(hidden);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  useMemo(() => {
    if (changeForm[fieldKey]?.required !== undefined) {
      setMregedRequired(changeForm[fieldKey]?.required);
    } else {
      setMregedRequired(required);
    }
    if (changeForm[fieldKey]?.hidden !== undefined) {
      setMregedHidden(changeForm[fieldKey]?.hidden);
    } else {
      setMregedHidden(hidden);
    }
  }, [changeForm[fieldKey], hidden, required]);

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
    <Hidden hidden={mregedHidden}>
      {renderHeader}
      <div className={`${allPrefixCls}-content`} style={style}>
        <div
          style={{
            borderBottom:
              style.background ||
              style.backgroundColor ||
              '0.01rem solid #e5e5e5',
          }}
          className={classnames(`${allPrefixCls}-cell`, {
            [`${allPrefixCls}${isVertical ? '-vertical' : ''}-item`]: true,
            [`${allPrefixCls}-error`]: errorValue && !!errorValue[fieldKey],
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
              <div style={titleStyle}>{title}</div>
              {subTitle}
              {extra !== '' && isVertical && (
                <div className={`${allPrefixCls}-extra`}>{extra}</div>
              )}
            </div>
          )}
          {children}
          {errorValue && !!errorValue[fieldKey] && (
            <div className={`${allPrefixCls}-error-text`}>
              {errorValue[fieldKey]}
            </div>
          )}
          {renderFooter}
        </div>
      </div>
    </Hidden>
  );
};

export default Title;
