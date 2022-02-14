---
title: 实现兼容 pc 开发
group:
  title: 实现兼容 pc 开发
nav:
  title: 配置项
  path: /setting
  order: 2
---

# 实现兼容 pc 开发

**请参考 `input` 组件**

## 一、如何开启 pc 效果

### 1、表单使用

在 `<DynamicForm` 表单组件包裹的情况下，只需要传入 `isPc={true}` 的属性，默认将整个表单修改成 `pc` 效果。

`isPc` 默认为 `false`。

```js
import DynamicForm, { DformInput, useForm } from '@alitajs/dform';
const Page: FC<BasicProps> = () => {
  const formProps = {
    onFinish,
    onFinishFailed,
    formsValues,
    form,
    isPc: true,
  };
  return (
    <DynamicForm {...formProps}>
      <DformInput fieldProps="username" title="用户名" />
    </DynamicForm>
  );
};

export default Page;
```

### 2、单独使用

没有 `<DynamicForm` 包裹的情况下，可以在组件内传入 `isPc` 的属性进行是否为 `pc` 效果的渲染。

```js
<DformInput fieldProps="username" title="用户名" isPc />
```

## 二、开发者如何实现组件兼容 pc 开发(重点，请关注)

每个组件已经通过底层传入 `isPc` 的字段，所以开发者在实现兼容 `pc` 需求时，不需要考虑 `isPc` 字段。

直接从组件内的 `props` 下取值即可。

通过 `src/baseComponents/Context` 下的 `DformContext` 对 `isPc` 字段进行透传。

在需要获取 `isPc` 的组件内通过 `<DformContext.Consumer>` 进行取值。

移动端且 `positionType='horizontal'` 的情况下，`title` 的开发，请替换成使用 `/src/baseComponents` 下的 `HorizontalTitle`。

在开发 pc 组件时，请使用 `/src/baseComponents` 下的 `PcLayout` 进行包裹，会帮你省下很多开发成本。

## 三、测试用例

在开发每个组件兼容 `pc` 需求时，只需要考虑当前组件下的测试用例，保证当前组件的测试用例全部通过即可。

测试用例要覆盖 `a11y`、`basic 基本使用`、`pc 兼容pc`、`single 单独使用` 4 种测试用例。具体内容请参考 `Input` 组件。
