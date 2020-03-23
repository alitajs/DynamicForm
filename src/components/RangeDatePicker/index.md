---
title: RangeDatePicker
---

# RangeDatePicker

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                       | 类型                       | 默认值     | 是否必填 |
| ------------ | ---------------------------------------------------------- | -------------------------- | ---------- | -------- |
| type         | 表单类型                                                   | string                     | ''         | 是       |
| title        | 标题                                                       | string                     | ''         | 是       |
| fieldProps   | 文本属性                                                   | string                     | ''         | 是       |
| fieldProps2  | 文本属性                                                   | string                     | ''         | 是       |
| placeholder  | placeholder                                                | string                     | ''         | 否       |
| required     | 必填判断                                                   | boolean                    | false      | 否       |
| modeType     | 时间类型                                                   | string                     | `date`     | 否       |
| minDate      | 最小可选日期                                               | date                       | ''         | 否       |
| maxDate      | 最大可选日期                                               | date                       | ''         | 否       |
| positionType | 表单方向样式                                               | `horizontal` or `vertical` | `vertical` | 否       |
| hasStar      | 必填项红\*展示与否的判断                                   | boolean                    | true       | 否       |
| firstProps   | 增加前表单的属性                                           | {}                         | {}         | 否       |
| secondProps  | 增加后表单的属性                                           | {}                         | {}         | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)           | array                      | []         | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效 | string or node             | ''         | 否       |
| hidden       | 字段展示与否的判断                                         | boolean                    | false      | 否       |


## 备注

**日期字符串在不同浏览器有不同的实现，例如 new Date('2017-1-1') 在 Safari 上是 Invalid Date，而在 Chrome 上是能正常解析的。**

**在设值时，如果是日期字符串请先用 `dateChange(val)` 进行转化下，`dateChange` 可以在 `@alitajs/dform` 中导出。**

例子请参考 `NomarDatePicker` 组件。

## 组件使用

### DateTime

<code src="./demo/datetime.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "rangeDatePicker",
  "fieldProps": "rangeTime1",
  "fieldProps2": "rangeTime2",
  "title": "时间(datetime)",
  "modeType": "datetime",
  "required": true
}
```

### Month

<code src="./demo/month.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "rangeDatePicker",
  "required": true,
  "fieldProps": "rangeTime3",
  "fieldProps2": "rangeTime4",
  "title": "时间(month)",
  "modeType": "month"
}
```

### RangeDate

<code src="./demo/date.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "rangeDatePicker",
  "required": true,
  "fieldProps": "rangeTime5",
  "fieldProps2": "rangeTime6",
  "title": "时间(date)",
  "positionType": "vertical"
}
```
