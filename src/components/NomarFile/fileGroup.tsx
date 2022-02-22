import React, { FC, useEffect, ChangeEvent } from 'react';
import classNames from 'classnames';
import PcLayout from '../../baseComponents/PcLayout';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { DformContext } from '../../baseComponents/DynamicForm';
import { INomarFileProps, INomarFileItemProps } from './interface';
import { allPrefixCls, allPcPrefixCls } from '../../const';
import ClosePng from '../../assets/close.png';
import './index.less';

const prefixCls = `${allPrefixCls}-file`;
const pcPrefixCls = `${allPcPrefixCls}-file`;

interface IFileGroupProps extends INomarFileProps {
  value?: INomarFileItemProps[];
  valueChange: (res: any[]) => void;
}

const FileGroup: FC<IFileGroupProps> = (props) => {
  const {
    value = [],
    onChange,
    onClick,
    alias = { id: 'id', title: 'title' },
    disabled = false,
    valueChange,
    positionType = 'vertical',
    required = false,
    hasStar = true,
    title = '',
    labelNumber = 5,

    children,
  } = props;

  const isVertical = positionType === 'vertical';

  useEffect(() => {
    valueChange(value);
  }, [JSON.stringify(value || [])]);

  const del = (index: number) => {
    const newData = Array.from(value);
    newData.splice(index, 1);
    if (onChange) onChange(newData, value[index], 'delete');
  };

  const itemClick = (item: INomarFileItemProps) => {
    if (onClick) onClick(item);
  };

  const fileContent = (isPc: boolean) => {
    return (
      <div
        className={classNames({
          [`${prefixCls}-content`]: true,
          [`${pcPrefixCls}-content`]: isPc,
        })}
      >
        {value.map((item: INomarFileItemProps, index: number) => (
          <div key={item[alias.id || 'id']} className={`${prefixCls}-item`}>
            <span
              className={`${prefixCls}-title`}
              onClick={() => {
                itemClick(item);
              }}
            >
              {item[alias.title || 'title']}
            </span>
            {!disabled && (
              <img
                onClick={() => {
                  del(index);
                }}
                src={ClosePng}
                alt=""
                className="alitajs-dform-close"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <DformContext.Consumer>
      {({ isPc }: any) => {
        if (!isPc) {
          return fileContent(isPc);
        } else {
          return (
            <PcLayout
              isVertical={isVertical}
              left={
                <HorizontalTitle
                  required={required}
                  hasStar={hasStar}
                  title={title}
                  labelNumber={labelNumber}
                  isVertical={isVertical}
                />
              }
              right={
                <div>
                  {children}
                  {fileContent(isPc)}
                </div>
              }
            />
          );
        }
      }}
    </DformContext.Consumer>
  );
};

export default FileGroup;
