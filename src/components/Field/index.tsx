import React, { FC, useContext, useState, useMemo } from 'react';
import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import { TitleTypePorps } from '../../PropsType';
import { PLACEHOLDER_MENU } from '../../utils/menu';
import '../../styles/index.less';

export interface CustomFieldProps extends FieldProps {
  params?: any;
  style?: React.CSSProperties;
  title?: string;
  required?: boolean;
  type: TitleTypePorps;
}

const CustomField: FC<CustomFieldProps> = (props: any) => {
  const {
    rules = [],
    params = {},
    style = {},
    required = false,
    title = '',
    type,
    name,
    ...restProps
  } = props;
  const [mregedRequired, setMregedRequired] = useState<boolean>(required);
  const { hidden = false, formFlag: fFlag = true } = params;

  const {
    changeForm,
    formFlag = false,
    updateErrorValue,
  } = useContext<DformContextProps>(DformContext);

  useMemo(() => {
    if (changeForm[name]?.required !== undefined) {
      setMregedRequired(changeForm[name]?.required);
    }
  }, [changeForm[name]]);

  const shouldUpdate = (prevValue: any, nextValue: any) => {
    if (prevValue[props?.name] !== nextValue[props?.name]) {
      if (updateErrorValue) updateErrorValue(name);
    }
    if (props.shouldUpdate && typeof props.shouldUpdate === 'function') {
      props.shouldUpdate(prevValue, nextValue, {});
    }
    return prevValue !== nextValue;
  };

  // 不在DynamicForm中 取消Field包裹;
  if (!formFlag || !fFlag) {
    return <div id={`alita-dform-${props?.name}`}>{props.children}</div>;
  }

  return (
    <div id={`alita-dform-${props?.name}`} style={style}>
      <Field
        {...restProps}
        name={name}
        rules={
          hidden
            ? []
            : [
                ...(rules || []),
                {
                  required: mregedRequired,
                  message: `${PLACEHOLDER_MENU[type]}${title}`,
                },
              ]
        }
        shouldUpdate={shouldUpdate}
      />
    </div>
  );
};

export default CustomField;
