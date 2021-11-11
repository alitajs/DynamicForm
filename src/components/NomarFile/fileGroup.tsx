import React, { FC, useState, useEffect, forwardRef, useImperativeHandle, ChangeEvent } from 'react';
import { INomarFileProps, INomarFileItemProps } from './interface';
import _ from 'lodash';
import ClosePng from '../../assets/close.png';
import './index.less';
import { getRandom } from '../../utils';

const prefixCls = 'alitajs-dform-file';

interface IFileGroupProps extends INomarFileProps {
  value?: INomarFileItemProps[];
}

type IFileGroupPropsRef = (props: IFileGroupProps & { ref: any }, ref: any) => React.ReactElement<any, any> | null;

const FileGroup: IFileGroupPropsRef = forwardRef((props, ref) => {
  const {
    value = [],
    onChange,
    onClick,
    alias = { id: 'id', title: 'title' },
    upload,
  } = props;

  // const [val, setVal] = useState(value);

  const addFileChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    if (e.target.files) {
      const fileList = Object.keys(e.target.files).map(
        (item) => e.target.files[item],
      );

      const values = fileList.map(item => ({
        title: item.name,
        fileId: getRandom(),
      }));
      const allFiles = [...value, ...values];
      if (upload) {
        upload(fileList);
      }
      if (onChange) {
        onChange(allFiles, values, 'add');
      }
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      addFileChange
    }),

  )

  const del = (index: number) => {
    const newData = Array.from(value);
    newData.splice(index, 1);
    // setVal(newData);
    if (onChange) onChange(newData, value[index], 'delete');
  };

  const itemClick = (item: INomarFileItemProps) => {
    if (onClick) onClick(item);
  };

  return (
    <div className={`${prefixCls}-content`}>
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
});

export default FileGroup;
