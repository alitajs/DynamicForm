import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm from '../../../../DynamicForm';
import { useForm } from 'rc-field-form';
import DformCheckBox from '../../'

const drinksList = [
  { foodId: 'cola', foodName: '可乐' },
  { foodId: 'sprite', foodName: '雪碧' },
  { foodId: 'water', foodName: '矿泉水' },
  { foodId: 'milk', foodName: '牛奶' },
  { foodId: 'fruitJuice', foodName: '果汁' },
];
const selectList = [
  { foodId: 'all', foodName: '全选' },
  { foodId: 'onlyCola', foodName: '只要可乐' },
];
const Couplet: FC = () => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = React.useState<any>({ fruit: [] });
  React.useEffect(() => {
    setFormsValues({
      fruit: [...formsValues.fruit, 'milk', 'fruitJuice'],
    });
  }, []);

  function onChange(e: any) {
    //全部都选
    if (e.indexOf('all') === 0) {
      setFormsValues({
        fruit: ['cola', 'sprite', 'water', 'milk', 'fruitJuice'],
      });
    } else {
      setFormsValues({ fruit: [] });
    }
    // 只要可乐
    if (e.indexOf("all") === -1 && e.indexOf("onlyCola") === 0) {
      setFormsValues({
        fruit: ['cola'],
      });
    }
    //两个都有
    if (e.length === 2) {
      setFormsValues({
        fruit: ['cola', 'sprite', 'water', 'milk', 'fruitJuice'],
      });
    }
  }

  const formProps = {
    formsValues,
    form,
    failScroll: false,
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <DformCheckBox
          title="请选择饮料"
          required={true}
          data={drinksList}
          fieldProps="fruit"
          chunk={2}
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
        />
        <DformCheckBox
          title="级联选择饮料"
          required={true}
          data={selectList}
          fieldProps="drink"
          chunk={2}
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
          onChange={(e) => {
            onChange(e);
          }}
        />
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
export default Couplet;
