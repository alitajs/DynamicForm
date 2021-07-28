---
title: 配置项
group:
  title: 配置项
nav:
  title: 配置项
  path: /setting
---

# 可配置项

## 一、使用说明

安装 `dform` 会自动安装上 `rc-field-form`，若用户自行安装 `rc-field-form`，**可能会导致 `rc-field-form` 版本不一致而报错。**

**demo 中所有需要从 `rc-field-form` 导出使用的字段都可以在 `dform` 中导出使用。**

## 二、自定义属性

下方提供几个自定义属性，用户可以在 `config/config.ts` 文件下进行编辑：

```js
theme: {
  '@alita-dform-title-font-size': '28',
  '@alita-dform-title-color': 'blue',
  ...
}
```

| 参数                            | 说明                                                             | 默认值    |
| ------------------------------- | ---------------------------------------------------------------- | --------- |
| `@alita-dform-title-font-size`  | 标题大小                                                         | 34        |
| `@alita-dform-title-color`      | 标题颜色                                                         | `blue`    |
| `@alita-dform-value-font-size`  | 选中项和输入框的值大小                                           | 34        |
| `@alita-dform-value-color`      | 选中项和输入框的值颜色                                           | `blue`    |
| `@alita-dform-placeholder`      | `placeholder` 的颜色                                             | `#888`    |
| `@color-text-disabled`          | 不可编辑的文字颜色                                               | `#000`    |
| `@alita-dform-radio-color`      | CoverRadio, Radio, CheckBox, MultiplePicker 选中时的颜色         | `#108ee9` |
| `@alita-dform-radio-font-color` | CoverRadio, Radio, CheckBox, MultiplePicker 选中时的文字颜色颜色 | `#fff`    |

## 三、时间类型赋值

**日期字符串在不同浏览器有不同的实现，例如 new Date('2017-1-1') 在 Safari 上是 Invalid Date，而在 Chrome 上是能正常解析的。**

**在设值时，如果是日期字符串请先用 `dateChange(val)` 进行转化下，`dateChange` 可以在 `@alitajs/dform` 中导出。**

例子请参考 `NomarDatePicker` 组件。
