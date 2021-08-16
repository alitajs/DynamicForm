---
title: JSON分组
group:
  title: JSON分组
  path: /jso
nav:
  title: 分组
  path: /groupUsage
---

# JSON 分组

## 代码演示

<code src="./jsonGroup.tsx" />

## API

| 参数       | 说明       | 类型         | 默认值 | 是否必填 |
| ---------- | ---------- | ------------ | ------ | -------- |
| groupProps | 分组的属性 | `GroupProps` | `-`    | 是       |

## GroupProps API

| 参数      | 说明                   | 类型                  | 默认值  | 是否必填 |
| --------- | ---------------------- | --------------------- | ------- | -------- |
| type      | 分组类型               | `empty` \| `card`     | `empty` | 否       |
| title     | 标题                   | `string` \| `node`    | `-`     | 否       |
| required  | 是否必填(只做样式显示) | `boolean`             | `false` | 否       |
| classname | 自定义样式名           | `React.CSSProperties` | `-`     | 否       |
| leftView  | 左侧样式               | `string` \| `node`    | `-`     | 否       |
| rightView | 左侧样式               | `string` \| `node`    | `-`     | 否       |
