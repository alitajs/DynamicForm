---
title: Select
group:
  title: Select
nav:
  title: 组件
  path: /components
---

# Select

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                                                                                  | 类型                                  | 默认值                             | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------- | -------- |
| type         | 表单类型                                                                                                                              | string                                | ''                                 | 是       |
| title        | 标题                                                                                                                                  | string                                | ''                                 | 是       |
| data         | 数据源                                                                                                                                | list                                  | []                                 | 是       |
| fieldProps   | 文本属性                                                                                                                              | string                                | false                              | 是       |
| placeholder  | placeholder                                                                                                                           | string                                | ''                                 | 否       |
| required     | 必填判断                                                                                                                              | boolean                               | false                              | 否       |
| disabled     | 是否可编辑                                                                                                                            | boolean                               | false                              | 否       |
| positionType | 表单方向样式                                                                                                                          | `horizontal` or `vertical`            | `horizontal`                       | 否       |
| hasStar      | 必填项红\*展示与否的判断                                                                                                              | boolean                               | true                               | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                                 | []                                 | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node                        | ''                                 | 否       |
| hidden       | 字段展示与否的判断                                                                                                                    | boolean                               | false                              | 否       |
| onClick      | 表单字段点击事件                                                                                                                      | () => void                            | ''                                 | 否       |
| renderHeader | 组件头部                                                                                                                              | `number` or `string`                  | -                                  | 否       |
| className    | 类名                                                                                                                                  | string                                | -                                  | 否       |
| extra        | 右边注释                                                                                                                              | `string` or `node`                    | ''                                 | 否       |
| coverStyle   | 自定义选择框样式                                                                                                                      | object                                | {}                                 | 否       |
| onChange     | 选中项改变事件                                                                                                                        | (`val`: (string or number)[]) => void | ''                                 | 否       |
| labelNumber  | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                                | 5                                  | 否       |
| alias        | data 数据源的别名                                                                                                                     | IAliasProps                           | { label: 'label', value: 'value' } | 否       |
| defaultValue | 设置初始取值                                                                                                                          | {[]}                                  | -                                  | 否       |
| renderHeader | 组件头部                                                                                                                              | `string` or `React.ReactNode`         | ''                                 | 否       |
| renderFooter | 组件尾部                                                                                                                              | `string` or `React.ReactNode`         | ''                                 | 否       |

## IAliasProps

| 参数  | 说明         | 类型                 | 默认值 | 是否必填 |
| ----- | ------------ | -------------------- | ------ | -------- |
| label | 设置当前取值 | `string`             | -      | 是       |
| value | 设置标签名   | `string` or `number` | -      | 是       |

<!-- ## 组件使用

### NormalSelect

<code src="./demo/normalSelect.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "select",
  "fieldProps": "userPicker1",
  "title": "季节",
  "placeholder": "请选择",
  "data": seasons
}
```

### RequiredSelect

<code src="./demo/requiredSelect.tsx">

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "select",
  "fieldProps": "userPicker2",
  "required": true,
  "title": "城市",
  "placeholder": "请选择",
  "data": citys
}
```

### OnlyRead

<code src="./demo/onlyRead.tsx">
如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "select",
  "fieldProps": "userPicker3",
  "required": true,
  "title": "城市(不可编辑)",
  "placeholder": "请选择",
  "data": citys,
  "disabled": true
}
```

### VerticalSelect

<code src="./demo/verticalPicker.tsx" />
如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "select",
  "fieldProps": "userPicker4",
  "title": "季节",
  "placeholder": "请选择",
  "data": seasons,
  "positionType": "vertical"
}
``` -->
