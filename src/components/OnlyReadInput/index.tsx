import React, { FC } from 'react';
import NomarInput, { INomarInputProps } from '../NomarInput';

export interface IOnlyReadInputProps extends Omit<INomarInputProps, 'inputType'> {
  onClick?: (e: Event) => void;
}

const OnlyReadInput: FC<IOnlyReadInputProps> = props => {
  return <NomarInput {...props} editable={false} inputType="text" required={false} />;
};

export default OnlyReadInput;
