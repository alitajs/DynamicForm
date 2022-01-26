import React, { FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { allPrefixCls } from '../../const';

import './index.less';

interface TextareaItemProps {
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  value?: string;
  onChange: (res: string) => void;
}

const prefixCls = `${allPrefixCls}-textarea`;

const TextareaItem: FC<TextareaItemProps> = (props) => {
  const {
    className,
    style,
    placeholder = '请输入',
    value = '',
    onChange,
  } = props;

  const areaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e.target.value);
  };
  return (
    <div>
      <textarea
        placeholder={placeholder}
        className={classNames(
          {
            [prefixCls]: true,
          },
          className,
        )}
        style={style}
        value={value}
        onChange={areaChange}
      />
    </div>
  );
};

export default TextareaItem;
