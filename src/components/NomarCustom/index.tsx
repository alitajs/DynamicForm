import React, { FC, useEffect } from 'react';
import classnames from 'classnames';
import Field from '../Field';
import Title from '../Title';
import CustomGroup from './CustomGroup';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import { INomarCustomPorps } from './interface';
import { allPrefixCls } from '../../const';
import './index.less';

const DformCustom: FC<INomarCustomPorps> = (props) => {
  const {
    defaultValue,
    fieldProps,
    required = false,
    rules = [],
    title,
    CustomDom,
    customDomProps,
    formFlag = true,
    children,
    hasStar = true,
    positionType = 'vertical',
    labelNumber = 7,
    onChange,
  } = props;

  const isVertical = positionType === 'vertical';

  useEffect(() => {
    if (CustomDom || customDomProps) {
      console.warn(
        'DformCustom组件已放弃CustomDom、customDomProps属性，请切换为children',
      );
    }
  }, [CustomDom, customDomProps]);

  const cutomTitle = () => (
    <HorizontalTitle
      required={required}
      hasStar={hasStar}
      title={title}
      labelNumber={labelNumber}
      isVertical={isVertical}
      fieldProps={fieldProps}
    />
  );

  const fieldChange = (e: any) => {
    if (onChange) onChange(e);
  };

  const childrenContent = () => {
    return (
      <>
        <div
          className={classnames({
            [`${allPrefixCls}-dom`]: true,
          })}
        >
          {!isVertical && cutomTitle()}
          <Field
            name={fieldProps}
            title={title}
            required={required}
            rules={rules}
            initialValue={defaultValue}
            formFlag={formFlag}
            type="custom"
          >
            <CustomGroup
              isVertical={isVertical}
              CustomDom={CustomDom}
              customDomProps={customDomProps}
              cutomTitle={cutomTitle()}
              onChange={fieldChange}
            >
              {children}
            </CustomGroup>
          </Field>
        </div>
      </>
    );
  };

  return (
    <Title
      independentProps={{ ...props, children: childrenContent() }}
      formFlag={formFlag}
      type="custom"
    />
  );
};

DformCustom.displayName = 'dformCustom';
export default DformCustom;
