---
 title: ExtraInput
---

# ExtraInput

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数          | 说明              | 类型                       | 默认值       | 是否必填 |
| ------------- | ----------------- | -------------------------- | ------------ | -------- |
| type          | 表单类型          | string                     | ''           | 是       |
| title         | 标题              | string                     | ''           | 是       |
| fieldProps    | 文本属性          | string                     | false        | 是       |
| fieldProps2   | 文本属性          | string                     | false        | 是       |
| placeholder   | placeholder       | string                     | ''           | 否       |
| placeholder2  | placeholder       | string                     | ''           | 否       |
| required      | 必填判断          | boolean                    | false        | 否       |
| inputType     | html input 框类型 | string                     | text         | 否       |
| clear         | 是否带清除功能    | boolean                    | false        | 否       |
| editable      | 是否可编辑        | boolean                    | true         | 否       |
| extra         | 右边注释          | string or node             | ''           | 否       |
| labelNumber   | 标签的文字个数    | number                     | 5            | 否       |
| positionType  | 表单方向样式      | `horizontal` or `vertical` | `horizontal` | 否       |
| titleFontSize | 标题字体大小      | string                     | `0.34rem`    | 否       |

## 组件使用

### PriceInput

<code src="./demo/priceInput.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "extraInput",
  fieldProps: "minPrise",
  fieldProps2: "maxPrise",
  title: "价格区间",
  placeholder: "输入最小价格",
  placeholder2: "输入最大价格",
  required: true,
  inputType: "number",
  labelNumber: 8,
  extra: "¥",
}
```

### PositionInput

<code src="./demo/positionInput.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "extraInput",
  fieldProps: "minPosition",
  fieldProps2: "maxPosition",
  title: "位置区间",
  placeholder: "选择最小位置",
  placeholder2: "选择最大位置",
  required: true,
  inputType: "text",
  extra: extraImg(),
}
```

### SelectExtra

<code src="./demo/selectExtra.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "extraInput",
  fieldProps: "price",
  fieldProps2: "unit",
  title: "单价",
  placeholder: "输入价格",
  placeholder2: "选择区间",
  required: true,
  extraType: "select",
  data: unitList,
}
```

### VerticalExtraInput

<code src="./demo/verticalExtraInput.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "extraInput",
  fieldProps: "minLength",
  fieldProps2: "maxLength",
  title: "长度区间",
  placeholder: "输入长度",
  placeholder2: "输入长度",
  positionType: "vertical",
  required: true,
}
```

### VerticalExtraInputAndSelect

<code src="./demo/verticalExtraInputAndSelect.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "extraInput",
  title: "价格",
  fieldProps: "prices",
  fieldProps2: "priceUnit",
  placeholder: "输入长度",
  placeholder2: "选择长度单位",
  positionType: "vertical",
  extraType: "select",
  data: unitList,
}
```