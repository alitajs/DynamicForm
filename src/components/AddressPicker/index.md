---
title: AddressPicker
---

# AddressPicker

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数            | 说明                                                       | 类型                       | 默认值      | 是否必填     |
| --------------- | ---------------------------------------------------------- | -------------------------- | ----------- | ------------ |
| type            | 表单类型                                                   | string                     | ''          | 是           |
| title           | 标题                                                       | string                     | ''          | 是           |
| fieldProps      | 文本属性                                                   | boolean                    | false       | 是           |
| onChangeLevel   | 层级改变事件                                               | function                   | (e) => void | 是           |
| placeholderList | 用户选择提示列表                                           | object                     | []          | 是           |
| level           | 总层级数                                                   | number                     | 无          | 是           |
| data            | 当前列表选项的值                                           | object                     | []          | 是           |
| required        | 必填判断                                                   | boolean                    | false       | 否           |
| disabled        | 是否可编辑                                                 | boolean                    | false       | 否           |
| positionType    | 样式类型                                                   | `vertical` or `horizontal` | false       | `horizontal` |
| hasStar         | 必填项红\*展示与否的判断                                   | boolean                    | true        | 否           |
| rules           | 规则校验(如需用到该字段，请重写 `required` 校验)           | array                      | []          | 否           |
| subTitle        | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效 | string or node             | ''          | 否           |
| hidden          | 字段展示与否的判断                                         | boolean                    | false       | 否           |
| placeholder     | 提示文字                                                   | string                     | ''          | 否           |

## 备注

- 顶部选中项文字和 `border-bottom` 颜色: `@alita-dform-radio-color`

