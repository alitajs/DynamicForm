import React, { FC } from 'react';
import NomarInput, { INomarInputProps } from '../NomarInput';

export interface IOnlyReadInputProps extends Omit<INomarInputProps, 'inputType'> {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const OnlyReadInput: FC<IOnlyReadInputProps> = props => (
  <NomarInput {...props} editable={false} inputType="text" value={props.placeholder} />
);

export default OnlyReadInput;
