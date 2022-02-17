import React, { FC } from 'react';
import { Button } from 'antd-mobile-v2';
import DynamicForm, { useForm, WhiteSpace, DformPicker } from '../../../..';

interface PcProps {
  onFinish: any;
  onFinishFailed: any;
  onChange: any;
}

const Pc: FC<PcProps> = ({ onFinish, onFinishFailed, onChange }) => {
  const [form] = useForm();

  const aliasCityList = [
    {
      cityId: '深圳',
      cityName: 'shenzhen',
    },
    {
      cityId: '杭州',
      cityName: 'hangzhou',
    },
    {
      cityId: '广州',
      cityName: 'guangzhou',
    },
  ];

  const cityList = [
    {
      label: '北京',
      value: 'beijing',
    },
    {
      label: '上海',
      value: 'shanghai',
    },
    {
      label: '福州',
      value: 'fuzhou',
    },
  ];

  const formsValues = {
    youCity: 'fuzhou',
  };
  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    failScroll: false,
  };
  return (
    <>
      <DynamicForm {...formProps}>
        <DformPicker
          fieldProps="myCity"
          required
          title="我喜欢的城市"
          data={aliasCityList}
          labelNumber={7}
          placeholder="请选择我喜欢的城市placeholder"
          alias={{
            label: 'cityId',
            value: 'cityName',
          }}
          onChange={onChange}
        />
        <DformPicker
          fieldProps="youCity"
          title="选择你喜欢的城市"
          data={cityList}
          positionType="vertical"
        />
        <DformPicker
          fieldProps="disabledClick"
          title="disabled点击"
          data={cityList}
          placeholder="不可点击"
          disabled
        />
        <DformPicker
          fieldProps="noData"
          title="数据源为空"
          data={[]}
          placeholder="数据源为空"
        />
      </DynamicForm>
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default Pc;
