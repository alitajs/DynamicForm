import React, { FC, useState, ChangeEvent } from 'react';
import Field from '../Field';
import FileGroup from './fileGroup';
import FileIcon from '../../assets/file.png';
import { INomarFileProps, INomarFileItemProps } from './interface';

const NomarFile: FC<INomarFileProps> = props => {
  const [initValue, setInitValue] = useState([]);

  const {
    fieldProps,
    required = false,
    title,
    rules,
    hasStar = true,
    subTitle,
    hidden = false,
    extra = <img src={FileIcon} alt="" className="alitajs-dform-file-img" />,
    onChange,
    upload,
  } = props;

  const fileIns = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Object.keys(e.target.files).map(item => e.target.files[item]);
      upload(fileList);
    }
  };

  const extraContent = () => (
    <React.Fragment>
      <input type="file" multiple className="alitajs-dform-file-input" onChange={fileIns} />
      <span className="alitajs-dform-file-extra">{extra}</span>
    </React.Fragment>
  );

  const fileChange = (res: INomarFileItemProps[], item: INomarFileItemProps) => {
    if (onChange) onChange(res, item);
  };

  return (
    <>
      <React.Fragment>
        {!hidden && (
          <div className="alitajs-dform-file">
            <div className="alitajs-dform-input-title">
              <div className="alitajs-dform-vertical-title">
                {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
                <span className="alitajs-dform-title">
                  {title}
                </span>
                {subTitle}
              </div>
              <div className="alitajs-dform-extra">{extraContent()}</div>
            </div>
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
        )}
      </React.Fragment>
    </>
  );
};

export default NomarFile;
