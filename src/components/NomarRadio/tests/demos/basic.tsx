import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  IFormItemProps,
  WhiteSpace,
  DformRadio,
} from '../../../../';
import { useForm } from 'rc-field-form';

interface BasicProps {
  onFinish?: any;
  onFinishFailed?: any;
  isPc?: boolean;
  single?: boolean;
}
const radioList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
];
const dayList = [
  {
    label: '晴',
    value: '晴',
  },
  {
    label: '阴',
    value: '阴',
  },
  {
    label: '雨',
    value: '雨',
  },
];
const foodList = [
  {
    foodName: '宫保鸡丁',
    foodId: '宫保鸡丁',
  },
  {
    foodName: '可乐鸡翅',
    foodId: '可乐鸡翅',
  },
  {
    foodName: '爆炒虾仁',
    foodId: '爆炒虾仁',
  },
  {
    foodName: '清蒸小黄鱼',
    foodId: '清蒸小黄鱼',
  },
  {
    foodName: '红烧肉',
    foodId: '红烧肉',
  },
];

const DfromRadioTestPage: FC<BasicProps> = ({
  onFinish,
  onFinishFailed,
  isPc = false,
  single = false,
}) => {
  const [singleVal, setSingVale] = useState('红烧肉');
  const [form] = useForm();
  const formsValues = {
    userRadio3: '雨',
    userRadio4: '红烧肉',
  };

  const formProps = {
    formsValues,
    form,
    onFinishFailed,
    onFinish,
    isDev: false,
    isPc,
  };

  return (
    <>
      {!single && (
        <DynamicForm {...formProps} failScroll={false}>
          <DformRadio
            fieldProps="userRadio1"
            required
            data={radioList}
            title="发票"
            allowUnChecked
          />
          <DformRadio
            fieldProps="userRadio2"
            required
            data={radioList}
            title="内容靠左"
            labelNumber={5}
            coverStyle={{
              justifyContent: 'flex-start',
            }}
          />
          <DformRadio
            fieldProps="userRadio3"
            required
            disabled={true}
            data={dayList}
            positionType="vertical"
            title="天气情况"
          />
          <DformRadio
            fieldProps="userRadio4"
            required
            allowUnChecked={false}
            data={foodList}
            title="喜欢的食物"
            radioType="vertical"
            alias={{
              label: 'foodId',
              value: 'foodName',
            }}
          />
        </DynamicForm>
      )}
      {single && (
        <DformRadio
          defaultValue={singleVal}
          fieldProps="userRadio4"
          required
          allowUnChecked={false}
          data={foodList}
          title="喜欢的食物"
          radioType="vertical"
          alias={{
            label: 'foodId',
            value: 'foodName',
          }}
          onChange={(e: any) => {
            setSingVale(e);
          }}
        />
      )}
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};
export default DfromRadioTestPage;
