# 项目说明

## 1、 `npm run serve`

此项目分为三个部分， page-admin、page-web、components。page-admin为后台管理包含编辑器等部分，page-web为展示项目，components是组件库。

三个项目是独立的。page-admin通过 `http://localhost:9527/page-admin`访问，page-web通过 `http://localhost:9527/page-web/${AppId}/#/page/${PageId}`访问，

```shell
npm run serve
```



## 2、`npm run build:file`

执行命令生成 `src/components/index.ts`文件。每个分类下的 `config.json`可设置指定组件不导出或者整个分类不导出。

```json
{
    "name": "辅助组件",
    "private": [
    ],
    "isPrivate": true
}
```



## 2、`npm run build:img`

执行命令生成每个组件的图片到 `public/images`。

```shell
// 生成所有组件的图片
npm run build:img

// 生成指定组件的图片
npm run build:img RpBrandFamily
```





#### 相关笔记

```
 * declare：当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
 * declare var 声明全局变量
 * declare function 声明全局方法
 * declare class 声明全局类
 * declare enum 声明全局枚举类型
 * declare global 扩展全局变量
 * declare module 扩展模块
 * namespace 内部模块|命名空间

vue-property-decorator提供的装饰器

@Prop
@PropSync
@Provide
@Model
@Watch
@Inject
@Provide
@Emit
@Component
Mixins






vuex-class提供的装饰器
@State
@Getter
@Action
@Mutation
```

