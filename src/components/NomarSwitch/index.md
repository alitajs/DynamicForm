---
title: Switch
---

# Switch

## 代码展示

<code src="./demo/index.tsx" />

## API

| 参数        | 说明                    | 类型    | 默认值 | 是否必填 |
| ----------- | ----------------------- | ------- | ------ | -------- |
| type        | 表单类型                | string  | ''     | 是       |
| title       | 标题                    | string  | ''     | 是       |
| fieldProps  | 文本属性                | string  | false  | 是       |
| placeholder | placeholder             | string  | ''     | 否       |
| required    | 必填判断                | boolean | false  | 否       |
| disabled    | 是否可编辑              | boolean | false  | 否       |
| hasStar     | 必填项红*展示与否的判断 | boolean | true   | 否       |
| hasStar     | 必填项红*展示与否的判断 | boolean | true   | 否       |

## 备注

`title` 大小默认设置为 `0.34rem`，如需自定义 `title` 大小，可以在 `config/config.ts` 文件下增加如下代码：

```js
theme: {
  '@input-font-size': '0.28rem',
}
```

## 组件使用

### Off

<code src="./demo/off.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
 {
  type: "switch",
  fieldProps: "off",
  placeholder: "选择",
  title: "Off",
  required: true,
},
```

### DisabledOff

<code src="./demo/disabledOff.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
 {
  type: "switch",
  fieldProps: "disabledOff"
  placeholder: "选择"
  title: "Disabled Off"
  required: true
  disabled: true
},
```