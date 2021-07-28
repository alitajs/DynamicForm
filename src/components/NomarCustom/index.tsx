import React, { FC, useState } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import Field from '../Field';
import { allPrefixCls } from '../../const/index';
import './index.less';

interface INomarCustomPorps {
  fieldProps: string;
  title: string;
  positionType?: 'horizontal' | 'vertical';
  required?: boolean;
  hasStar?: boolean;
  rules?: Rule[];
  onChange?: (currentActiveLink: any) => void;
  customDomProps?: any;
  CustomDom: any;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  extra?: string | React.ReactNode;
}

const NomarCustom: FC<INomarCustomPorps> = (props) => {
  const [initValue, setInitValue] = useState<any>();
  const {
    fieldProps,
    required = false,
    hasStar = true,
    rules,
    title,
    CustomDom,
    customDomProps,
    subTitle,
    extra,
    hidden = false,
  } = props;

  const dom = () => (
    <Field
      name={fieldProps}
      rules={rules || [{ required, message: `请选择${title}` }]}
      shouldUpdate={(prevValue: any, nextValue: any) => {
        setInitValue(nextValue && nextValue[fieldProps as any]);
        return prevValue !== nextValue;
      }}
    >
      <CustomDom {...customDomProps} initValue={initValue} />
    </Field>
  );

  return (
    <div className={`${allPrefixCls}-vertical-item`}>
      {!hidden && (
        <div
          className={classnames({
            // 'alitajs-dform-dom': true,
            'alitajs-dform-vertical-dom': true,
          })}
        >
          <div
            className={classnames({
              [`${allPrefixCls}-title`]: true,
              [`${allPrefixCls}-vertical-title`]: true,
            })}
          >
            {required && hasStar && (
              <div className={`${allPrefixCls}-redStar`}>*</div>
            )}
            <div>{title}</div>
            {subTitle}
            {extra !== '' && (
              <div className={`${allPrefixCls}-extra`}>{extra}</div>
            )}
          </div>
          {dom()}
        </div>
      )}
    </div>
  );
};

export default NomarCustom;
