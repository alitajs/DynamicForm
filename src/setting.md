---
title: 配置项
---

# 可配置项

## 一、自定义属性

下方提供几个自定义属性，用户可以在 `config/config.ts` 文件下进行编辑：

### 标题大小

`title` 大小默认为 `0.34rem`，如需修改，请增加如下代码：

```js
theme: {
  '@input-font-size': '0.28rem',
}
```

### 选中项和输入框的值颜色

`select`、`date`、`rangeDatePicker` 等选中项的值颜色和 `placeholder`(提示文字) 颜色一样，不易区分用户是否已经选择。

增加如下属性可以直接修改表单选中项和输入框值的颜色。

```js
theme: {
  '@alita-dform-select-color': 'blue',
}
```

### 不可编辑时的文字颜色

`input`, `extraInput`, `area` 类型在属性 `editable` 设置为 `false` 时，文字样式会变淡，如需修改，请增加一下代码：

```js
theme: {
  '@color-text-disabled': '#000',
}
```

## 二、时间类型赋值

**日期字符串在不同浏览器有不同的实现，例如 new Date('2017-1-1') 在 Safari 上是 Invalid Date，而在 Chrome 上是能正常解析的。**

**在设值时，如果是日期字符串请先用 `dateChange(val)` 进行转化下，`dateChange` 可以在 `@alitajs/dform` 中导出。**

例子请参考 `NomarDatePicker` 组件。
