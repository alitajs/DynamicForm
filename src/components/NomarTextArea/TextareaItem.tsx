import React, {
  FC,
  useRef,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import PcLayout from '../../baseComponents/PcLayout';
import { DformContext } from '../../baseComponents/DynamicForm';
import { allPrefixCls, allPcPrefixCls } from '../../const';

import { TextareaItemProps } from './interface';
import './index.less';

const prefixCls = `${allPrefixCls}-textarea`;

const { TextArea } = Input;

interface ITextareaItemProps extends TextareaItemProps {
  title: ReactNode;
  isVertical: boolean;
}

export type TextAreaRef = {
  focus: () => void;
  blur: () => void;
};

const TextareaItem = forwardRef<TextAreaRef, ITextareaItemProps>(
  (props: ITextareaItemProps, ref) => {
    const nativeTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const {
      className,
      coverStyle,
      placeholder = '请输入',
      value = '',
      onChange,
      title,
      id,
      maxLength,
      showCount,
      onClick,
      disabled = false,
      editable = true,
      autoSize = false,
      positionType = 'horizontal',
      labelNumber = 5,
      isVertical,
      ...otherProps
    } = props;

    useImperativeHandle(ref, () => ({
      focus: () => {
        nativeTextAreaRef.current?.focus();
      },
      blur: () => {
        nativeTextAreaRef.current?.blur();
      },
    }));

    useEffect(() => {
      if (!autoSize) return;
      const textArea = nativeTextAreaRef.current;
      if (!textArea) return;
      textArea.style.height = 'auto';
      let height = textArea.scrollHeight;

      if (typeof autoSize === 'object') {
        const computedStyle = window.getComputedStyle(textArea);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        if (autoSize.minRows) {
          height = Math.max(height, autoSize.minRows * lineHeight);
        }
        if (autoSize.maxRows) {
          height = Math.min(height, autoSize.maxRows * lineHeight);
        }
      }

      textArea.style.height = `${height}px`;
    }, [value, autoSize]);

    const areaChange = (e: string) => {
      if (onChange) onChange(e);
    };

    let count: ReactNode;
    if (typeof showCount === 'function') {
      count = showCount(value.length, maxLength);
    } else if (showCount) {
      count = (
        <div className={`${prefixCls}-count`}>
          {maxLength === undefined
            ? value.length
            : value.length + '/' + maxLength}
        </div>
      );
    }

    const showTextareaDom = () => {
      return (
        <div
          className={classNames({
            [`${prefixCls}-content`]: true,
            [`${prefixCls}-padding`]: !isVertical,
          })}
        >
          <textarea
            ref={nativeTextAreaRef}
            {...otherProps}
            placeholder={placeholder}
            className={classNames(
              {
                [prefixCls]: true,
                [`${prefixCls}-disabled`]: disabled,
              },
              className,
            )}
            readOnly={!editable || disabled}
            maxLength={maxLength}
            style={coverStyle}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              areaChange(e.target.value);
            }}
            onFocus={(e) => {
              props.onFocus?.(e.target.value);
            }}
            onBlur={(e) => {
              props.onBlur?.(e.target.value);
            }}
            id={id}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              if (!disabled && onClick) onClick(e);
            }}
          />
          {count}
        </div>
      );
    };

    return (
      <DformContext.Consumer>
        {({ isPc }: any) => {
          return (
            <>
              {!isPc && (
                <>
                  {!isVertical && (
                    <div className={`${prefixCls}-wrapper`}>
                      {title}
                      {showTextareaDom()}
                    </div>
                  )}
                  {isVertical && showTextareaDom()}
                </>
              )}
              {isPc && (
                <PcLayout
                  isVertical={isVertical}
                  left={title}
                  className={`${allPcPrefixCls}-textarea`}
                  right={
                    <TextArea
                      {...otherProps}
                      autoSize={autoSize}
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        areaChange(e.target.value)
                      }
                      showCount={showCount}
                      maxLength={maxLength}
                      disabled={disabled || !editable}
                      placeholder={placeholder}
                      className={className}
                      style={{
                        flex: '1',
                        ...coverStyle,
                      }}
                      onFocus={(e) => {
                        props.onFocus?.(e.target.value);
                      }}
                      onBlur={(e) => {
                        props.onBlur?.(e.target.value);
                      }}
                      id={id}
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        if (!disabled && onClick) onClick(e);
                      }}
                    />
                  }
                />
              )}
            </>
          );
        }}
      </DformContext.Consumer>
    );
  },
);

export default TextareaItem;
