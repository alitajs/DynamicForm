---
title: 配置项
---

# 可配置项

## 一、使用说明

安装 `dform` 会自动安装上 `rc-field-form`，若用户自行安装 `rc-field-form`，**可能会导致 `rc-field-form` 版本不一致而报错。**

**demo 中所有需要从 `rc-field-form` 导出使用的字段都可以在 `dform` 中导出使用。**

## 二、自定义属性

下方提供几个自定义属性，用户可以在 `config/config.ts` 文件下进行编辑：

### 标题大小和颜色

`title` 大小默认为 `0.34rem`，如需修改，请增加如下代码：

```js
theme: {
  '@alita-dform-title-font-size': '0.28rem',
  '@alita-dform-title-color': 'blue',
}
```

### 选中项和输入框的值颜色和大小

`select`、`date`、`rangeDatePicker` 等选中项的值颜色和 `placeholder`(提示文字) 颜色一样，不易区分用户是否已经选择。

增加如下属性可以直接修改表单选中项和输入框值的颜色和文字大小。

```js
theme: {
   '@alita-dform-select-font-size': '0.34rem',
  '@alita-dform-select-color': 'blue',
}
```

### 不可编辑时的文字颜色

`input`, `extraInput`, `area` 类型在属性 `disabled` 设置为 `true`, 或者 `editable` 设置为 `false` 时，文字样式会变淡，如需修改，请增加一下代码：

```js
theme: {
  '@color-text-disabled': '#000',
}
```

### CoverRadio, NomarRadio, NomarCheckBox, MultiplePicker 选中时的背景颜色和文字颜色

```js
theme: {
  '@alita-dform-radio-color': '#108ee9';
  '@alita-dform-radio-font-color': '#fff';
}
```

## 三、时间类型赋值

**日期字符串在不同浏览器有不同的实现，例如 new Date('2017-1-1') 在 Safari 上是 Invalid Date，而在 Chrome 上是能正常解析的。**

**在设值时，如果是日期字符串请先用 `dateChange(val)` 进行转化下，`dateChange` 可以在 `@alitajs/dform` 中导出。**

例子请参考 `NomarDatePicker` 组件。
