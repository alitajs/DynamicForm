import React, { FC, ChangeEvent, useState } from 'react';
import { Button } from 'antd';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import FileGroup from './fileGroup';
import { INomarFileProps, INomarFileItemProps } from './interface';
import { allPcPrefixCls, allPrefixCls } from '../../const';
import FileIcon from '../../assets/file.png';

const prefixCls = `${allPrefixCls}-file`;
const pcPrefixCls = `${allPcPrefixCls}-file`;

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
    disabled = false,
    maxLength,
    isPc,
  } = props;

  const [selectable, setSelectable] = useState<boolean>(true);

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
        {!disabled && selectable && (
          <>
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
            <span className="alitajs-dform-file-extra">
              {isPc ? <Button>上传</Button> : extra}
            </span>
          </>
        )}
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

  const valueChange = (e: any[]) => {
    if (!!maxLength && maxLength <= e.length) {
      setSelectable(false);
    } else {
      setSelectable(true);
    }
  };

  return (
    <Title
      independentProps={{ positionType: 'vertical', ...props }}
      formFlag={formFlag}
      isPc={isPc}
      {...titleProps}
      extra={extraContent()}
    >
      <div className={isPc ? pcPrefixCls : prefixCls}>
        <Field
          formFlag={formFlag}
          name={fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          initialValue={defaultValue}
        >
          <FileGroup {...props} onChange={fileChange} valueChange={valueChange}>
            {selectable && (
              <div className="alitajs-dform-extra">{extraContent()}</div>
            )}
          </FileGroup>
        </Field>
      </div>
    </Title>
  );
};

DformFile.displayName = 'dformFile';
export default DformFile;
