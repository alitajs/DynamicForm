---
title: 集联规则使用
group:
  title: 集联规则使用
nav:
  title: 集联规则使用
  path: /relativesUsage
---

# 集联规则使用

## 代码演示

<code src="./relativesUsage.tsx" />

## 集联配置 API

| 参数      | 说明         | 类型                             | 默认值 | 是否必填 |
| --------- | ------------ | -------------------------------- | ------ | -------- |
| relatives | 表单字段编码 | [key:string]: RelativesItemProps | -      | true     |

### RelativesItemProps

| 参数        | 说明           | 类型                                                                  | 默认值 | 是否必填 |
| ----------- | -------------- | --------------------------------------------------------------------- | ------ | -------- |
| type        | 集联类型       | `changeFormValue` or `required` or `hidden` or `disabled` or `custom` | -      | true     |
| targetValue | 触发条件数据集 | any[]                                                                 | []     | true     |
| targetSet   | 集联内容       | `TargetProps`[]                                                       | []     | true     |

### TargetProps

| 参数          | 说明               | 类型   | 默认值 | 是否必填 |
| ------------- | ------------------ | ------ | ------ | -------- |
| targetField   | 联动目标字段       | string | -      | true     |
| targetValue   | 修改内容数据       | any    | -      | false    |
| targetContent | 自定义变更表单内容 | any    | {}     | false    |
