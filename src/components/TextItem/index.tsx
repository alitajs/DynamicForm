import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { ITextItemProps } from './interface';
import '../../styles/index.less';

const TextItem: FC<ITextItemProps> = props => {
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
    disabled,
    fieldProps,
  } = props;

  useEffect(() => {
    const textIds = document.getElementById(`text-${fieldProps}`);
    if (maxLine && textIds) {
      // eslint-disable-next-line prefer-destructuring
      const lineHeight = window.getComputedStyle(textIds, null).lineHeight;
      const delValue = (textIds?.clientHeight + 2) / parseInt(lineHeight, 10);
      if (delValue > maxLine) {
        setLineHeightFlag(true);
      } else {
        setLineHeightFlag(false);
      }
    }
  }, [value]);

  useEffect(() => {
    if (coverStyle && Object.keys(coverStyle).length) {
      let newStyle = JSON.parse(JSON.stringify(coverStyle));
      if (!value && coverStyle.color) delete newStyle.color;
      setCurrentCoverStyle({ ...newStyle });
    }
  }, [value, coverStyle]);

  const labelCls = classnames('am-input-label', 'alitajs-dform-item', {
    'am-input-label-2': labelNumber === 2,
    'am-input-label-3': labelNumber === 3,
    'am-input-label-4': labelNumber === 4,
    'am-input-label-5': labelNumber === 5,
    'am-input-label-6': labelNumber === 6,
    'am-input-label-7': labelNumber === 7,
  });

  const inputItemClick = () => {
    if (disabled) return;
    if (onClick) onClick(value);
  };

  return (
    <div className="am-list-item am-list-item-middle alitajs-dform-text-item">
      <div className="am-list-line">
        {!isVertical && <div className={labelCls}>{props.children}</div>}
        <div
          className="alitajs-dform-text-value"
          style={{
            flex: '1',
          }}
        >
          <div
            className={value ? 'alitajs-dform-text-content' : 'alitajs-dform-placeholder'}
            onClick={() => {
              inputItemClick();
            }}
          >
            <div
              id={`text-${fieldProps}`}
              className="alitajs-dform-text-text"
              style={{
                textAlign: isVertical ? 'left' : 'right',
                WebkitLineClamp: maxLine,
                display: maxLine && overflowFlag && lineHeightFlag ? '-webkit-box' : '',
                ...currentCoverStyle,
              }}
            >
              {value || placeholder}
            </div>
            {maxLine && lineHeightFlag && (
              <div
                className="alitajs-dform-text-overflow"
                onClick={() => {
                  setOverflowFlag(!overflowFlag);
                }}
              >
                {overflowFlag ? '更多' : '收起'}
              </div>
            )}
          </div>
          {!isVertical && <div className="am-input-extra">{extra}</div>}
        </div>
      </div>
    </div>
  );
};

export default TextItem;
