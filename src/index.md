---
title: 首页
---

# @alitajs/dform

## 组件化代码演示

[组件化使用](/component-usage)

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
| failScroll     | 表单提交失败,滚动到错误的字段位置                    | `boolean`                                             | true   | 否       |

## 特性

1. 当 title 超过 15 个字节，会自动开始双行模式，可以通过显示设置 positionType 关闭。

2. **日期字符串在不同浏览器有不同的实现，例如 new Date('2017-1-1') 在 Safari 上是 Invalid Date，而在 Chrome 上是能正常解析的。在设值时，如果是日期字符串请先用 `dateChange(val)` 进行转化下，`dateChange` 可以在 `@alitajs/dform` 中导出。**

## 介绍

借鉴了 `antd@4` 的 `Form` 组件，针对表单使用的 `react-component/field-form` 库进行二次封装。

## 特性

- 🚀 UI 的快速实现。
- 🎉 实现一次性全部赋值。
- 🍁 表单提交取值。
- 💄 融合多类型组件表单。
- 🌈 支持动态表单。
- 🐠 公司内部数十个项目中得到锤炼，不断优化完善。

## 组件

`dform` 共提供 `15` 种组件。涵盖：

- 文本展示类型: `text`
- 输入类型: `input` 和 `area`
- 选择类型: `picker` 和 `select`
- 多选类型: `multiplePicker`
- 开关类型: `switch`
- 时间选择类型: `date`
- 图片选择类型: `image`
- 选择地址类型: `addressPicker`
- Radio按钮类型: `radio` 和 `coverRadio`
- Check多选类型: `check`
- 时间区间选择类型: `rangeDatePicker`
- 高阶输入类型: `extraInput`

如果这么多的组件还不能满足需求，不着急。我们还提供 `自定义类型: custom` 组件，让用户自己实现，并在文档中提供教程。或者给我们提个 [issues](https://github.com/alitajs/DynamicForm/issues)，我们会根据评估结果进行开发和维护。

## 快速上手

```bash
npm install @alitajs/dform

or 

yarn add @alitajs/dform
```

**页面中使用**

```js
import React from 'react';
import DynamicForm, { useForm } from '@alitajs/dform';
import { Button } from 'antd-mobile';

const Page = () => {
  const [form] = useForm(); // 定义 form

  const onFinish = values => console.log('Success:', values);

  const onFinishFailed = errorInfo => console.log('Failed:', errorInfo); 

  const data = [
    {
      type: 'input',
      fieldProps: 'username',
      placeholder: '请输入',
      title: '用户名',
      required: true,
    },
  ];

  const formProps = {
    form, // 表单定义
    data, // 表单全部字段
    formsValues: {}, // 表单赋值回填数据
    onFinish, // 表单提交成功事件
    onFinishFailed, // 表单提交失败事件
  };

  return (
    <>
      <DynamicForm {...formProps} />
      <Button onClick={() => { form.submit();}}>Submit</Button>
    </>
  );
};

export default Page;
```

## 提效点

### 1、`picker` 组件：

`antd-mobile` 提供的 `Select` 组件涵盖了及联的类型，所以 `value` 出参以 `[]` 的形式。

但是在表单对象走接口时，每个字段的值很大情况下都是 `stirng` 或者 `number` 的形式进行传递，在 `[]` 情况下，还要对数据结构进行处理。

`dform` 提供了四种选址组件:

- `picker`: 单选类型，出参为 `string` 或者 `number`，不再需要对数据结构进行多一层的转化。
- `select`: `antd-mobile` 上的 `Select` 组件，出参入参设值保持一致。
- `multiplePicker`: 多选，出参以 list 的形式提供。
- `addressPicker`: 选址，更是帮你大大的提效(**舒服的写业务吧，剩下的事情交给我们**)。

### 2、一行代码配置样式

不同的项目，不同的 ui设计师，针对表单的开发样式肯定不一样，比如：

- 标题的颜色和大小
- 值的颜色和大小
- placeholder 颜色
- ...

在 `.umirc.ts` 和 `config.ts` 下配置：`theme`

![theme](https://img-blog.csdnimg.cn/20200702171633257.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjI3ODk3OQ==,size_16,color_FFFFFF,t_70)

一行代码帮你解决整个项目 `dform` 样式问题。**不香吗？**

### 3、不敲一行代码帮你配置 `data` 的JSON数据

如果你连 `JSON` 格式的 `data` 也懒得写，那么 `isDev` 字段开启开发者模式，让你鼠标点一点就能编辑好一串 `JSON`，视频会告诉你用起来多舒服。

视频若打不开请直接点开[@alitajs/dform 可视化开发者模式](https://v.qq.com/x/page/u3108c1l2o8.html)链接。

<video src="https://v.qq.com/x/page/u3108c1l2o8.html" controls="controls" width="500" height="300">您的浏览器不支持播放该视频！</video>

## 可视化编辑方案

方案灵感来源于 [ava](https://github.com/antvis/ava) 的 `autoChart`，用法和触发条件一致，都是 data 为空且在开发状态的时候，显示编辑表单按钮。用户可以强制设定 `isDev` 来在任意环境中使用。

![2020-01-20 17 16 23](https://user-images.githubusercontent.com/11746742/72713840-b37bc900-3ba8-11ea-8a94-d19cdd39be53.gif)

更多详情，请点击[dform 官网](https://dform.alitajs.com/) 欢迎交流。感谢！