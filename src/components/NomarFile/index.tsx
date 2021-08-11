import React, { FC, useState, ChangeEvent } from 'react';
import Field from '../Field';
import FileGroup from './fileGroup';
import { INomarFileProps, INomarFileItemProps } from './interface';
import { allPrefixCls } from '../../const/index';
import FileIcon from '../../assets/file.png';
import Title from '../Title';

const prefixCls = 'alitajs-dform-file';

const NomarFile: FC<INomarFileProps> = (props) => {
  const [initValue, setInitValue] = useState([]);

  const {
    fieldProps,
    required = false,
    title,
    rules,
    hasStar = true,
    subTitle,
    hidden = false,
    extra = <img src={FileIcon} alt="" className={`${prefixCls}-img`} />,
    onChange,
    upload,
    errorValue,
  } = props;

  const fileIns = (e: ChangeEvent<HTMLInputElement> | any) => {
    if (e.target.files) {
      const fileList = Object.keys(e.target.files).map(
        (item) => e.target.files[item],
      );
      upload(fileList);
    }
  };

  const extraContent = () => (
    <React.Fragment>
      <input
        type="file"
        multiple
        className="alitajs-dform-file-input"
        onChange={fileIns}
      />
      <span className="alitajs-dform-file-extra">{extra}</span>
    </React.Fragment>
  );

  const fileChange = (
    res: INomarFileItemProps[],
    item: INomarFileItemProps,
  ) => {
    if (onChange) onChange(res, item);
  };

  return (
    <Title
      positionType="vertical"
      hidden={hidden}
      required={required}
      hasStar={hasStar}
      title={title}
      subTitle={subTitle}
      extra={extraContent()}
      error={errorValue}
      fieldProps={fieldProps}
    >
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
    </Title>
  );
};

export default NomarFile;
