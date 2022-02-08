---
title: TextArea
group:
  title: TextArea
nav:
  title: 组件
  path: /components
---

# TextArea

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                                                                                  | 类型                                                | 默认值       | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------ | -------- |
| title        | 标题                                                                                                                                  | string                                              | ''           | 是       |
| fieldProps   | 文本属性                                                                                                                              | string                                              | ''           | 是       |
| maxLength    | 最大字数限制(配合 `showCount` 一起使用)                                                                                               | number                                              | -            | 否       |
| showCount    | 字数统计                                                                                                                              | number                                              | -            | 否       |
| placeholder  | placeholder                                                                                                                           | string                                              | ''           | 否       |
| required     | 必填判断                                                                                                                              | boolean                                             | false        | 否       |
| autoSize     | 自适应内容高度                                                                                                                        | `boolean \| { minRows?: number, maxRows?: number }` | false        | 否       |
| rows         | 行数                                                                                                                                  | number                                              | 3            | 否       |
| editable     | 可编辑判断                                                                                                                            | boolean                                             | false        | 否       |
| disabled     | 禁用                                                                                                                                  | boolean                                             | false        | 否       |
| labelNumber  | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                                              | 5            | 否       |
| positionType | 表单方向样式                                                                                                                          | `horizontal` or `vertical`                          | `horizontal` | 否       |
| hasStar      | 必填项红\*展示与否的判断                                                                                                              | boolean                                             | true         | 否       |
| extra        | 右边注释                                                                                                                              | string or node                                      | ''           | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                                               | []           | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node                                      | ''           | 否       |
| coverStyle   | 自定义输入框样式                                                                                                                      | object                                              | {}           | 否       |
| hidden       | 字段展示与否的判断                                                                                                                    | boolean                                             | false        | 否       |
| onClick      | 文字点击事件                                                                                                                          | (val: React.MouseEvent<`HTMLElement`>) => void      | null         | 否       |
| onChange     | 文字改变事件                                                                                                                          | (res: `string`) => void                             | null         | 否       |
| onFocus      | 获得焦点事件                                                                                                                          | (e: `string`) => void                               | null         | 否       |
| onBlur       | 失去焦点事件                                                                                                                          | (res: `string`) => void                             | null         | 否       |
| className    | 类名                                                                                                                                  | string                                              | -            | 否       |
| defaultValue | 设置初始取值                                                                                                                          | string                                              | -            | 否       |
| renderHeader | 组件头部                                                                                                                              | `string` or `React.ReactNode`                       | ''           | 否       |
| renderFooter | 组件尾部                                                                                                                              | `string` or `React.ReactNode`                       | ''           | 否       |
