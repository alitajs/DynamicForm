import React, { FC, useEffect } from 'react';
import classnames from 'classnames';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import CustomGroup from './CustomGroup';
import { allPrefixCls, allPcPrefixCls } from '../../const';
import { INomarCustomPorps } from './interface';
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
    titleProps,
    formFlag = false,
    children,
    hasStar = true,
    positionType = 'vertical',
    labelNumber = 5,
    isPc,
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
    />
  );

  const fieldChange = (e: any) => {
    if (onChange) onChange(e);
  };

  return (
    <Title
      independentProps={{ positionType: 'vertical', ...props }}
      formFlag={formFlag}
      isPc={isPc}
      {...titleProps}
    >
      <div
        className={classnames({
          [`${allPrefixCls}-dom`]: true,
          [`${allPcPrefixCls}-dom`]: isPc,
        })}
      >
        {!isVertical && !isPc && cutomTitle()}
        <Field
          name={fieldProps}
          rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
          initialValue={defaultValue}
          formFlag={formFlag}
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
    </Title>
  );
};

DformCustom.displayName = 'dformCustom';
export default DformCustom;
