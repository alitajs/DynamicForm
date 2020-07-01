import React, { FC, useState } from 'react';
import { List } from 'antd-mobile';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import Field from '../Field';
import '../../styles/index.less';

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
}

const NomarCustom: FC<INomarCustomPorps> = props => {
  const [initValue, setInitValue] = useState<any>();
  const {
    fieldProps,
    required = false,
    hasStar = true,
    rules,
    title,
    positionType = 'vertical',
    CustomDom,
    customDomProps,
    subTitle,
    hidden = false,
  } = props;

  const isVertical = positionType === 'vertical';

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
    <>
      {!hidden && (
        <React.Fragment>
          {isVertical && (
            <div className="alitajs-dform-vertical-title">
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
                {title}
              </span>
              {subTitle}
            </div>
          )}
          <div
            className={classnames({
              'alitajs-dform-dom': true,
              'alitajs-dform-vertical-dom': isVertical,
            })}
          >
            <List.Item key={fieldProps} extra={dom()}>
              {required && hasStar && <span className="alitajs-dform-redStar">*</span>}
              <span id={`alita-dform-${fieldProps}`} className="alitajs-dform-title">
                {title}
              </span>
            </List.Item>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default NomarCustom;
