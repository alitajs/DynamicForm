import React, { FC, useState, useEffect } from 'react';
import { Picker } from 'antd-mobile';
import { INomarSelectProps } from './interface'
import { TextItem } from '..';

interface INomarSelectGroupProps  extends Omit<INomarSelectProps, 'onChange'> {
    onChange: (values: ( number | string )[] | undefined, flag: string) => void;
    //返回的数据
    initValue?: string  ;
}
const NomarSelectGroup: FC<INomarSelectGroupProps> =(props) =>{
    //是否显示
    const [visible, setvisible] = useState<boolean>(false);
    // 显示出来的选择数据
    let [pickerLabel, setPickerLabel] = useState<any>('');

    const {
        disabled = false,
        cols,
        data = [],
        coverStyle,
        title,
        required = false,
        fieldProps,
        rules,
        placeholder = '请选择',
        positionType = 'horizontal',
        initValue="",
        hasStar = true,
        subTitle,
        hidden = false,
        onClick,
        className,
        labelNumber = 6,
        extra = '',
        children,
        onChange,
        ...otherProps
    } = props;

    const isVertical = positionType === 'vertical';

    //数据
    const [sValue,setSValue] = React.useState<any>();

    useEffect(() => {
      // console.log(fieldProps, initValue, preValue);
      // if (data.length === 0 && initValue) setPreValue(initValue);
      if (data.length === 0) {
        // onChange(undefined, 'init');
        setPickerLabel('');
        return;
      } else {
        console.log(Object.prototype.toString.call(initValue)); 
        setPickerLabel(initValue)

        pickerLabel=initValue
        setPickerLabel(setPickerLabel)
      }


      let allDate:string="";
      for(let myI=0;myI<data.length;myI++){
        let mydata=data.filter((item) => item?.value === initValue)
        allDate=allDate+","+mydata
      }
      if(allDate.length===0 || allDate.length===data.length){
        setPickerLabel('');
      } else {
        pickerLabel=allDate
        setPickerLabel(pickerLabel)
      }
      console.log(pickerLabel);
      
    }, [initValue]);

  useEffect(() => {
    if (data && data.length) {
      const nowValue = initValue;

      console.log(data)

      const filterList = data.filter((item) => item?.value === nowValue);
      // console.log(filterList);
      if (filterList && filterList.length) {
        setPickerLabel(filterList[0].label);
        // if (preValue) onChange(nowValue, 'init');
      } else {
        // onChange(undefined, 'init');
        setPickerLabel('');
      }
    } else {
      // onChange(undefined, 'init');
      setPickerLabel('');
    }
  }, [data]);
    
  useEffect(()=>{
    // console.log(sValue)
    if(sValue===undefined){
    }
    // pickerLabel=sValue
    // setPickerLabel(pickerLabel)
    // console.log( `${pickerLabel}`.split(",") );
  },[sValue])

      //打开
      const fieldClick = () => {
        if (onClick) onClick(initValue);
        if (disabled) return;
        setvisible(true);
      };
    
      //确定
      const onOK = (val: (string | number)[]) => {
        // console.log(`${val}`);
        // let str = toString(val);
        onChange( val, 'change');
        setvisible(false);
        // if(val===undefined){
        // }

        // console.log(val[0]);
        // setSValue(val)
      };

    return (
        <>
            <TextItem 
                isVertical={isVertical}
                value={`${pickerLabel}`}
                placeholder={placeholder}
                labelNumber={labelNumber}
                coverStyle={coverStyle}
                onClick={fieldClick}
                disabled={disabled}
                extra={extra}
                className={className}                
            >
              {children}
            </TextItem>
            <Picker
              title={title}
              visible={visible && data.length > 0}
              data={data}
              // cols={data.length}
              cascade={false}
              value={initValue ? `${initValue}`.split(",") : undefined}
              onOk={ onOK }
              // onChange={v => setSValue(v)}
              onDismiss={() => {
                setvisible(false);
              }}
              onVisibleChange={() => {
                setvisible(false);
              }}
            />
        </>
    )
}

export default NomarSelectGroup
  