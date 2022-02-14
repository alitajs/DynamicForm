import React, { FC, useState, useEffect } from 'react';
import { Rule } from 'rc-field-form/es/interface';
import classnames from 'classnames';
import Field from '../../baseComponents/Field';
import Title from '../../baseComponents/Title';
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
  CustomDom?: any;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  extra?: string | React.ReactNode;
  defaultValue?: string;
  titleProps?: any;
  formFlag?: boolean;
  children: React.ReactElement;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
}

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
    positionType,
  } = props;

  useEffect(() => {
    if (CustomDom || customDomProps) {
      console.warn(
        'DformCustom组件已放弃CustomDom、customDomProps属性，请切换为children',
      );
    }
  }, [CustomDom, customDomProps]);

  const dom = () => (
    <Field
      name={fieldProps}
      rules={[{ required, message: `请选择${title}` }, ...(rules || [])]}
      initialValue={defaultValue}
      formFlag={formFlag}
    >
      {children ? children : <CustomDom {...customDomProps} />}
    </Field>
  );

  // const isVertical =
  //   (formFlag ? titleProps?.positionType : positionType) === 'vertical';

  const Vertical = (
    <Title
      independentProps={{ positionType: 'vertical', ...props }}
      formFlag={formFlag}
      {...titleProps}
    >
      <div
        className={classnames('alitajs-dform-dom', {
          'alitajs-dform-vertical-dom': true,
        })}
      >
        {dom()}
      </div>
    </Title>
  );

  // const Horizontal = (
  //   <HorizontalTitle
  //     independentProps={{ positionType: 'vertical', ...props }}
  //     formFlag={formFlag}
  //     {...titleProps}
  //   >
  //     <div
  //       className={classnames('alitajs-dform-dom', {
  //         'alitajs-dform-vertical-dom': true,
  //       })}
  //     >
  //       {dom()}
  //     </div>
  //   </HorizontalTitle>
  // );

  // return isVertical ? Vertical : Horizontal;
  /**
   * 自定义组件本来实现的方案就不包含横向布局。
   * 后续若出现真实场景需要用到横向布局，请通过 positionType 判断直接修改样式即可。
   * 不需要新增一个横向布局的组件
   */
  TODO: return Vertical;
};

DformCustom.displayName = 'dformCustom';
export default DformCustom;
