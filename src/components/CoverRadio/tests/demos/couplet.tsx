import React, { FC } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm from '../../../../DynamicForm';
import { useForm } from 'rc-field-form';
import CoverRadio from '../../'

const drinkList = [
  { foodId: 'cola', foodName: '可乐' },
  { foodId: 'milk', foodName: '牛奶' },
  { foodId: 'fruitJuice', foodName: '果汁' },
];
const selectList = [
  { label: 'onlyCola', value: '要可乐' },
  { label: 'onlyMilk', value: '要牛奶' },
  { label: 'onlyFruitJuice', value: '要果汁' },
]

const Couplet: FC = () => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = React.useState<any>({ drink: 'milk', });
  const formProps = {
    formsValues,
    form,
    isDev: false,
  };
  function onChange(e: any) {
    if (e === "onlyMilk") {
      setFormsValues({ drink: 'milk' })
    } else if (e === "onlyCola") {
      setFormsValues({ drink: 'cola' })
    } else if (e === "onlyFruitJuice") {
      setFormsValues({ drink: 'fruitJuice' })
    }
  }
  return (
    <>
      <DynamicForm {...formProps} >
        <CoverRadio
          fieldProps='drink'
          data={drinkList}
          title='饮料'
          required={true}
          onChange={(val: any) => {
            // eslint-disable-next-line no-console
            setFormsValues({ drink: val })
          }}
          alias={{
            label: 'foodName',
            value: 'foodId',
          }}
        />
        <CoverRadio
          fieldProps='select'
          data={selectList}
          title='级联--饮料'
          positionType='vertical'
          radioType='vertical'
          alias={{
            label: 'value',
            value: 'label',
          }}
          onChange={
            (e) => {
              onChange(e)
            }
          }
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  )
}
export default Couplet;