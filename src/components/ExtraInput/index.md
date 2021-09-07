---
title: ExtraInput
group:
  title: ExtraInput
nav:
  title: 组件
  path: /components
---

# ExtraInput

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                               | 类型                       | 默认值     | 是否必填 |
| ------------ | ---------------------------------------------------------------------------------- | -------------------------- | ---------- | -------- |
| title        | 标题                                                                               | string                     | ''         | 是       |
| fieldProps   | 文本属性                                                                           | string                     | false      | 是       |
| fieldProps2  | 文本属性                                                                           | string                     | false      | 是       |
| required     | 必填判断                                                                           | boolean                    | false      | 否       |
| positionType | 表单方向样式                                                                       | `horizontal` or `vertical` | `vertical` | 否       |
| hasStar      | 必填项红\*展示与否的判断                                                           | boolean                    | true       | 否       |
| firstProps   | `DformInput` api | {}                         | -          | 否       |
| secondProps  | `DformInput` api  or `DformPicker` api | {}                         | -          | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                                   | array                      | []         | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                         | string or node             | ''         | 否       |
| hidden       | 字段展示与否的判断                                                                 | boolean                    | false      | 否       |
| extraType    | 表单字段类型                                                                       | `input` or `select`        | `input`    | 否       |
| renderHeader | 组件头部                                                                           | `number` or `string`       | -          | 否       |
| coverStyle   | 自定义每个选项的样式，例如高度，内外边距等                                         | object                     | -          | 否       |
