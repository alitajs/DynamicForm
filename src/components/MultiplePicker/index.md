---
title: MultiplePicker
---

# MultiplePicker

<code src="./demo/index.tsx" />

## API

| 参数           | 说明                                                                                                                                  | 类型           | 默认值      | 是否必填 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------- | -------- |
| type           | 表单类型                                                                                                                              | string         | ''          | 是       |
| title          | 标题                                                                                                                                  | string         | ''          | 是       |
| fieldProps     | 文本属性                                                                                                                              | string         | ''          | 是       |
| data           | 数据源                                                                                                                                | list           | []          | 是       |
| placeholder    | placeholder                                                                                                                           | string         | ''          | 否       |
| required       | 必填判断                                                                                                                              | boolean        | false       | 否       |
| hasStar        | 必填项红\*展示与否的判断                                                                                                              | boolean        | true        | 否       |
| coverStyle     | 自定义输入框样式                                                                                                                      | object         | {}          | 否       |
| rules          | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array          | []          | 否       |
| subTitle       | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node | ''          | 否       |
| hidden         | 字段展示与否的判断                                                                                                                    | boolean        | false       | 否       |
| disabled       | 是否可选                                                                                                                              | boolean        | false       | 否       |
| onChange       | 值改变事件                                                                                                                            | object         | (e) => void | 否       |
| coverStyle     | 选择项改变事件                                                                                                                        | object         | {}          | 否       |
| maxValueLength | 最大可选长度，初始赋值如果大于该值，根据选项顺序获取指定的选中项                                                                      | number         |             | 否       |
| labelNumber    | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number         | 5           | 否       |
| onClick        | 文字点击事件                                                                                                                          | function       | null        | 否       |

## 备注

选中项文字颜色可配置，请前往[可配置](https://dform.alitajs.com/setting)页面查看。




