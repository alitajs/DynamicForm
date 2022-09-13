import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import TouchFeedback from 'rmc-feedback';
import { ClickEvent, StringEvent } from '../../PropsType';
import { IInputItemProps } from './interface';
import { allPrefixCls } from '../../const/index';
import './index.less';

const prefixCls = 'alitajs-dform-input-item';

const InputItem: FC<IInputItemProps> = (props) => {
  const {
    isVertical = false,
    value = '',
    placeholder = '',
    onClick,
    editable = true,
    onChange,
    labelNumber = 7,
    coverStyle = {},
    disabled = false,
    extra = '',
    className = '',
    onBlur,
    onFocus,
    type = 'text',
    clear = false,
    maxLength,
    fieldProps,
    unit,
    children,
    ...otherProps
  } = props;
  const [val, setVal] = useState(value);
  const [clearShow, setClearShow] = useState<boolean>(false);
  useEffect(() => {
    setVal(value);
  }, [value]);

  const labelCls = classnames({
    [`${allPrefixCls}-input-label-0`]: labelNumber === 0,
    [`${allPrefixCls}-input-label-2`]: labelNumber === 2,
    [`${allPrefixCls}-input-label-3`]: labelNumber === 3,
    [`${allPrefixCls}-input-label-4`]: labelNumber === 4,
    [`${allPrefixCls}-input-label-5`]: labelNumber === 5,
    [`${allPrefixCls}-input-label-6`]: labelNumber === 6,
    [`${allPrefixCls}-input-label-7`]: labelNumber === 7,
  });

  const inputItemClick = (e: ClickEvent) => {
    if (onClick) onClick(e);
  };
  const inputItemChange = (e: StringEvent) => {
    const rawVal = e;
    let ctrlValue = rawVal;
    switch (type) {
      case 'bankCard':
        ctrlValue = rawVal.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
        break;
      case 'phone':
        ctrlValue = rawVal.replace(/\D/g, '').substring(0, 11);
        const valueLen = ctrlValue.length;
        if (valueLen > 3 && valueLen < 8) {
          ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(3)}`;
        } else if (valueLen >= 8) {
          ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(
            3,
            4,
          )} ${ctrlValue.substr(7)}`;
        }
        break;
      case 'number':
        ctrlValue = rawVal.replace(/\D/g, '');
        if (ctrlValue && otherProps.min && parseFloat(ctrlValue) < otherProps.min) {
          ctrlValue = otherProps.min.toString()
        }
        if (ctrlValue && otherProps.max && parseFloat(ctrlValue) > otherProps.max) {
          ctrlValue = otherProps.max.toString()
        }
        break;
      case 'text':
      case 'password':
      default:
        break;
    }
    if (maxLength) {
      ctrlValue = ctrlValue.substr(0, maxLength);
    }
    setVal(ctrlValue);
    if (onChange) onChange(ctrlValue);
  };

  let inputType: any = 'text';
  if (type === 'bankCard' || type === 'phone') {
    inputType = 'tel';
  } else {
    inputType = type;
  }

  /**
   * 清除按钮点击事件
   */
  const clearInput = () => {
    setVal('');
    if (onChange) onChange('');
  };

  const renderUnit = () => {
    return <div className={`${prefixCls}-unit`}>{unit}</div>;
  };

  return (
    <div className={prefixCls}>
      {!isVertical && <div className={labelCls}>{props.children}</div>}
      <div
        className={classnames({
          [`${prefixCls}-value`]: true,
          [`${prefixCls}-focus`]: clearShow,
        })}
        onClick={(e: ClickEvent) => {
          if (disabled) return;
          inputItemClick(e);
        }}
      >
        <input
          {...otherProps}
          type={inputType}
          value={val}
          aria-label={fieldProps}
          readOnly={!editable || disabled}
          style={{
            textAlign: isVertical ? 'left' : 'right',
            minHeight: '0.42rem',
            ...coverStyle,
          }}
          onFocus={(e: any) => {
            if (disabled) return;
            setClearShow(true);
            if (onFocus) onFocus(e.target.value);
          }}
          onBlur={(e: any) => {
            if (disabled) return;
            if (onBlur) onBlur(e.target.value);
            setTimeout(() => {
              setClearShow(false);
            }, 100);
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            inputItemChange(e.target.value);
          }}
          className={classnames({
            [`${prefixCls}-text`]: true,
            'alitajs-dform-disabled': !editable || disabled,
            [className]: className,
          })}
          placeholder={placeholder}
        />
        {clear && editable && !disabled && val && `${val}`.length > 0 ? (
          <TouchFeedback activeClassName={`${allPrefixCls}-clear-active`}>
            <div className={`${allPrefixCls}-clear`} onClick={clearInput} />
          </TouchFeedback>
        ) : null}
        {unit && unit.length > 0 && renderUnit()}
        {extra}
      </div>
    </div>
  );
};

export default InputItem;
