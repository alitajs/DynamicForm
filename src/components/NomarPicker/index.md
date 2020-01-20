---
title: Select
---

# Select

## 代码演示

<code src="./demo/index.tsx" />

## API

|参数|说明|类型|默认值|是否必填|
|--|--|--|--|--|
|type|表单类型|string|''|是|
|title|标题|string|''|是|
|data|数据源|list|[]|是|
|fieldProps|文本属性|string|false|是|
|placeholder|placeholder|string|''|否|
|required|必填判断|boolean|false|否|
|disabled|是否可编辑|boolean|false|否|

## 组件使用

### NormalSelect

<code src="./demo/normalSelect.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "select",
  fieldProps: "userPicker1",
  title: "季节",
  placeholder: "请选择",
  data: seasons,
}
```

### RequiredSelect

<code src="./demo/requiredSelect.tsx">

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "select",
  fieldProps: "userPicker2",
  required: true,
  title: "城市",
  placeholder: "请选择",
  data: citys,
}

```

### OnlyRead

<code src="./demo/onlyRead.tsx">
如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "select",
  fieldProps: "userPicker3",
  required:true,
  title: "城市(不可编辑)",
  placeholder: "请选择",
  data: citys,
  disabled: true,
}

```





