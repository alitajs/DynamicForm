---
title: ImagePicker
group:
  title: ImagePicker
nav:
  title: 组件
  path: /components
---

# ImagePicker

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数          | 说明                                                                                                                                  | 类型                                                          | 默认值          | 是否必填 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------- | -------- |
| title         | 标题                                                                                                                                  | string                                                        | ''              | 是       |
| fieldProps    | 文本属性                                                                                                                              | string                                                        | false           | 是       |
| labelNumber   | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                                                        | 5               | 否       |
| disabled      | 是否禁用                                                                                                                              | boolean                                                       | false           | 否       |
| required      | 必填判断                                                                                                                              | boolean                                                       | false           | 否       |
| maxLength     | 设置上传最大数量                                                                                                                      | number                                                        | -               | 否       |
| hasStar       | 必填项红\*展示与否的判断                                                                                                              | boolean                                                       | true            | 否       |
| rules         | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                                                         | []              | 否       |
| disableDelete | 是否隐藏删除按钮（移动端可使用）                                                                                                      | boolean                                                       | false           | 否       |
| capture       | 图片捕获设置, 具体请参考 MDN 中关于 capture 的说明                                                                                    | boolean                                                       | string \| false | 否       |
| multiple      | 是否支持多选                                                                                                                          | boolean                                                       | false           | 否       |
| showView      | 点击图片是否打开蒙层放大显示图片                                                                                                      | boolean                                                       | true            | 否       |
| selectable    | 是否显示添加按钮                                                                                                                      | boolean                                                       | true            | 否       |
| onImageClick  | 点击图片触发的回调（移动端可使用）                                                                                                    | `(index: number, files: Object): void`                        |                 | 否       |
| onChange      | files 值发生变化触发的回调函数, operationType 操作类型有添加，移除，如果是移除操作，则第三个参数代表的是移除图片的索引                | `(files: Object, operationType: string, index: number): void` |                 | 否       |
| limitSize     | 图片大小限制, 度量长度为 `kb`                                                                                                         | number                                                        |                 | 否       |
| subTitle      | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node                                                | ''              | 否       |
| hidden        | 字段展示与否的判断                                                                                                                    | boolean                                                       | false           | 否       |
| extra         | 右边注释                                                                                                                              | string or node                                                | ''              | 否       |
| compressRatio | 压缩比率(0~1)                                                                                                                         | number                                                        | 1               | 否       |
| className     | 类名                                                                                                                                  | string                                                        | -               | 否       |
| defaultValue  | 设置初始取值                                                                                                                          | []                                                            | -               | 否       |
| coverStyle    | 自定义每个选项的样式，例如高度，内外边距等                                                                                            | object                                                        | -               | 否       |
| positionType  | 表单方向样式                                                                                                                          | `horizontal` or `vertical`                                    | `horizontal`    | 否       |
| renderHeader  | 组件头部                                                                                                                              | `string` or `React.ReactNode`                                 | ''              | 否       |
| renderFooter  | 组件尾部                                                                                                                              | `string` or `React.ReactNode`                                 | ''              | 否       |
| isPc          | pc 效果                                                                                                                               | boolean                                                       | false           | 否       |
