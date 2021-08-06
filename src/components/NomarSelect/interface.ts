import { Rule } from 'rc-field-form/es/interface';
import { PickerData } from 'antd-mobile/lib/picker/PropsType';
import { IAliasProps } from '../../DynamicForm';
import { PickerPropsType } from 'antd-mobile/es/picker/PropsType';


export interface INomarSelectProps {
    cols?:number | string;
    type?: string;
    data: PickerData[];
    value?: PickerPropsType['value'];
    positionType?: 'vertical' | 'horizontal';
    title: string;
    fieldProps?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    hasStar?: boolean;
    rules?: Rule[];
    subTitle?: string | React.ReactNode;
    hidden?: boolean;
    onClick?: (val: string | number | undefined) => void;
    renderHeader?: string | number;
    className?: string;
    extra?: string | React.ReactNode;
    coverStyle?: React.CSSProperties;
    // initValue?: string | number;
    onChange?: (currentActiveLink: string | number) => void;
    labelNumber?: number;
    alias?: IAliasProps;
  }
  