import React, { FC } from 'react';
import classnames from 'classnames';
import { ClickEvent, StringEvent } from '@/PropsType';
import { IInputItemProps } from './interface';
import './index.less';

const InputItem: FC<IInputItemProps> = (props) => {
  const {
    isVertical = false,
    value = '',
    placeholder = '',
    onClick,
    readOnly = false,
    onChange,
    labelNumber = 5,
    coverStyle = {},
    disabled = false,
    extra = '',
    className = '',
    type = 'text',
  } = props;

  let inputRef: HTMLInputElement | null;

  const labelCls = classnames('am-input-label', 'alitajs-dform-label-item', {
    'am-input-label-2': labelNumber === 2,
    'am-input-label-3': labelNumber === 3,
    'am-input-label-4': labelNumber === 4,
    'am-input-label-5': labelNumber === 5,
    'am-input-label-6': labelNumber === 6,
    'am-input-label-7': labelNumber === 7,
  });

  const inputItemClick = (e: ClickEvent) => {
    if (onClick) onClick(e);
  };
  const inputItemChange = (e: StringEvent) => {
    if (onChange) onChange(e);
  };

  return (
    <div className="am-list-item am-list-item-middle alitajs-dform-input-item">
      <div className="am-list-line">
        {!isVertical && <div className={labelCls}>{props.children}</div>}
        <div
          className="alitajs-dform-input-value"
          style={{
            // width: isVertical ? '100%' : '60%',
            flex: '1',
          }}
          onClick={(e: ClickEvent) => {
            inputItemClick(e);
          }}
        >
          <input
            type="text"
            // eslint-disable-next-line no-return-assign
            ref={(el) => (inputRef = el)}
            value={value}
            readOnly={readOnly}
            style={{
              textAlign: isVertical ? 'left' : 'right',
              ...coverStyle,
            }}
            // unselectable="on"
            onFocus={() => {
              if (inputRef) inputRef.blur();
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              inputItemChange(e.target.value);
            }}
            className={classnames({
              'alitajs-dform-input-text': true,
              'alitajs-dform-disabled': disabled,
              [className]: className,
            })}
            placeholder={placeholder}
          />
          {extra || <div className="am-list-arrow am-list-arrow-horizontal" />}
        </div>
      </div>
    </div>
  );
};

export default InputItem;
