import React, { FC } from 'react';
import classnames from 'classnames';
import { IInputItemProps } from './interface';
import '../../styles/index.less';

const InputItem: FC<IInputItemProps> = props => {
  const {
    isVertical = false,
    value = '',
    placeholder = '',
    onClick,
    readOnly = false,
    onChange,
    labelNumber = 5,
    coverStyle = {},
  } = props;

  const labelCls = classnames('am-input-label', 'alitajs-dform-input-tltle', {
    'am-input-label-2': labelNumber === 2,
    'am-input-label-3': labelNumber === 3,
    'am-input-label-4': labelNumber === 4,
    'am-input-label-5': labelNumber === 5,
    'am-input-label-6': labelNumber === 6,
    'am-input-label-7': labelNumber === 7,
  });

  const inputItemClick = () => {
    if (onClick) onClick();
  };
  const inputItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          onClick={() => {
            inputItemClick();
          }}
        >
          <input
            type="text"
            value={value}
            readOnly={readOnly}
            style={{
              textAlign: isVertical ? 'left' : 'right',
              ...coverStyle,
            }}
            onChange={e => {
              inputItemChange(e);
            }}
            className="alitajs-dform-input-text"
            placeholder={placeholder}
          />
          <img
            className="alitajs-dform-right"
            src="data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2216%22%20height%3D%2226%22%20viewBox%3D%220%200%2016%2026%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cg%20id%3D%22UI-KIT_%E5%9F%BA%E7%A1%80%E5%85%83%E4%BB%B6%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20id%3D%229.9%E5%9F%BA%E7%A1%80%E5%85%83%E4%BB%B6%22%20transform%3D%22translate(-5809.000000%2C%20-8482.000000)%22%20fill%3D%22%23C7C7CC%22%3E%3Cpolygon%20id%3D%22Disclosure-Indicator%22%20points%3D%225811%208482%205809%208484%205820.5%208495%205809%208506%205811%208508%205825%208495%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default InputItem;
