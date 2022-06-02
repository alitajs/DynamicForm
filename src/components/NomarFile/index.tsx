import React, { FC, ChangeEvent, useState, useContext, useMemo } from 'react';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import Field from '../Field';
import Title from '../../baseComponents/Title';
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
    fileProps,
    disabled = false,
    maxLength,
    hidden = false,
    boxStyle,
    titleStyle,
    formFlag = true,
  } = props;

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(disabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);
  const [selectable, setSelectable] = useState<boolean>(true);

  useMemo(() => {
    if (changeForm[fieldProps]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldProps]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldProps], disabled]);

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
        {!mregedDisabled && selectable && (
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
            <span className="alitajs-dform-file-extra">{extra}</span>
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
      type="file"
      independentProps={{
        positionType: 'vertical',
        ...props,
        extra: extraContent(),
      }}
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <div className={prefixCls}>
        <Field
          type="file"
          title={title}
          required={required}
          rules={rules}
          name={fieldProps}
          initialValue={defaultValue}
          params={{
            hidden,
            formFlag,
          }}
        >
          <FileGroup
            {...props}
            disabled={mregedDisabled}
            onChange={fileChange}
            valueChange={valueChange}
          />
        </Field>
      </div>
    </Title>
  );
};

DformFile.displayName = 'dformFile';
export default DformFile;
