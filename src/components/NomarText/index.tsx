import React, { FC, useContext, useMemo, useState } from 'react';
import { DformContext, DformContextProps } from '../../baseComponents/Context';
import { Rule } from 'rc-field-form/es/interface';
import Field from '../Field';
import Title from '../../baseComponents/Title';
import HorizontalTitle from '../../baseComponents/HorizontalTitle';
import TextItem from '../../baseComponents/TextItem';

export interface INomarTextProps {
  positionType?: 'vertical' | 'horizontal';
  coverStyle?: React.CSSProperties;
  title?: string;
  required?: boolean;
  hasStar?: boolean;
  subTitle?: string | React.ReactNode;
  hidden?: boolean;
  extra?: string | React.ReactNode;
  fieldProps: string;
  rules?: Rule[];
  placeholder?: string;
  labelNumber?: number;
  onClick?: (val: string) => void;
  disabled?: boolean;
  formFlag?: boolean;
  maxLine?: number;
  className?: string;
  defaultValue?: string;
  renderHeader?: string | React.ReactNode;
  renderFooter?: string | React.ReactNode;
  boxStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}

const DformText: FC<INomarTextProps> = (props) => {
  const {
    positionType = 'horizontal',
    coverStyle,
    title = '',
    required = false,
    fieldProps,
    hasStar = true,
    rules = [],
    extra,
    placeholder = '',
    labelNumber = 7,
    disabled = false,
    maxLine,
    onClick,
    className = '',
    defaultValue,
    hidden = false,
    boxStyle,
    titleStyle,
    formFlag = true,
  } = props;

  const [mregedDisabled, setMregedDisabled] = useState<boolean>(disabled);
  const { changeForm } = useContext<DformContextProps>(DformContext);

  const isVertical = positionType === 'vertical';

  useMemo(() => {
    if (changeForm[fieldProps]?.disabled !== undefined) {
      setMregedDisabled(changeForm[fieldProps]?.disabled);
    } else {
      setMregedDisabled(disabled);
    }
  }, [changeForm[fieldProps], disabled]);

  return (
    <Title
      independentProps={props}
      type="text"
      style={boxStyle}
      titleStyle={titleStyle}
    >
      <Field
        title={title}
        required={required}
        rules={rules}
        name={fieldProps}
        initialValue={defaultValue}
        params={{
          hidden,
          formFlag,
        }}
        type="text"
      >
        <TextItem
          placeholder={placeholder}
          value="123"
          extra={extra}
          coverStyle={{
            color: '#999',
            ...coverStyle,
          }}
          isVertical={isVertical}
          labelNumber={labelNumber}
          onClick={onClick}
          disabled={mregedDisabled}
          maxLine={maxLine}
          fieldProps={fieldProps}
          className={className}
          ellipsis={false}
          arrow={false}
        >
          <HorizontalTitle
            required={required}
            hasStar={hasStar}
            title={title}
            labelNumber={labelNumber}
            isVertical={isVertical}
            fieldProps={fieldProps}
            titleStyle={titleStyle}
          />
        </TextItem>
      </Field>
    </Title>
  );
};

DformText.displayName = 'dformText';
export default DformText;
