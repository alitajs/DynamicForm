import * as React from 'react';
import Group from './Group';
import DForm, { useForm } from './Dform';
import { DformContext } from '../Context';
import { IDynamicFormProps } from '../../PropsType';

interface CompoundedComponent
  extends React.FC<IDynamicFormProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof Group;
  __DYNAMICFORM: boolean;
}

const Form = DForm as CompoundedComponent;

Form.Group = Group;

export { useForm, DformContext, IDynamicFormProps };

export default Form;
