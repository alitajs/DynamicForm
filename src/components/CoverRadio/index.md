---
title: CoverRadio
---

# CoverRadio

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                  | 类型                       | 默认值       | 是否必填     |
| ------------ | --------------------------------------------------------------------- | -------------------------- | ------------ | ------------ |
| type         | 表单类型                                                              | string                     | ''           | 是           |
| title        | 标题                                                                  | string                     | ''           | 是           |
| data         | 数据                                                                  | list                       | []           | 是           |
| fieldProps   | 文本属性                                                              | boolean                    | false        | 是           |
| required     | 必填判断                                                              | boolean                    | false        | 否           |
| disabled     | 是否可编辑                                                            | boolean                    | false        | 否           |
| positionType | 样式类型                                                              | `vertical` or `horizontal` | false        | `horizontal` |
| hasStar      | 必填项红\*展示与否的判断                                              | boolean                    | true         | 否           |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                      | array                      | []           | 否           |
| radioType    | 按钮方向为横向或者纵向，若为纵向，则默认 `positionType` 为 `vertical` | `vertical` or `horizontal` | `horizontal` | 否           |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效            | string or node             | ''           | 否           |
| coverStyle   | 自定义每个选项的样式，例如高度，内外边距等                            | object                     | {}           | 否           |
| hidden       | 字段展示与否的判断                                                    | boolean                    | false        | 否           |
| onChange     | 值改变事件                                                            | object                     | (e) => void  | 否           |

## 备注

选中项颜色可配置，请前往[可配置](https://dform.alitajs.com/setting)页面查看。

## 组件使用

### Basic CoverRadio

<code src="./demo/basicRadio.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "coverRadio",
  "fieldProps": "sex",
  "required": true,
  "data": sexList,
  "title": "性别"
}
```

### Vertical CoverRadio

<code src="./demo/vertical.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "coverRadio",
  "fieldProps": "sex",
  "required": true,
  "data": sexList,
  "title": "性别",
  "positionType": "vertical",
  "disabled": true,
}
```

### Item Vertical CoverRadio

<code src="./demo/itemVertical.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "coverRadio",
  "fieldProps": "food",
  "required": true,
  "data": foodList,
  "title": "性别",
  "radioType": "vertical",
}
```