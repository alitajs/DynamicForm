---
title: RangeDatePicker
---

# RangeDatePicker

## 代码演示

<code src="./demo/index.tsx" />

## API

|参数|说明|类型|默认值|是否必填|
|--|--|--|--|--|
|type|表单类型|string|''|是|
|title|标题|string|''|是|
|fieldProps|文本属性|string|''|是|
|fieldProps2|文本属性|string|''|是|
|placeholder|placeholder|string|''|否|
|required|必填判断|boolean|false|否|
|modeType|时间类型|string|`date`|否|
|minDate|最小可选日期|date|''|否|
|maxDate|最大可选日期|date|''|否|

## 组件使用

### DateTime 

<code src="./demo/datetime.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "rangeDatePicker",
  fieldProps: "rangeTime1",
  fieldProps2: "rangeTime2",
  title: "时间(datetime)",
  modeType: "datetime",
  required: true
}
```

### Month

<code src="./demo/month.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "rangeDatePicker",
  required: true,
  fieldProps: "rangeTime3",
  fieldProps2: "rangeTime4",
  title: "时间(month)",
  modeType: "month",
}
```