---
title: NomarImagePicker
---

# NomarImagePicker

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数          | 说明                                                                                                                   | 类型                                                          | 默认值 | 是否必填 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------ | -------- |
| type          | 表单类型                                                                                                               | string                                                        | ''     | 是       |
| title         | 标题                                                                                                                   | string                                                        | ''     | 是       |
| fieldProps    | 文本属性                                                                                                               | string                                                        | false  | 是       |
| required      | 必填判断                                                                                                               | boolean                                                       | false  | 否       |
| hasStar       | 必填项红\*展示与否的判断                                                                                               | boolean                                                       | true   | 否       |
| rules         | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                       | array                                                         | []     | 否       |
| disableDelete | 是否隐藏删除按钮                                                                                                       | boolean                                                       | false  | 否       |
| selectable    | 是否显示添加按钮                                                                                                       | boolean                                                       | true   | 否       |
| onImageClick  | 点击图片触发的回调                                                                                                     | `(index: number, files: Object): void`                        |        | 否       |
| onChange      | files 值发生变化触发的回调函数, operationType 操作类型有添加，移除，如果是移除操作，则第三个参数代表的是移除图片的索引 | `(files: Object, operationType: string, index: number): void` |        | 否       |
| limitSize     | 图片大小限制, 度量长度为 `kb`                                                                                          | number                                                        |        | 否       |
| subTitle      | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                             | string or node                                                | ''     | 否       |
| hidden        | 字段展示与否的判断                                                                                                     | boolean                                                       | false  | 否       |


## 组件使用

### InsertImage

<code src="./demo/insertImg.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "image",
  "fieldProps": "insertImg",
  "required": true,
  "title": "请添加图片",
}
```

### ShowImage

<code src="./demo/showImg.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "image",
  "fieldProps": "showImg",
  "required": true,
  "title": "展示图片",
  "disableDelete": true,
}
```

### NoInsertImage

<code src="./demo/noInsertImg.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "image",
  "fieldProps": "noInsertImg",
  "required": true,
  "title": "不可添加图片",
  "selectable": false,
}
```

