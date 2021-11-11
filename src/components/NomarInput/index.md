---
title: Input
group:
  title: Input
nav:
  title: 组件
  path: /components
---

# Input

## 备注

**可以自定义设置 `labelNumber` 来调整 `title` 的长度, 如果需要让 `title` 宽度自定义，可以设置 `labelNumber` 大于 `7`**

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                                                                                  | 类型                       | 默认值       | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ | -------- |
| title        | 标题                                                                                                                                  | string                     | ''           | 是       |
| fieldProps   | 文本属性                                                                                                                              | string                     | false        | 是       |
| placeholder  | placeholder                                                                                                                           | string                     | ''           | 否       |
| required     | 必填判断                                                                                                                              | boolean                    | false        | 否       |
| inputType    | html input 框类型                                                                                                                     | string                     | text         | 否       |
| clear        | 是否带清除功能                                                                                                                        | boolean                    | false        | 否       |
| editable     | 是否可编辑                                                                                                                            | boolean                    | true         | 否       |
| disabled     | 不建议采用该属性！具体请看如下备注！                                                                                                  | boolean                    | false        | 否       |
| extra        | 右边注释                                                                                                                              | string or node             | ''           | 否       |
| onClick      | 文字点击事件                                                                                                                          | function                   | null         | 否       |
| labelNumber  | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                     | 5            | 否       |
| positionType | 表单方向样式                                                                                                                          | `horizontal` or `vertical` | `horizontal` | 否       |
| hasStar      | 必填项红\*展示与否的判断                                                                                                              | boolean                    | true         | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                      | []           | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node             | ''           | 否       |
| coverStyle   | 自定义输入框样式                                                                                                                      | object                     | {}           | 否       |
| hidden       | 字段展示与否的判断                                                                                                                    | boolean                    | false        | 否       |
| renderHeader | 组件头部                                                                                                                              | `number` or `string`       | -            | 否       |
| className    | 类名                                                                                                                                  | string                     | -            | 否       |
| defaultValue | 设置初始取值                                                                                                                          | string                     | -            | 否       |
| maxLine      | 文字行数过长时，自动隐藏，可通过点击 `更多` 和 `收起` 进行内容的缩放                                                                  | number                     |              | 否       |

## 备注

`DformInput` 组件若需设置成只读状态，建议使用 `editable = false` 属性，`editable = false` 时，组件点击事件依旧可用。

若设置成 `disabled = true`，则组件在 `ios` 或者 `safari 浏览器` 上值会变浅。

如果有需求为：组件不可编辑的状态下 `onClick` 事件失效，则请采用 `NomarText` 组件。
