import React, { FC, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { Button } from 'antd-mobile';
import DynamicForm from '../../../../';
import { useForm } from 'rc-field-form';
import { Store, ValidateErrorEntity, IFormItemProps } from '../../../..';

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
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const formsData = [
    {
      type: 'picker',
      fieldProps: 'delayValue',
      data: pickerData,
      title: '延迟赋值',
      labelNumber: 7,
      placeholder: '请选择延迟赋值',
    },
    {
      type: 'picker',
      fieldProps: 'couplet',
      data: pickerData,
      title: '改值后及联',
      labelNumber: 7,
      placeholder: '请选择改值后及联',
      onChange: () => {
        setFormsValues({
          ...formsValues,
          delayValue: 'fuzhou',
        });
      },
    },
    {
      type: 'picker',
      fieldProps: 'delayData',
      data: delayData,
      title: '延迟赋数据源',
      labelNumber: 7,
      placeholder: '请选择延迟赋数据源',
    },
  ] as IFormItemProps[];
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues,
    form,
    failScroll: false,
  };
  return (
    <div>
      <DynamicForm {...formProps} />
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
    </div>
  );
};

export default Couplet;
