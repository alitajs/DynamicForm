---
title: Radio
group:
  title: Radio
nav:
  title: 组件
  path: /components
---

# Radio

## 代码验演示

<code src="./demo/index.tsx" />

## API

| 参数           | 说明                                                                                                                                  | 类型                       | 默认值                             | 是否必填     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------- | ------------ |
| type           | 表单类型                                                                                                                              | string                     | ''                                 | 是           |
| title          | 标题                                                                                                                                  | string                     | ''                                 | 是           |
| labelNumber    | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                     | 5                                  | 否           |
| data           | 数据                                                                                                                                  | list                       | []                                 | 是           |
| fieldProps     | 文本属性                                                                                                                              | boolean                    | false                              | 是           |
| placeholder    | placeholder                                                                                                                           | string                     | ''                                 | 否           |
| required       | 必填判断                                                                                                                              | boolean                    | false                              | 否           |
| disabled       | 是否可编辑                                                                                                                            | boolean                    | false                              | 否           |
| positionType   | 样式类型                                                                                                                              | `vertical` or `horizontal` | false                              | `horizontal` |
| hasStar        | 必填项红\*展示与否的判断                                                                                                              | boolean                    | true                               | 否           |
| rules          | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                      | []                                 | 否           |
| radioType      | 按钮方向为横向或者纵向，若为纵向，则默认 `positionType` 为 `vertical`                                                                 | `vertical` or `horizontal` | `horizontal`                       |
| 否             |
| subTitle       | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node             | ''                                 | 否           |
| coverStyle     | 自定义每个选项的样式，例如高度，内外边距等                                                                                            | object                     | {}                                 | 否           |
| hidden         | 字段展示与否的判断                                                                                                                    | boolean                    | false                              | 否           |
| onChange       | 值改变事件                                                                                                                            | object                     | (e) => void                        | 否           |
| alias          | data 数据源的别名                                                                                                                     | object                     | { label: 'label', value: 'value' } | 否           |
| renderHeader   | 组件头部                                                                                                                              | `number` or `string`       | -                                  | 否           |
| className      | 类名                                                                                                                                  | string                     | -                                  | 否           |
| allowUnChecked | 允许取消选中                                                                                                                          | boolean                    | true                               | 否           |

## 备注

选中框颜色可配置，请前往[可配置](https://dform.alitajs.com/setting)页面查看。

## 组件使用

### NormalRadio

<code src="./demo/normalRadio.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "radio",
  "fieldProps": "userRadio1",
  "required": true,
  "data": radioList,
  "title": "发票"
}
```

### OnlyRead

<code src="./demo/onlyRead.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "radio",
  fieldProps: "userRadio4",
  required: true,
  data: dayList,
  title: "天气情况",
  disabled: true,
},
```

### VerticalRadio

<code src="./demo/verticalRadio.tsx" />

### VerticalRadioType

<code src="./demo/verticalRadioType.tsx" />
