import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm from '../../../DynamicForm';
import { useForm } from 'rc-field-form';
import DformCheckBox from '../../'

const CoupletText: FC = () => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = React.useState<any>({ fruit: [] });
  React.useEffect(() => {
    setFormsValues({
      fruit: [...formsValues.fruit, 'milk', 'fruitJuice'],
    });
  }, []);

  const formProps = {
    formsValues,
    form,
    failScroll: false,
    isDev: true,
  };
  return (
    <>
      <DynamicForm {...formProps}>
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button
        type="primary"
        onClick={(e) => {
          form.submit();
        }}
      >
        Submit
      </Button>
    </>
  );
};
export default CoupletText;
