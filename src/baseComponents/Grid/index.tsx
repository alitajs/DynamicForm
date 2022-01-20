import React, { FC } from 'react';
import GridItem from './GridItem';
import { toCSSLength, attachPropertiesToComponent } from '../../utils/tool';
import { allPrefixCls } from '../../const';
import { NativeProps } from '../../PropsType';
import './index.less';

type GridProps = {
  columns: number;
  gap?: number | [number, number];
} & NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'>;

const prefixCls = `${allPrefixCls}-grid`;

const Grid: FC<GridProps> = (props) => {
  const { children, columns, gap } = props;
  const style: GridProps['style'] & Record<'--columns', string> = {
    '--columns': columns.toString(),
  };

  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style['--gap-horizontal'] = toCSSLength(gap[0]);
      style['--gap-vertical'] = toCSSLength(gap[1]);
    } else {
      style['--gap'] = toCSSLength(gap);
    }
  }

  return (
    <div className={prefixCls} style={style}>
      {children}
    </div>
  );
};

export default attachPropertiesToComponent(Grid, { Item: GridItem });
