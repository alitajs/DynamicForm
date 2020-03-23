---
title: Input
---

# Input

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数         | 说明                                                                                                                                  | 类型                       | 默认值       | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ | -------- |
| type         | 表单类型                                                                                                                              | string                     | ''           | 是       |
| title        | 标题                                                                                                                                  | string                     | ''           | 是       |
| fieldProps   | 文本属性                                                                                                                              | string                     | false        | 是       |
| placeholder  | placeholder                                                                                                                           | string                     | ''           | 否       |
| required     | 必填判断                                                                                                                              | boolean                    | false        | 否       |
| inputType    | html input 框类型                                                                                                                     | string                     | text         | 否       |
| clear        | 是否带清除功能                                                                                                                        | boolean                    | false        | 否       |
| editable     | 是否可编辑                                                                                                                            | boolean                    | true         | 否       |
| extra        | 右边注释                                                                                                                              | string or node             | ''           | 否       |
| onClick      | 文字点击事件                                                                                                                          | function                   | null         | 否       |
| labelNumber  | 定宽枚举值：`num * @input-label-width: 34px`，可用 `2-7` 之间的数字，一般(不能保证全部)能对应显示出相应个数的中文文字(不考虑英文字符) | number                     | 5            | 否       |
| positionType | 表单方向样式                                                                                                                          | `horizontal` or `vertical` | `horizontal` | 否       |
| hasStar      | 必填项红\*展示与否的判断                                                                                                              | boolean                    | true         | 否       |
| rules        | 规则校验(如需用到该字段，请重写 `required` 校验)                                                                                      | array                      | []           | 否       |
| subTitle     | 标题右侧的副标题，仅在 `positionType` 为 `vertical` 时生效                                                                            | string or node             | ''           | 否       |
| coverStyle   | 自定义输入框样式                                                                                                                      | object                     | {}           | 否       |
| hidden       | 字段展示与否的判断                                                                                                                    | boolean                    | false        | 否       |


## 组件使用

### NomarInput

<code src="./demo/nomarInput.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "input"
  fieldProps: "username",
  required: true,
  placeholder: "请输入",
  title: "用户名",
  inputType: "text",
  clear: true,
  coverStyle:{
    textAlign: "left",
  }
}
```

### ReadOnly

<code src="./demo/readOnly.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  type: "input",
  fieldProps: "userAge",
  placeholder: "这里只读不可编辑",
  title: "年龄",
  inputType: "text",
  editable: false,
},
```

### StringExtra

<code src="./demo/stringExtra.tsx" />

如需在 `DynamicForm` 中使用，请使用以下 `json`：

```json
{
  "type": "input",
  "fieldProps": "userClick",
  "placeholder": "0.00",
  "title": "价格",
  "extra": "¥",
  "inputType": "number",
  "required": true
}
```

### NodeExtraClick

<code src="./demo/nodeExtraClick.tsx" />

```json
{
  type: "input",
  fieldProps: "userPosition",
  placeholder: "请定位",
  required: true,
  title: "定位",
  extra: extraImg()
  inputType: "number",
}
```

### TextClick

<code src="./demo/textClick.tsx" />

```json
{
  "type": "input",
  "fieldProps": "userTitle",
  "placeholder": "存在点击事件",
  "required": true,
  "title": "标题",
  "editable": false,
  "onClick": e => console.log(e)
}
```

### TitleTooLong

<code src="./demo/titleTooLong.tsx" />

```json
{
  "type": "input",
  "fieldProps": "usernameTooLong",
  "required": true,
  "placeholder": "请输入",
  "title": "标题名称过长",
  "labelNumber": 7,
  "inputType": "text",
  "clear": true
}
```

### VerticalInput

<code src="./demo/verticalInput.tsx" />

```json
{
  "type": "input",
  "fieldProps": "cardNumber",
  "required": true,
  "placeholder": "请输入",
  "title": "身份证号码",
  "inputType": "text",
  "clear": true,
  "positionType": "vertical",
  "rules": [
    { required: true, message: `请输入` },
    {
      pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, 'g'),
      message: '名称只允许包含数字、字母和下划线',
    },
  ],
}
```
