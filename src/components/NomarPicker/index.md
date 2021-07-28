---
title: Picker
group:
  title: Picker
nav:
  title: 组件
  path: /components
---

# Picker

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                                                                                  | 类型                       | 默认值                             | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------- | -------- |
| type         | 表单类型                                                                                                                              | string                     | ''                                 | 是       |
| title        | 标题                                                                                                                                  | string                     | ''                                 | 是       |
| data         | 数据源                                                                                                                                | list                       | []                                 | 是       |
| fieldProps   | 文本属性                                                                                                                              | string                     | false                              | 是       |
| placeholder  | placeholder                                                                                                                           | string                     | ''                                 | 否       |
| required     | 必填判断                                                                                                                              | boolean                    | false                              | 否       |
| disabled     | 是否可编辑                                                                                                                            | boolean                    | false                              | 否       |
| positionType | 表单方向样式                                                                                                                          | `horizontal` or `vertical` | `horizontal`                       | 否       |
| hasStar      | 必填项红\*展示与否的判断                                                                                                              | boolean                    | true                               | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                      | []                                 | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node             | ''                                 | 否       |
| hidden       | 字段展示与否的判断                                                                                                                    | boolean                    | false                              | 否       |
| onClick      | 表单字段点击事件                                                                                                                      | (val) => void              | ''                                 | 否       |
| onChange     | 选中项改变事件                                                                                                                        | (val) => void              | ''                                 | 否       |
| labelNumber  | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                     | 5                                  | 否       |
| coverStyle   | 自定义选择框样式                                                                                                                      | object                     | {}                                 | 否       |
| alias        | data 数据源的别名                                                                                                                     | object                     | { label: 'label', value: 'value' } | 否       |
| extra        | 右边注释                                                                                                                              | `string` or `node`         | ''                                 | 否       |
| renderHeader | 组件头部                                                                                                                              | `number` or `string`       | -                                  | 否       |
| className    | 类名                                                                                                                                  | string                     | -                                  | 否       |
