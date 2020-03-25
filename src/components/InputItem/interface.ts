export interface IInputItemProps {
  isVertical?: boolean;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
