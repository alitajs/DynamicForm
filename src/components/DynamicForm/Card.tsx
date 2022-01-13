import React, { FC, useState } from 'react';
import classnames from 'classnames';
import { Icon } from 'antd-mobile-v2';
import CSSTransition from 'react-transition-group/CSSTransition';
import ExpandView from './components/ExpandView';
import useToggle from '../../hooks/useToggle';
import { allPrefixCls } from '../../const/index';
import { CardProps } from '../../PropsType';
import './index.less';

const prefixCls = `${allPrefixCls}-card`;

const prefixClsExtends = `${prefixCls}-extends`;

const Card: FC<CardProps> = ({
  children,
  leftView,
  require,
  title,
  rightView,
  classname,
  border = true,
  extandPostion = '',
  defaultExtand = true,
  extandChange,
}) => {
  const [isExtand, toggleExtand] = useToggle(defaultExtand);

  return (
    <div
      className={classnames({
        [prefixCls]: true,
        classname,
        [`${prefixCls}-border`]: border,
      })}
    >
      <div className={`${prefixCls}-title-box`}>
        {leftView}
        {require && <div className={`${prefixCls}-require`}>*</div>}
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {rightView && rightView}
        {extandPostion === 'top' && (
          <div
            className={`${prefixCls}-extends-icon`}
            onClick={() => {
              toggleExtand();
              if (extandChange) extandChange(!isExtand);
            }}
          >
            <Icon size="xxs" type={isExtand ? 'up' : 'down'} />
          </div>
        )}
      </div>
      <div className={prefixClsExtends}>
        <CSSTransition
          in={isExtand}
          classNames={`${prefixClsExtends}-body`}
          timeout={200}
        >
          {(state) => {
            return (
              <div className={`${prefixClsExtends}-body`}>
                <div
                  className={classnames(`${prefixClsExtends}-animation`, {
                    [`${prefixClsExtends}-entered`]: state === 'entered',
                  })}
                >
                  {children}
                </div>
                {extandPostion === 'bottom' && (
                  <ExpandView
                    isExtand={isExtand}
                    onChange={() => {
                      toggleExtand();
                      if (extandChange) extandChange(!isExtand);
                    }}
                  />
                )}
              </div>
            );
          }}
        </CSSTransition>
      </div>
    </div>
  );
};

export default Card;
