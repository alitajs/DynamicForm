import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import ClosePng from '../../assets/close.png';
import { ITextItemProps } from './interface';
import { allPrefixCls } from '../../const/index';

import './index.less';

const prefixCls = 'alitajs-dform-text-item';

const TextItem: FC<ITextItemProps> = (props) => {
  const [overflowFlag, setOverflowFlag] = useState<boolean>(true); // 展开收起标识
  const [lineHeightFlag, setLineHeightFlag] = useState<boolean>(false); // 文字行数是否超过 maxLength
  const [currentCoverStyle, setCurrentCoverStyle] = useState({});

  const {
    isVertical = false,
    value = '',
    placeholder = '请输入',
    onClick,
    labelNumber = 5,
    coverStyle = {},
    extra,
    maxLine,
    disabled = false,
    fieldProps,
    className = '',
    arrow = true,
    ellipsis = true,
    clear = false,
    clearClick = () => {},
  } = props;

  useEffect(() => {
    const textIds = document.getElementById(`text-${fieldProps}`);
    if (textIds) {
      const lineHeight = window.getComputedStyle(textIds, null).lineHeight;
      const delValue = (textIds?.clientHeight + 2) / parseInt(lineHeight, 10);
      if (maxLine) {
        // eslint-disable-next-line prefer-destructuring
        if (delValue > maxLine) {
          setLineHeightFlag(true);
        } else {
          setLineHeightFlag(false);
        }
      }
    }
  }, [value]);

  useEffect(() => {
    if (coverStyle && Object.keys(coverStyle)?.length) {
      const newStyle = JSON.parse(JSON.stringify(coverStyle));
      if (!value && coverStyle.color) delete newStyle.color;
      setCurrentCoverStyle({ ...newStyle });
    }
  }, [value, coverStyle]);

  const labelCls = classnames({
    [`${allPrefixCls}-input-label-0`]: labelNumber === 0,
    [`${allPrefixCls}-input-label-2`]: labelNumber === 2,
    [`${allPrefixCls}-input-label-3`]: labelNumber === 3,
    [`${allPrefixCls}-input-label-4`]: labelNumber === 4,
    [`${allPrefixCls}-input-label-5`]: labelNumber === 5,
    [`${allPrefixCls}-input-label-6`]: labelNumber === 6,
    [`${allPrefixCls}-input-label-7`]: labelNumber === 7,
    [`${allPrefixCls}-input-label-auto`]: labelNumber > 7,
  });

  const inputItemClick = () => {
    if (disabled) return;
    if (onClick) onClick(value);
  };

  return (
    <div className={prefixCls}>
      {!isVertical && (
        <div
          className={classnames({
            [labelCls]: true,
            [`${allPrefixCls}-input-label-min-width`]: value?.length > 10,
          })}
        >
          {props.children}
        </div>
      )}
      <div
        className={classnames({
          [`${prefixCls}-value`]: true,
          [`${allPrefixCls}-ellipsis`]: ellipsis,
          [`${prefixCls}-min-width`]: labelNumber > 7,
        })}
      >
        <div
          className={classnames({
            [`${prefixCls}-content`]: !!value,
            [`${prefixCls}-content-padding`]: !isVertical,
            [`${allPrefixCls}-placeholder`]: !value,
            [`${allPrefixCls}-ellipsis`]: ellipsis,
          })}
          onClick={() => {
            inputItemClick();
          }}
        >
          <div
            id={`text-${fieldProps}`}
            className={classnames({
              [`${prefixCls}-text`]: true,
              'alitajs-dform-disabled': disabled && value,
              [className]: className,
            })}
            style={{
              textAlign: isVertical ? 'left' : 'right',
              WebkitLineClamp: maxLine,
              display:
                maxLine && overflowFlag && lineHeightFlag ? '-webkit-box' : '',
              ...currentCoverStyle,
            }}
          >
            {value || placeholder}
          </div>
          {maxLine && lineHeightFlag && (
            <div
              className={`${prefixCls}-overflow`}
              onClick={() => {
                setOverflowFlag(!overflowFlag);
              }}
            >
              {overflowFlag ? '更多' : '收起'}
            </div>
          )}
        </div>
        {clear && value && !disabled && (
          <img
            className={`${allPrefixCls}-close`}
            src={ClosePng}
            alt=""
            onClick={clearClick}
          />
        )}
      </div>
      <div className={`${allPrefixCls}-right-content`}>
        {arrow && <div className={`${allPrefixCls}-arrow-horizontal`} />}
        {!isVertical && <div className="am-input-extra">{extra}</div>}
      </div>
    </div>
  );
};

export default TextItem;
