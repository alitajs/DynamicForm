---
title: Func
group:
  title: Func
  path: /func
nav:
  title: API
  path: /api
---

# 方法

## 使用方法

```js
import {
  dateChange,
  getByteLen,
  getRandom,
  transformFile,
} from '@alitajs/dform';
```

## API

| 参数          | 说明                                                                        | 类型                                                      |
| ------------- | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| dateChange    | 对日期格式进行转化，保证值在 `Safari` 能正常展示,使用方法请参考 `Date` 组件 | `(date: Date \| string) => new Date(YYYY,MM,DD,HH,mm,ss)` |
| getByteLen    | 获取字符串的字节数量                                                        | `(val: string) => number`                                 |
| getRandom     | 获取随机值                                                                  | `() => string`                                            |
| transformFile | 压缩图片                                                                    | `(file:File, pictureQuality: 压缩比例(0～1)) => File`     |
