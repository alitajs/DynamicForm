---
title: API
group:
  title: API
  path: /api
  order: 1
nav:
  title: API
  path: /api
  order: 2
---

# API

| 参数           | 说明                                                 | 类型                                                  | 默认值 | 是否必填 |
| -------------- | ---------------------------------------------------- | ----------------------------------------------------- | ------ | -------- |
| data           | `json` 格式的数据源                                  | `DFormData`                                           | 无     | 否       |
| form           | 表单对象                                             | FormInstance, 可通过 `const [form] = useForm();` 创建 | 无     | 是       |
| formsValues    | 表单值                                               | `Store`                                               | {}     | 否       |
| onFinish       | 表单提交事件                                         | `(values: Store) => void`                             | 无     | 否       |
| onFinishFailed | 表单提交失败事件                                     | `(errorInfo: ValidateErrorEntity) => void;`           | 无     | 否       |
| autoLineFeed   | 当 `title` 过长自动增加 `positionType` 为 `vertical` | `boolean`                                             | true   | 否       |
| allDisabled    | 全部不可交互，展示状态                               | `boolean`                                             | false  | 否       |
| onValuesChange | 字段改变时抛出事件                                   | `(values: any) => void;`                              | 无     | 否       |
| isDev          | 手动声明开发模式                                     | `boolean`                                             | false  | 否       |
| failScroll     | 表单提交失败,滚动到错误的字段位置                    | `boolean`                                             | true   | 否       |
| errorFlag      | 表单提交失败,是否显示错误的提示                      | `boolean`                                             | true   | 否       |
