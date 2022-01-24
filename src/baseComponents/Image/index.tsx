import React, { FC, CSSProperties, useEffect, useState } from 'react';
import classNames from 'classnames';
import ImgError from '../../assets/imgError.png';
import { allPrefixCls } from '../../const';

import './index.less';

interface ImageProps {
  id: string;
  src: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void;
  style?: CSSProperties;
  className?: string;
}

const prefixCls = `${allPrefixCls}-image`;

const Image: FC<ImageProps> = (props) => {
  const [height, setHeight] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { src, onClick, className, id, style } = props;

  useEffect(() => {
    const width = document.getElementById(id)?.clientWidth || 0;
    setHeight(width);
  }, []);

  return (
    <img
      id={id}
      src={loaded ? src : ImgError}
      className={classNames(
        {
          [prefixCls]: true,
        },
        className,
      )}
      style={{
        ...style,
        height,
      }}
      alt="img"
      onClick={onClick}
      onLoad={() => {
        setLoaded(true);
      }}
    />
  );
};

export default Image;
