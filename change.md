# 版本升级内容

## 3.4.11

hidden > required、rules 并且通过 defaultValue 和 formValues 设置的值不会消失。会在 submit 的时候带出来。

## 3.4.10

删除 input 组件内多余的 console。

## 3.4.9

修复 input 组件赋值 0 失效的问题。

## 3.4.8

修复 ExtraInput 第二个属性的值获取到是 `undefined`

## 3.4.0

- 1、分组增加卡片收缩功能。-------书航
- 2、image 和 file 组件增加 maxLength 字段。用于设置上传文件最大数量的限制。----书航
- 3、优化 addressPicker 组件的逻辑和性能，删除 level 字段(剩余内容不变)。提高用户使用体验。----DIYC
- 4、组件增加 renderHeader 和 renderFooter 用于渲染表单字段头部和尾部。----书航
- 5、修复 checkbox 组件单独使用时，defaultValue 不生效。------传龙

## 3.2.2

- 1、组件允许单独使用，可以不在 `<DynamicForm />` 的包裹下才能使用---------传龙
- 2、合并 input 和 text ,后续 text 将放弃维护。--------书航
- 3、合并 datePicker 和 rangeDatePicker, 后续 rangeDatePicker 将放弃维护。------DIYC
- 4、date 的赋值允许传递 string 的类型，不一定要传 Date 类型。-------书航

## 3.1.11

- 1、rules 规则兼容 required ,不需要重写 required
- 2、修复 DformFile 上传文件组件 上传图片消失导致无法上传的问题
- 3、picker 和 multiplePicker 增加 clear 图标，可以清空已选中的数据

## 3.1.0

- 1、表单提交报错时增加红色字体的错误提示。
- 2、表单增加及联操作。
- 3、增加可配置分组。
- 4、优化了整个表单的样式。
