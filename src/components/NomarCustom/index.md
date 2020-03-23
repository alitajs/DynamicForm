---
title: Custom
---

# Custom

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数           | 说明                                                       | 类型                       | 默认值 | 是否必填   |
| -------------- | ---------------------------------------------------------- | -------------------------- | ------ | ---------- |
| type           | 表单类型                                                   | string                     | ''     | 是         |
| title          | 标题                                                       | string                     | ''     | 是         |
| fieldProps     | 文本属性                                                   | boolean                    | false  | 是         |
| required       | 必填判断                                                   | boolean                    | false  | 否         |
| positionType   | 样式类型                                                   | `vertical` or `horizontal` | false  | `vertical` |
| hasStar        | 必填项红\*展示与否的判断                                   | boolean                    | true   | 否         |
| rules          | 规则校验(如需用到该字段，请重写 `required` 校验)           | array                      | []     | 否         |
| CustomDom      | 自定义样式                                                 | React.Node                 |        | 是         |
| customDomProps | 自定义样式传入的值                                         | Object                     | {}     | 否         |
| subTitle       | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效 | string or node             | ''     | 否         |
| hidden         | 字段展示与否的判断                                         | boolean                    | false  | 否         |


## 自定义组件开发教程

### 非受控

如果你在项目中使用到的组件只展示内容，只需要将组件做为 `CustomDom` 参数传入，组件里需要传入的参数，通过 `customDomProps` 传入。

### 受控

如果项目中用到的自定义组件需要受控，需在自定义组件中增加 `props.onChange()` 函数，改变表单受控值。

组件会通过 `props.initValue` 传入在 `formsValues` 设置的初始值。你可以进行页面初始化的数据回填操作。