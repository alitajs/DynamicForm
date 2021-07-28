---
title: CheckBox
group:
  title: CheckBox
nav:
  title: 组件
  path: /components
---

# Checkbox

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                                 | 类型                 | 默认值                             | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------ | -------------------- | ---------------------------------- | -------- |
| type         | 表单类型                                                                             | string               | ''                                 | 是       |
| title        | 标题                                                                                 | string               | ''                                 | 是       |
| fieldProps   | 文本属性                                                                             | string               | ''                                 | 是       |
| data         | 数据源                                                                               | list                 | []                                 | 是       |
| placeholder  | placeholder                                                                          | string               | ''                                 | 否       |
| required     | 必填判断                                                                             | boolean              | false                              | 否       |
| hasStar      | 必填项红\*展示与否的判断                                                             | boolean              | true                               | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                                     | array                | []                                 | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                           | string or node       | ''                                 | 否       |
| hidden       | 字段展示与否的判断                                                                   | boolean              | false                              | 否       |
| chunk        | 分列展示                                                                             | number               | 1                                  | 否       |
| alias        | data 数据源的别名                                                                    | object               | { label: 'label', value: 'value' } | 否       |
| renderHeader | 组件头部                                                                             | `number` or `string` | -                                  | 否       |
| className    | 类名                                                                                 | string               | -                                  | 否       |
| disableItem  | 禁用子项，这是一个函数，最终返回`boolean`，参数为当前循环的 item，返回 `true` 则禁用 | (item) => `boolean`  | -                                  | 否       |

## 备注

勾选框颜色可配置，请前往[可配置](https://dform.alitajs.com/setting)页面查看。

## 组件使用

### Checkbox

<code src="./demo/checkbox.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "checkbox",
  "title": "喜欢的水果",
  "required": true,
  "data": fruitsList,
  "fieldProps": "fruit"
}
```
