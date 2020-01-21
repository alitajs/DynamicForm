---
title: TextArea
---

# TextArea

## 代码演示

<code src="./demo/index.tsx" />

## API

|参数|说明|类型|默认值|是否必填|
|--|--|--|--|--|
|type|表单类型|string|''|是|
|title|标题|string|''|是|
|fieldProps|文本属性|string|''|是|
|placeholder|placeholder|string|''|否|
|required|必填判断|boolean|false|否|
|rows|行数|number|3|否|
|editable|可编辑判断|boolean|false|true|
|labelNumber|标签的文字个数|number|5|否|

## 组件使用

### NomarArea

<code src="./demo/nomarArea.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "area",
  fieldProps: "textArea1",
  required: true,
  placeholder: "请输入..."
},
```

### OnlyReadArea

<code src="./demo/onlyReadArea.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "area",
  fieldProps: "textArea2",
  title: "有标题",
  placeholder: "只读，不可编辑",
  rows: 3,
  editable: false,
},
```

### TitleTooLong

<code src="./demo/titleTooLong.tsx" />

```json
{
  type: "area",
  fieldProps: "titleTooLong",
  title: "标题文字内容过长",
  placeholder: "请输入",
  labelNumber: 8,
  required: true,
},
```



