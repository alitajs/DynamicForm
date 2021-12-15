import React, { FC, ChangeEvent } from 'react';
import Field from '../Field';
import Title from '../Title';
import FileGroup from './fileGroup';
import { INomarFileProps, INomarFileItemProps } from './interface';
import FileIcon from '../../assets/file.png';

const prefixCls = 'alitajs-dform-file';

const DformFile: FC<INomarFileProps> = (props) => {
  const {
    fieldProps,
    required = false,
    title,
    rules = [],
    extra = <img src={FileIcon} alt="" className={`${prefixCls}-img`} />,
    uploadExtra,
    onChange,
    defaultValue,
    upload,
    titleProps,
    fileProps,
    formFlag = false,
  } = props;

  // 该函数没被使用，因此注释
  const fileIns = (e: ChangeEvent<HTMLInputElement> | any) => {
    if (e.target.files) {
      const fileList = Object.keys(e.target.files).map(
        (item) => e.target.files[item],
      );
      upload(fileList);
    }
  };

  const extraContent = () => {
    return uploadExtra ? (
      <div className="alitajs-dform-file-input">{uploadExtra}</div>
    ) : (
      <React.Fragment>
        <label>
          <input
            type="file"
            multiple
            className="alitajs-dform-file-input"
            onChange={fileIns}
            {...fileProps}
            aria-labelledby={fieldProps}
            aria-label={fieldProps}
          />
        </label>
        <span className="alitajs-dform-file-extra">{extra}</span>
      </React.Fragment>
    );
  };

  const fileChange = (
    res: INomarFileItemProps[],
    item: INomarFileItemProps,
    type: 'add' | 'delete',
  ) => {
    if (onChange) onChange(res, item, type);
  };

  return (
    <Title
      independentProps={{ positionType: 'vertical', ...props }}
      formFlag={formFlag}
      {...titleProps}
      extra={extraContent()}
    >
      <div className={prefixCls}>
        <Field
          formFlag={formFlag}
          name={fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          initialValue={defaultValue}
        >
          <FileGroup {...props} onChange={fileChange} />
        </Field>
      </div>
    </Title>
  );
};

DformFile.displayName = 'dformFile';
export default DformFile;
