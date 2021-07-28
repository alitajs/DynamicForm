---
title: File
group:
  title: File
nav:
  title: 组件
  path: /components
---

# File

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                       | 类型                 | 默认值                  | 是否必填                      |
| ------------ | ---------------------------------------------------------- | -------------------- | ----------------------- | ----------------------------- | --- |
| type         | 表单类型                                                   | string               | ''                      | 是                            |
| title        | 标题                                                       | string               | ''                      | 是                            |
| fieldProps   | 文本属性                                                   | string               | false                   | 是                            |
| required     | 必填判断                                                   | boolean              | false                   | 否                            |
| hasStar      | 必填项红\*展示与否的判断                                   | boolean              | true                    | 否                            |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效 | string or node       | ''                      | 否                            |
| hidden       | 字段展示与否的判断                                         | boolean              | false                   | 否                            |
| extra        | 右上角上传按钮样式                                         | string or node       |                         | 否                            |
| onClick      | 文件点击事件                                               | (res) => void        |                         | 否                            |
| onChange     | 附件列表被删除后执行的事件                                 | (res, del) => void   |                         | 否                            |
| upload       | 上传的文件                                                 | (res) => void        |                         | 否                            |
| alias        | 附件列表字段别名                                           | { id: string         | number; title: string } | `{ id: 'id' title: 'title' }` | 否  |
| renderHeader | 组件头部                                                   | `number` or `string` | -                       | 否                            |
