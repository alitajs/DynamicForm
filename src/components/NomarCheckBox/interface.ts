import { IDataItem } from './checkBoxgroup';
import { IAliasProps, BaseComponentProps } from '../../PropsType';

export interface INomarCheckBoxProps extends BaseComponentProps {
  data?: any;
  coverStyle?: React.CSSProperties;
  className?: string;
  onChange?: (currentActiveLink: (string | number)[]) => void;
  disableItem?: (items: IDataItem) => boolean;
  chunk?: number;
  alias?: IAliasProps;
  defaultValue?: (string | number)[];
}
