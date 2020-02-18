---
title: TextArea
---

# TextArea

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                    | 类型                       | 默认值       | 是否必填 |
| ------------ | ----------------------- | -------------------------- | ------------ | -------- |
| type         | 表单类型                | string                     | ''           | 是       |
| title        | 标题                    | string                     | ''           | 是       |
| fieldProps   | 文本属性                | string                     | ''           | 是       |
| placeholder  | placeholder             | string                     | ''           | 否       |
| required     | 必填判断                | boolean                    | false        | 否       |
| rows         | 行数                    | number                     | 3            | 否       |
| editable     | 可编辑判断              | boolean                    | false        | true     |
| labelNumber  | 标签的文字个数          | number                     | 5            | 否       |
| positionType | 表单方向样式            | `horizontal` or `vertical` | `horizontal` | 否       |
| hasStar      | 必填项红*展示与否的判断 | boolean                    | true         | 否       |

## 备注

`title` 大小默认设置为 `0.34rem`，如需自定义 `title` 大小，可以在 `config/config.ts` 文件下增加如下代码：

```js
theme: {
  '@input-font-size': '0.28rem',
}
```

`area` 类型在属性 `editable` 设置为 `false` 时，文字样式会变淡，如果自定义的话可以在 `config/config.ts` 增加如下代码：

```js
theme: {
  '@color-text-disabled': '#000',
}
```

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

如需在 `DynamicForm` 中使用，请使用以下 `json`：

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

### VerticalArea

<code src="./demo/verticalArea.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  title: "备注",
  fieldProps: "Remarks",
  required: true,
  placeholder: "请输入...",
  positionType: "vertical",
}
```



