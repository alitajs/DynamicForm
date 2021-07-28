---
title: AddressPicker
group:
  title: AddressPicker
nav:
  title: 组件
  path: /components
---

# AddressPicker

> 注意：`AddressPicker` 的 `formsValues` **不建议放在页面上直接定义变量**，建议放在使用 `useState` 或者类似 `dva` 的仓库进行存储。因为 `data` 地址数据源改变时，会渲染整个 JSON 数据，`formsValues` 会取旧值进行渲染，导致页面数据展示错误。可看演示 demo。

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数            | 说明                                                                                                                                  | 类型                       | 默认值                             | 是否必填     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------- | ------------ |
| type            | 表单类型                                                                                                                              | string                     | ''                                 | 是           |
| title           | 标题                                                                                                                                  | string                     | ''                                 | 是           |
| fieldProps      | 文本属性                                                                                                                              | boolean                    | false                              | 是           |
| onChangeLevel   | 层级改变事件                                                                                                                          | function                   | (e) => void                        | 是           |
| placeholderList | 用户选择提示列表                                                                                                                      | object                     | []                                 | 是           |
| level           | 总层级数。 若不设值，则默认是灵活不固定的层级。当 `data` 数据源为空时，默认为最后一个层级，弹框自动关闭                               | number                     | 无                                 | 否           |
| data            | 当前列表选项的值                                                                                                                      | object                     | []                                 | 是           |
| required        | 必填判断                                                                                                                              | boolean                    | false                              | 否           |
| coverStyle      | 自定义输入框样式                                                                                                                      | object                     | {}                                 | 否           |
| disabled        | 是否可编辑                                                                                                                            | boolean                    | false                              | 否           |
| positionType    | 样式类型                                                                                                                              | `vertical` or `horizontal` | false                              | `horizontal` |
| hasStar         | 必填项红\*展示与否的判断                                                                                                              | boolean                    | true                               | 否           |
| rules           | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                      | []                                 | 否           |
| subTitle        | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node             | ''                                 | 否           |
| hidden          | 字段展示与否的判断                                                                                                                    | boolean                    | false                              | 否           |
| placeholder     | 提示文字                                                                                                                              | string                     | ''                                 | 否           |
| labelNumber     | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                     | 5                                  | 否           |
| onClick         | 文字点击事件                                                                                                                          | function                   | null                               | 否           |
| leftContent     | 弹框头部左侧文字                                                                                                                      | `string` or `node`         | `取消`                             | 否           |
| rightContent    | 弹框头部右侧文字                                                                                                                      | `string` or `node`         | `确定`                             | 否           |
| height          | 固定弹框高度                                                                                                                          | `number` or `string`       | null                               | 否           |
| noData          | 无数据时展示的效果                                                                                                                    | string or node             | '暂无数据'                         | 否           |
| loading         | loading 为 `true` 时，noData 数据不会展示                                                                                             | boolean                    | false                              | 否           |
| renderHeader    | 组件头部                                                                                                                              | `number` or `string`       | -                                  | 否           |
| className       | 类名                                                                                                                                  | string                     | -                                  | 否           |
| alias           | data 数据源的别名                                                                                                                     | object                     | { label: 'label', value: 'value' } | 否           |

## 备注

- 顶部选中项文字和 `border-bottom` 颜色: `@alita-dform-radio-color`
