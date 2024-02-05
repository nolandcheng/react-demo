# React Demo

这是一个 React 全家桶的 demo 项目， React 是老牌的 js 框架，许多特点在 Vue3 中也能看到它的影子，我希望我能更加熟悉它。

版本：React18

## 1. 介绍

- UI 组件：页面或者说项目由一个个组件拼接而成，组件可进行复用。
- 虚拟 DOM：优化原生 DOM 来实现页面变化，性能开销更小。
- 单向数据流：数据的传输自顶而下，对它进行修改也只会有单方面影响。
- JSX：JavaScript 的一个类似 XML 的扩展，可以在 js 中书写 html 代码。
- Hooks：16.8 新增的特性，优化渲染、更好的拆分和复用组件。
- Facebook 专门团队维护。

## 2.安装/启动

使用 yarn 可以在不安装全局`create-react-app`的情况下创建 React 项目，React（
**当前版本 18.2**） 项目是基于 webpack 配置的。

```sql
1.yarn create react-app my-react
2.yarn install
3.yarn start
```

### 3.Hello World

简单的使用 React 元素（虚拟 DOM）的例子

```js
/**
 *  创建一个React元素
 *  参数：1.元素名称（小写）、2.标签属性（驼峰）3、多个元素内容（子元素）
 *  React元素创建后无法修改，只能通过创建新元素替换
 */

const button = React.creatElement(
  "button",
  {
    id: "btn",
    type: "button",
    className: "btn", // 不是“class”
    onClick: () => {
      // 是一个事件
      alert("点击")
    },
  },
  "myButton"
)

// 创建一个以DOM元素为参数的根元素（React元素被插入的位置）
const root = ReactDOM.createRoot(document.getElememtById("root"))

// 将div渲染进root，render是替换而不是追加
root.render(button)
```

> 首次调用 render 时会替换所有 DOM 元素，后续调用 React 内部（DOM 差分算法）会进行比较，随后只更新变化的 DOM

> `ReactDOM.render(button, document.getElememtById("root"))`
> 老版本（React17 及以下）的使用方式

### 4.组件

JSX 是一种 JS 的语法扩展，它可以让我们在 JS 中书写一种类似 HTML 的标签，由于其简洁性，在 React 组件开发中广泛存在

JSX 语法需要遵循 3 个规则：

1. 返回一个根元素
2. 标签闭合
3. 属性采用驼峰命名

在文本和属性中，使用大括号`{}`来表示 JS 变量，使用双大括号`{{}}`来表示 CSS 和对象

但在实际开发中，太多的导入导出不免有些繁琐，Vue 有提供专门的单文件组件`.vue`，React 我们也需要更简洁的方案：一个以`.jsx` 结尾的文件
