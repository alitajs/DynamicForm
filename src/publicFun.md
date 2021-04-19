---
title: 公共方法
---

# 公共方法

## 一、getInitKeyValue 获取表单下 initKey 相同的数据

#### 场景描述

一个页面下存在多组相同的表单，可以用 **`fieldProps` 加下标的形式** 来进行区分，但是取值却比较繁琐。

提供 `getInitKeyValue` 方法，入参为对象，参数有 `form`, `key`, `data` 三个数据。

| 参数 | 说明    | 类型             |
| ---- | ------- | ---------------- |
| form | useForm | FormInstance     |
| key  | initKey | string or number |
| data | 数据源  | any[]            |

#### 使用demo

<code src="./demo/getInitKeyValue.tsx">

