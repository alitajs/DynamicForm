import React, { FC } from 'react';
import classnames from 'classnames';
import { ITextItemProps } from './interface';
import '../../styles/index.less';

const TextItem: FC<ITextItemProps> = props => {
  const {
    isVertical = false,
    value = '',
    placeholder = '请输入',
    onClick,
    labelNumber = 5,
    coverStyle = {},
    extra,
    disabled,
  } = props;

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
          onClick={() => {
            inputItemClick();
          }}
        >
          <div
            className={value ? 'alitajs-dform-text-text' : 'alitajs-dform-placeholder'}
            style={{
              textAlign: isVertical ? 'left' : 'right',
              ...coverStyle,
            }}
          >
            {value || placeholder}
          </div>
          {!isVertical && <div className="am-input-extra">{extra}</div>}
        </div>
      </div>
    </div>
  );
};

export default TextItem;
