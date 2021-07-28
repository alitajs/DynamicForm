---
title: Text
group:
  title: Text
nav:
  title: 组件
  path: /components
---

# NomarText

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                                                                                  | 类型                       | 默认值       | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ | -------- |
| type         | 表单类型                                                                                                                              | string                     | ''           | 是       |
| title        | 标题                                                                                                                                  | string                     | ''           | 是       |
| fieldProps   | 文本属性                                                                                                                              | string                     | false        | 是       |
| placeholder  | placeholder                                                                                                                           | string                     | ''           | 否       |
| required     | 必填判断                                                                                                                              | boolean                    | false        | 否       |
| disabled     | onClick 是否生效的标识                                                                                                                | boolean                    | false        | 否       |
| extra        | 右边注释                                                                                                                              | string or node             | ''           | 否       |
| onClick      | 文字点击事件                                                                                                                          | function                   | null         | 否       |
| labelNumber  | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                     | 5            | 否       |
| positionType | 表单方向样式                                                                                                                          | `horizontal` or `vertical` | `horizontal` | 否       |
| hasStar      | 必填项红\*展示与否的判断                                                                                                              | boolean                    | true         | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                      | []           | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node             | ''           | 否       |
| coverStyle   | 自定义输入框样式                                                                                                                      | object                     | {}           | 否       |
| hidden       | 字段展示与否的判断                                                                                                                    | boolean                    | false        | 否       |
| maxLine      | 文字行数过长时，自动隐藏，可通过点击 `更多` 和 `收起` 进行内容的缩放                                                                  | number                     |              | 否       |
| renderHeader | 组件头部                                                                                                                              | `number` or `string`       | -            | 否       |
| className    | 类名                                                                                                                                  | string                     | -            | 否       |
