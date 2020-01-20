---
title: Radio
---

# Radio

## 代码验演示

<code src="./demo/index.tsx" />

## API

|参数|说明|类型|默认值|是否必填|
|--|--|--|--|--|
|type|表单类型|string|''|是|
|title|标题|string|''|是|
|data|数据|list|[]|是|
|fieldProps|文本属性|boolean|false|是|
|placeholder|placeholder|string|''|否|
|required|必填判断|boolean|false|否|
|disabled|是否可编辑|boolean|false|否|
|radioType|样式类型|`vertical` or `horizontal`|false|`horizontal`|

## 组件使用

### NormalRadio

<code src="./demo/normalRadio.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: 'radio',
  fieldProps: 'userRadio1',
  required: true,
  data: radioList,
  title: '发票',
}
```

### OnlyRead

<code src="./demo/onlyRead.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "radio",
  fieldProps: "userRadio3",
  required: true,
  data: radioList,
  title: "发票",
  disabled: true,
},
```