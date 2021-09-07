---
title: Switch
group:
  title: Switch
nav:
  title: 组件
  path: /components
---

# Switch

## 代码展示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                             | 类型                 | 默认值 | 是否必填 |
| ------------ | ------------------------------------------------ | -------------------- | ------ | -------- |
| type         | 表单类型                                         | string               | ''     | 是       |
| coverStyle   | 自定义选择框样式                                 | object               | {}     | 否       |
| title        | 标题                                             | string               | ''     | 是       |
| fieldProps   | 文本属性                                         | string               | -      | 是       |
| placeholder  | placeholder                                      | string               | ''     | 否       |
| required     | 必填判断                                         | boolean              | false  | 否       |
| disabled     | 是否可编辑                                       | boolean              | false  | 否       |
| hasStar      | 必填项红\*展示与否的判断                         | boolean              | true   | 否       |
| hasStar      | 必填项红\*展示与否的判断                         | boolean              | true   | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验) | array                | []     | 否       |
| hidden       | 字段展示与否的判断                               | boolean              | false  | 否       |
| renderHeader | 组件头部                                         | `number` or `string` | -      | 否       |
| className    | 类名                                             | string               | -      | 否       |
| defaultValue | 设置初始取值                                     | boolean              | false  | 否       |

