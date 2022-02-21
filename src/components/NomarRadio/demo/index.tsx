import React, { FC, useState } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformRadio,
  WhiteSpace,
} from '@alitajs/dform';

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

const DfromRadioTextPage: FC = () => {
  const [singleVal, setSingleVal] = useState('可乐鸡翅');
  const [singleVal1, setSingleVal1] = useState('宫保鸡丁');
  const [form] = useForm();
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };
  const formsValues = {
    userRadio4: '红烧肉',
  };

  const formProps = {
    formsValues,
    form,
    onFinishFailed,
    onFinish,
    isDev: false,
    // isPc: true,
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <DformRadio
          fieldProps="userRadio1"
          required
          data={radioList}
          title="发票"
          onChange={(e) => {
            console.log(e);
          }}
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
          disabled
          data={dayList}
          positionType="vertical"
          title="天气情况(默认值)"
          defaultValue="雨"
        />
        <DformRadio
          fieldProps="userRadio4"
          required
          allowUnChecked={false}
          data={foodList}
          title="喜欢的食物(默认值)"
          radioType="vertical"
          alias={{
            label: 'foodId',
            value: 'foodName',
          }}
          positionType="vertical"
        />
      </DynamicForm>

      <DformRadio
        defaultValue={singleVal}
        fieldProps="userRadio4"
        required
        allowUnChecked={false}
        data={foodList}
        title="single"
        radioType="vertical"
        alias={{
          label: 'foodId',
          value: 'foodName',
        }}
        positionType="vertical"
        onChange={(e: any) => {
          setSingleVal(e);
        }}
      />
      <DformRadio
        isPc
        defaultValue={singleVal1}
        fieldProps="userRadio4"
        required
        allowUnChecked={false}
        data={foodList}
        title="single-pc"
        radioType="vertical"
        alias={{
          label: 'foodId',
          value: 'foodName',
        }}
        positionType="vertical"
        onChange={(e: any) => {
          setSingleVal1(e);
        }}
      />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default DfromRadioTextPage;
