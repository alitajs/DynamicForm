import React, { useEffect, useState } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import DynamicForm, { IFormItemProps, useForm, Store, ValidateErrorEntity } from '@alitajs/dform';

const DfromPickerTextPage = () => {
  const [form] = useForm();
  const [delayData, setDelayData] = useState<any[]>([]);
  const [delayValData, setDelayValData] = useState<any[]>([]);
  const [formVal, setForVal] = useState<any>({});
  const [changeData, setChangeData] = useState<any>([]);
  
  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

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
  const cityList2 = [
    {
      label: '北京',
      value: 'beijing',
    },
    {
      label: '上海1',
      value: 'shanghai1',
    },
    {
      label: '福州1',
      value: 'fuzhou1',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setDelayData(cityList);
    }, 3000);
    setTimeout(() => {
      setDelayValData(cityList);
    }, 1000);
    setTimeout(() => {
      setForVal({
        youCity: 'fuzhou',
        noData: 'xxx',
        delayData: 'beijing',
        delayValue: 'beijing',
        bussType: 'beijing',
      });
    }, 2000);
    setChangeData(cityList);
  }, []);

  const formsData = [
    {
      type: 'picker',
      fieldProps: 'alias',
      // required: true,
      data: aliasCityList,
      title: '及联问题',
      labelNumber: 7,
      placeholder: '请选择我喜欢的城市',
      alias: {
        label: 'cityId',
        value: 'cityName',
      },
      onChange: (e: string | number) => {
        setForVal({
          delayData: 'fuzhou',
          delayValue: 'fuzhou',
          bussType: 'fuzhou',
        });
      },
      defaultValue: 'hangzhou',
    },
    {
      type: 'picker',
      fieldProps: 'noEdit',
      data: cityList,
      title: '不可编辑',
      disabled: true,
      positionType: 'vertical',
    },
    {
      type: 'picker',
      fieldProps: 'noData',
      data: cityList,
      title: '赋不存在的值',
      labelNumber: 7,
    },
    {
      type: 'picker',
      fieldProps: 'delayData',
      data: delayData,
      title: '延迟赋值数据源',
      labelNumber: 7,
      defaultValue: 'shanghai',
    },
    {
      type: 'picker',
      fieldProps: 'delayValue',
      data: delayValData,
      title: '延迟赋值',
      labelNumber: 7,
      disabled: true,
      onClick: (e: any) => {
        console.log('当 disabled 时还存在点击事件');
      },
      defaultValue: 'shanghai',
    },
    {
      type: 'picker',
      fieldProps: 'bussType',
      data: changeData,
      title: '数据源来回切换',
      labelNumber: 7,
      defaultValue: 'shanghai',
    },
  ] as IFormItemProps[];
  const formProps = {
    onFinish,
    onFinishFailed,
    data: formsData,
    formsValues: formVal,
    form,
    autoLineFeed: false,
    isDev: false,
  };

  const changeBussType1 = () => {
    setChangeData(cityList);
    // 清空
    setForVal({
      ...formVal,
      bussType: '',
    });
  };
  const changeBussType2 = () => {
    setChangeData(cityList2);
    // 切换值
    setForVal({
      ...formVal,
      bussType: 'shanghai1',
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          form.setFieldsValue({
            alias: '',
            delayValue: '',
          });
        }}
      >
        改变值
      </Button>
      <Button onClick={changeBussType1}>将数据源改变为类型1</Button>
      <Button onClick={changeBussType2}>将数据源改变为类型2</Button>
      <DynamicForm {...formProps} />
      <WhiteSpace size="sm" />
      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </>
  );
};

export default DfromPickerTextPage;
