# React Demo

这是一个 React 全家桶的 demo 项目， React 是老牌的 js 框架，许多特点在 Vue3 中也能看到它的影子，我希望我能更加熟悉它。

版本：React18
与 Vue 的比较：文中的引用结合倾斜文本记录

## 1. 介绍

- UI 组件：页面或者说项目由一个个组件拼接而成，组件可进行复用。
- 虚拟 DOM：优化原生 DOM 来实现页面变化，性能开销更小。
- 单向数据流：数据的传输自顶而下，对它进行修改也只会有单方面影响。
- JSX：JavaScript 的一个类似 XML 的扩展，可以在 js 中书写 html 代码。
- Hooks：16.8 新增的特性，优化渲染、更好的拆分和复用组件。
- Facebook 专门团队维护。

## 2. 安装/启动

这里我们采用 yarn 作为包管理工具

空项目从零安装，**通常不用，仅作熟悉**。

```sql
1.yarn init -y
2.yarn add react react-dom react-scripts
3.npx react-scripts start -- 运行
```

使用 `create react-app` 创建 React 项目，它会自动在全局安装 React 官方的基于 `webpack` 配置的脚手架 `create-react-app`。

React 当前版本 **18.2**

```sql
1.yarn create react-app my-react
2.yarn install
3.yarn start
```

## 3. Hello World

简单的使用 React 元素（虚拟 DOM）的例子，命令式编程。

```js
/**
 *  创建一个React元素
 *  参数：1.元素名称（小写）、2.标签属性（驼峰）、3.多个元素内容（子元素）
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

> render 会使页面发生重新渲染，首次调用 render 时会替换所有 DOM 元素，后续调用 React 内部（DOM 差分算法）会进行比较，随后只更新变化的 DOM。_Vue 中的 cpmputed 采用了同样的差分算法_

> `ReactDOM.render(button, document.getElememtById("root"))`
> 老版本（React17 及以下）的使用方式

## 4. JSX

JSX 是一种 JS 的语法扩展，它可以让我们在 JS 中书写一种类似 HTML 的标签，它是`React.createElement()`的语法糖，由于其简洁性，在 React 组件开发中广泛存在。

JSX 语法需要遵循 3 个规则：

1. 有且仅返回一个根元素
2. 标签闭合，正确结束
3. 属性采用驼峰命名

在文本和属性中：

- 使用大括号`{}`来表示 JS 表达式（有值），`null`、`undefined` 和**布尔值**不会显示。
- 使用双大括号`{{}}`来表示 CSS，`class` 用 `className` 代替，`style` 中使用对象设置。
- 绑定事件需传入函数名或直接写回调函数。

下面是一个关于 for 循环列表渲染的例子

```jsx
const data = [1, 2, 3]

const list = (
  // 有些场景需要使用Fragment来包裹所有元素，但它并不会实际创建一个DOM元素
  // 也可以直接使用<></>空标签
  <React.Fragment>
    <ul className="ul" style={{ backgroundColor: "red" }}>
      {data.map((item, index) => (
        <li key={index} onClick={() => alert(123)}>
          {item}
        </li>
      ))}
    </ul>
  </React.Fragment>
)
```

> _相较于 Vue 的 template，React 的 jsx 关于标签和属性要严格的多。_

**关于事件**

1. React 函数中，`return false` 无效
2. 函数会携带 React 包装后的事件对象。

在实际开发中，大量的 js 文件来导入导出十分繁琐，Vue 有提供专门的单文件组件`.vue`，React 我们也需要更简洁的方案：一个以`.jsx` 结尾的文件。

## 5. 组件

### 5.1 函数式组件

```js
// 组件首字母必须大写
const App = () => {
  return <div>一个函数式组件</div>
}

// root根元素的创建，之后不在赘述
const root = ReactDOM.createRoot(document.getElememtById("root"))

root.render(<App />)
```

### 5.2 类组件

```js
// 必须继承React.Component
class App extends React.Component {
  render() {
    return <div>一个类组件</div>
  }
}
```

无论是那种组件，都要返回一个 `jsx`，通常而言，使用函数式组件更多。

### 5.3 `props`

`props` 控制父子组件间的通信，它只读无法修改，子组件想要修改父组件数据也要通过`props`来调用父组件传递过来的回掉函数。

`props.children`：标签体
`props.className`: 父组件 class

```js
// 父组件
const changeTestHandler = (str) => {
  console.log(str) // 456
}
const parent = () => {
  return <children test="123" onChangeTest={changeTestHandler} />
}

// 子组件
const children = (props) => {
  console.log(props) // {test: 123}
  props.onChangeTest(456) // 调用父组件方法并传递参数
  return <div>子组件 {props.test}</div>
}

// 类组件则直接通过实例访问
console.log(this.props.test)
```

> _与 Vue 中的 `props` 父传子基本一致，子传父则不太一样_，

## 6 钩子函数

钩子函数只能在函数式组件或自定义钩子中使用

### 6.1 `useState()`

在 React 中，组件渲染完后再修改普通的变量，不会重新渲染，我们可以通过将数据存储在 state 变量中来解决这个问题。

state 只属于当前组件，其他组件无法访问，并且是会被 React 监测，修改数据后会自动重新渲染组件。

```js
// 引入钩子函数来创建state
import { useState } from "React"

// useState的参数可以传入一个初始值，该函数返回一个由初始值和修改方法组成的数组
const [value, setValue] = useState(1)

// value仅用来显示，不能直接修改，需调用setValue方法传入新值来修改，并会异步重新渲染组件
setValue(2)
console.log(value) // 2
```

`setState()`并不会修改旧值，而是重新传入新值。

如果传入的新值用到了旧值，因为是异步渲染的，我们应该使用回掉函数来避免任务队列被抵消的问题。

```js
// 将
setValue(value + 1)
// 替换为
setValue((preValue) => preValue + 1)
```

在类组件中，`state` 和 `setState()` 统一存储到了实例中

```js
state = {
  count: 0,
}
this.setState((preValue) => {
  return {
    count: preValue + 1,
  }
})
```

### 6.2 `useRef()`

```js
// 引入钩子函数
import { useRef } from "React"

// 创建一个存储DOM对象的容器，会匹配标有ref属性h1Ref值的元素
const h1Ref = useRef()

// 二者相同
console.log(h1Ref.current)
console.log(document.getElementById("header"))

const App = () => {
  return <h1 id="header" ref={h1Ref}></h1>
}
```

`useRef()`创建的对象，可以确保每次渲染获取到的都是同一个对象

在类组件中使用`creatRef()`

```js
divRef = React.creatRef()
console.log(this.divRef.current)
```

## 7. portal

解决组件会默认作为父组件的后代渲染到页面上的一种方案，`portal`可以指定组件渲染的位置

```js
import ReactDom from "react-dom"

// 在需要被渲染的元素处添加标识，如id="box"
const App = () => {
  return <div id="box"></div>
}

// 在组件中获取box元素
const box = document.getElementById("box")

// 使用portal将当前组件传递到box元素中
const myComp = (props) => {
  return ReactDom.createPortal(<div className="comp">{props.children}</div>, box)
}

export default myComp
```

## 8. CSS Module

为解决项目中同名样式冲突的问题（即作用域隔离），React 提供了 CSS Module 的解决方案。

一个简单的例子：

1. 创建 [App.module.css](./src/App.module.css)
2. 在组件中引入并以对象属性的方式设置为`ClassName` [App.js](./src/App.js)

> _在 Vue 中为 style 提供有 scoped 属性，设置后可以直接在组件中拥有样式的作用域_
