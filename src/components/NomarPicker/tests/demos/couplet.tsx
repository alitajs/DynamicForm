import React, { FC, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { Button } from 'antd-mobile-v2';

import DynamicForm, {
  useForm,
  Store,
  ValidateErrorEntity,
  DformPicker,
} from '../../../..';

const pickerData = [
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
  {
    label: '杭州',
    value: 'hangzhou',
  },
];

const Couplet: FC = () => {
  const [form] = useForm();
  const [formsValues, setFormsValues] = useState<any>({});
  const [delayData, setDelayData] = useState<any[]>([]);
  useEffect(() => {
    setTimeout(() => {
      act(() => {
        setFormsValues({
          ...formsValues,
          delayValue: 'shanghai',
          delayData: 'hangzhou',
        });
      });
    }, 1000);
    setTimeout(() => {
      act(() => {
        setDelayData(pickerData);
      });
    }, 3000);
  }, []);
  const onFinish = (values: Store) => {};

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {};

  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    failScroll: false,
  };
  return (
    <div>
      <DynamicForm {...formProps}>
        <DformPicker
          fieldProps="delayValue"
          data={pickerData}
          title="延迟赋值"
          labelNumber={7}
          placeholder="请选择延迟赋值"
        />
        <DformPicker
          fieldProps="couplet"
          data={pickerData}
          title="改值后及联"
          labelNumber={7}
          placeholder="请选择改值后及联"
          onChange={() => {
            setFormsValues({
              ...formsValues,
              delayValue: 'fuzhou',
            });
          }}
        />
        <DformPicker
          fieldProps="delayData"
          data={delayData}
          title="延迟赋数据源"
          labelNumber={7}
          placeholder="请选择延迟赋数据源"
        />
      </DynamicForm>
      <Button onClick={() => form.submit()}>submit</Button>
      <Button
        onClick={() => {
          setFormsValues({
            ...formsValues,
            delayValue: 'beijing',
          });
        }}
      >
        delayValue值改为北京
      </Button>
      <Button
        onClick={() => {
          setFormsValues({
            ...formsValues,
            delayData: 'zhangzhou',
          });
        }}
      >
        设不存在的值
      </Button>
    </div>
  );
};

export default Couplet;
