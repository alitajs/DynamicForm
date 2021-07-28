import React, { FC } from 'react';
import { INomarFileProps, INomarFileItemProps } from './interface';
import ClosePng from '../../assets/close.png';
import './index.less';

const prefixCls = 'alitajs-dform-file';

interface IFileGroupProps extends INomarFileProps {
  initValue: INomarFileItemProps[];
}

const FileGroup: FC<IFileGroupProps> = (props) => {
  const {
    initValue = [],
    onChange,
    onClick,
    alias = { id: 'id', title: 'title' },
  } = props;

  const del = (index: number) => {
    const newData = JSON.parse(JSON.stringify(initValue));
    newData.splice(index, 1);
    if (onChange) onChange(newData, initValue[index]);
  };

  const itemClick = (item: INomarFileItemProps) => {
    if (onClick) onClick(item);
  };

  return (
    <div className={`${prefixCls}-content`}>
      {initValue.map((item: INomarFileItemProps, index: number) => (
        <div key={item[alias.id || 'id']} className={`${prefixCls}-item`}>
          <span
            className={`${prefixCls}-title`}
            onClick={() => {
              itemClick(item);
            }}
          >
            {item[alias.title || 'title']}
          </span>
          <img
            onClick={() => {
              del(index);
            }}
            src={ClosePng}
            alt=""
            className="alitajs-dform-close"
          />
        </div>
      ))}
    </div>
  );
};

export default FileGroup;
