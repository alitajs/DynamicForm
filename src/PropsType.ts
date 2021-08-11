export type InputEventHandler = (value?: string) => void;

export type StringAndUdfEvent = string | undefined;
export type StringEvent = string;

export type ClickEvent = React.MouseEvent<HTMLElement>;

export type ErrorValueProps = { [key: string]: string | undefined };
