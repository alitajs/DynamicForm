---
title: 组件化分组
group:
  title: 组件化分组
  path: /usa
  order: 1
nav:
  title: 分组
  path: /groupUsage
  order: 3
---

# 组件化分组

## 代码演示

<code src="./groupUsage.tsx" />

## API

| 参数          | 说明                   | 类型                  | 默认值  | 是否必填 |
| ------------- | ---------------------- | --------------------- | ------- | -------- |
| type          | 分组类型               | `empty` \| `card`     | `empty` | 否       |
| title         | 标题                   | `string` \| `node`    | `-`     | 否       |
| required      | 是否必填(只做样式显示) | `boolean`             | `false` | 否       |
| classname     | 自定义样式名           | `React.CSSProperties` | `-`     | 否       |
| leftView      | 左侧样式               | `string` \| `node`    | `-`     | 否       |
| rightView     | 左侧样式               | `string` \| `node`    | `-`     | 否       |
| extandPostion | 开关位置               | `top` \| `bottom`     | `-`     | 否       |
| defaultExtand | 默认是面板开关         | `boolean`             | true    | 否       |
| disabled      | 是否禁用               | `boolean`             | false   | 否       |
| hideStar      | 是否隐藏必填`*`        | `boolean`             | false   | 否       |
