import DynamicForm, { useForm } from './baseComponents/DynamicForm';
import './index.less';

export * from 'rc-field-form/lib/interface';
export * from './components';
export * from './utils';
export * from './PropsType';

export { default as FieldForm } from 'rc-field-form';

export { useForm };
// rename
export { DynamicForm as Form };

export default DynamicForm;
