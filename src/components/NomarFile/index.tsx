import React, { FC, useState, ChangeEvent } from 'react';
import Field from '../Field';
import FileGroup from './fileGroup';
import { INomarFileProps, INomarFileItemProps } from './interface';
import FileIcon from '../../assets/file.png';

const prefixCls = 'alitajs-dform-file';

const NomarFile: FC<INomarFileProps> = (props) => {
  const [initValue, setInitValue] = useState([]);

  const {
    fieldProps,
    required = false,
    title,
    rules,
    extra = <img src={FileIcon} alt="" className={`${prefixCls}-img`} />,
    onChange,
    upload,
  } = props;

  const fileIns = (e: ChangeEvent<HTMLInputElement> | any) => {
    console.log("fileIns");
    if (e.target.files) {
      const fileList = Object.keys(e.target.files).map(
        (item) => e.target.files[item],
      );
      upload(fileList);
    }
  };

  // const extraContent = () => (
  //   <React.Fragment>
  //     <input
  //       type="file"
  //       multiple
  //       className="alitajs-dform-file-input"
  //       onChange={fileIns}
  //     />
  //     <span className="alitajs-dform-file-extra">{extra}</span>
  //   </React.Fragment>
  // );

  const fileChange = (
    res: INomarFileItemProps[],
    item: INomarFileItemProps,
  ) => {
    if (onChange) onChange(res, item);
  };

  return (
    <div className={prefixCls}>
      <Field
        name={fieldProps}
        rules={rules || [{ required, message: `请选择${title}` }]}
        shouldUpdate={(prevValue: any, nextValue: any) => {
          setInitValue(nextValue && nextValue[fieldProps as any]);
          return prevValue !== nextValue;
        }}
      >
        <FileGroup {...props} initValue={initValue} onChange={fileChange} />
      </Field>
    </div>
  );
};

export default NomarFile;
