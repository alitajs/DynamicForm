---
title: 首页
---

# 移动端的表单方案

## 移动端演示地址

在移动端访问，能浏览最佳演示效果，请使用移动设备扫描下方二维码，或者点击下方二维码，在新页面中打开浏览器开发者工具，模拟移动端访问。

<code src="./demo/show.tsx" />

## 代码演示

<code src="./demo/index.tsx" />

## API

| 参数           | 说明                                                 | 类型                                                  | 默认值 | 是否必填 |
| -------------- | ---------------------------------------------------- | ----------------------------------------------------- | ------ | -------- |
| data           | `json` 格式的数据源                                  | `DFormData`                                           | 无     | 是       |
| form           | 表单对象                                             | FormInstance, 可通过 `const [form] = useForm();` 创建 | 无     | 是       |
| formsValues    | 表单值                                               | `Store`                                               | {}     | 否       |
| onFinish       | 表单提交事件                                         | `(values: Store) => void`                             | 无     | 否       |
| onFinishFailed | 表单提交失败事件                                     | `(errorInfo: ValidateErrorEntity) => void;`           | 无     | 否       |
| autoLineFeed   | 当 `title` 过长自动增加 `positionType` 为 `vertical` | `boolean`                                             | true   | 否       |
| allDisabled    | 全部不可交互，展示状态                               | `boolean`                                             | false  | 否       |
| onValuesChange | 字段改变时抛出事件                                   | `(values: any) => void;`                              | 无     | 否       |
| isDev          | 手动声明开发模式                                     | `boolean`                                             | false  | 否       |

## 特性

1. 当 title 超过 15 个字节，会自动开始双行模式，可以通过显示设置 positionType 关闭。
2. 根据传入数据自动识别表单类型，分别是 'NORMAL' | 'NORMALLIST' | 'CARD' | 'CARDLIST';（可在页面下方看到所有类型的展示样式。）

## 表单组件

封装常用的表单组件，将 antd-mobile 的组件，改成受控组件。

antd-mobile 官方用法

```tsx | pure
<InputItem
  {...getFieldProps('autofocus')}
  clear
  placeholder="auto focus"
  ref={el => (this.autoFocusInst = el)}
>
  标题
</InputItem>
```

使用@alitajs/dform

```tsx | pure
<NomarInput name="autofocus" placeholder="auto focus" title="标题" />
```

## 动态表单

antd-mobile 官方用法

```tsx | pure
<List renderHeader={() => 'Customize to focus'}>
  <InputItem
    {...getFieldProps('autofocus')}
    clear
    placeholder="auto focus"
    ref={el => (this.autoFocusInst = el)}
  >
    标题
  </InputItem>
  <Picker
    extra="请选择(可选)"
    data={district}
    title="Areas"
    {...getFieldProps('district', {
      initialValue: ['340000', '341500', '341502'],
      rules: [{ required: true, message: `请输入${title}` }],
    })}
    onOk={e => console.log('ok', e)}
    onDismiss={e => console.log('dismiss', e)}
  >
    <List.Item arrow="horizontal">Multiple & cascader</List.Item>
  </Picker>
</List>
```

使用@alitajs/dform

```tsx | pure
const formData = [
  {
    type: 'input',
    fieldProps: 'autofocus',
    required: true,
    placeholder: 'auto focus',
    title: '标题',
    inputType: 'text',
  },
  {
    type: 'select',
    fieldProps: 'district',
    required: true,
    placeholder: '请选择(可选)',
    title: 'Multiple & cascader',
    data: district,
  },
];
<DynamicForm data={formData} />;
```


## 四种态表单类型

### NORMAL

<code src="./demo/index.tsx" />

#### data 数据类型

```tsx | pure
type data = IFormItemProps[];
// IFormItemProps 类型定义见页面最下方
```

### NORMALLIST

<code src="./demo/normallist.tsx" />

#### data 数据类型

```tsx | pure
type data = IFormItemProps[][];
```

### CARD

<code src="./demo/card.tsx" />

#### data 数据类型

```tsx | pure
type data = CardDForm;
interface CardDForm{
  title?: React.ReactNode;
  /** need url of img, if this is string. */
  thumb?: React.ReactNode;
  extra?: React.ReactNode;
  data:IFormItemProps[],
};
```

### CARDLIST

<code src="./demo/cardlist.tsx" />

#### data 数据类型

```tsx | pure
type data = CardDForm[];

```
## IFormItemProps 类型定义

```ts | pure
interface IFormItemProps {
  type:
    | 'input'
    | 'select'
    | 'area'
    | 'date'
    | 'switch'
    | 'extraInput'
    | 'radio'
    | 'rangeDatePicker'
    | 'checkbox';
  title: string;
  fieldProps: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  data?: any[];
  inputType?: InputItemPropsType['type'];
  modeType?: DatePickerPropsType['mode'];
  fieldProps2?: string;
  placeholder2?: string;
  extraType?: 'input' | 'select';
  editable?: boolean;
  rows?: number;
  labelNumber?: number;
  positionType?: 'vertical' | 'horizontal';
  hasStar?: boolean;
  firstProps?: any;
  secondProps?: any;
  radioType?: 'vertical' | 'horizontal';
  selectable?: boolean;
  limitSize?: number;
  CustomDom?: any;
  customDomProps?: any;
  subTitle?: string | React.ReactNode;
}
```

## 可视化编辑方案

方案灵感来源于 [ava](https://github.com/antvis/ava) 的 `autoChart`，用法和触发条件一致，都是 data 为空且在开发状态的时候，显示编辑表单按钮。用户可以强制设定 `isDev` 来在任意环境中使用。

![2020-01-20 17 16 23](https://user-images.githubusercontent.com/11746742/72713840-b37bc900-3ba8-11ea-8a94-d19cdd39be53.gif)

更多详情，请点击[dform 官网](https://dform.alitajs.com/) 欢迎交流。感谢！
