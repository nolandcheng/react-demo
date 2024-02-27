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

### 5.4 CSS Module

为解决项目中同名样式冲突的问题（即作用域隔离），React 提供了 CSS Module 的解决方案。

一个简单的例子：

1. 创建 [App.module.css](./src/App.module.css)
2. 在组件中引入并以对象属性的方式设置为`ClassName` [App.js](./src/App.js)

> _在 Vue 中为 style 提供有 scoped 属性，设置后可以直接在组件中拥有样式的作用域_

### 5.5 `React.memo()`

当父组件触发重新渲染的时候，子组件也总是会触发重新渲染，但有时候我们并不希望一个简单的或并不依赖父组件的子组件总是进行重新渲染，这时我们可以使用`React.memo()`这个函数。

`React.memo()`是一个高阶组件，接收一个组件为参数并返回一个包装后的组件，包装后的组件具有缓存功能，只有当该组件的`props`发生变化时才会重新渲染。

```js
const A = () => {
  return <div>一个很简单的组件</div>
}

export default React.memo(A)
```

> _Vue 中可以为 template 设置 function 来达成相同的效果_

## 6. 钩子函数

钩子函数只能在函数式组件或自定义钩子中使用

### 6.1 `useState()`

在 React 中，组件渲染完后再修改普通的变量，不会重新渲染，我们可以通过将数据存储在`state`变量中来解决这个问题。

`state`只属于当前组件，其他组件无法访问，并且是会被 React 监测，修改数据后会自动重新渲染组件。

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

#### `setState()`的执行流程

`setState()`调用的 ReactDom 的底层方法`dispatchSetDate()`，该方法会先判断组件处于的阶段。

- 在渲染阶段并不会检查`state`的值是否相同。
- 其他阶段才会检查，不同则会重新渲染，有时相同也会重新渲染（第一次用相同值调用时）。

### 6.2 `useReducer()`

`useReducer()`的作用是用来整合`state`和`useState()`的，以减少其复杂性，当我们需要创建一个方法较多的`state`时，这很有用。

```js
// 调用countDispath()方法会执行useReducer()传入的第一个回调函数
// useReducer()的第二个参数定义的是count的初始值
const [count, countDispatch] = useReducer((state, acticon) => {
  // state即为count值
  // acticon为调用countDispatch传入的参数，无则为undefined
  return state + 1
  // 需要保证执行逻辑后一定要return，否则count会变为undefined
  // return state
}, 1)
```

需要注意的是，为了避免`useReducer()`每次渲染都会被重新定义，我们应当将它**定义到组件外部**

### 6.3 `useRef()`

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

### 6.4 `useEffect()`

React 项目通常会自动启用 React 的严格模式`React.StrictMode`，在开发模式下，它会自动重复调用一些函数以触发副作用，这样可以发现我们写的代码陷入各种重新渲染的死循环。

> Too many re-renders: 在函数体调用 `setState()` 时会出现的错误

因此为了解决我们在项目中会遇到的重新渲染问题，我们可以使用`setTimeout()`这类异步任务，也可以使用`useEffect()`这个钩子函数来处理那些不能直接写在组件内的代码。

意为`在组件渲染完毕后执行`

```js
useEffect(() => {
  // ……
}, [])
```

> _Vue 提供有 `nextTick()`方法来达到同样的效果_

`useEffect()`默认每次渲染都会执行，我们可以传递一个数组来作为第二个参数，这个数组可以用来指定依赖项，只有当依赖项发生变化时，`useEffect()`才会执行。

`setState()` 无需设置为依赖项，因为`useState()`每次渲染都能保证是同一个 `setState()`

#### 清理函数

可以为 Effect 的回调函数中指定一个函数为返回值，这个函数即是清理函数。

清理函数会在下次 Effect 执行前调用，所以我们可以在其中清除上次 Effect 执行的影响。

可以用它来实现**防抖**，在规定时间内触发多次同一事件，仅执行最后一次。

```js
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("执行了")
  }, 1000)
  // 1秒内每次触发都会清除上一个定时器
  return () => {
    clearTimeout(timer)
  }
}, [])
```

### 6.5 `useCallback()`

组件进行重新渲染时，组件内的函数总是会重新创建，当我们希望能控制该函数的创建，就可以使用`useCallback()`方法。

```js
// useCallback()的第一个参数为我们绑定的回调函数
// useCallback()的第二参数为依赖项，只有当依赖项变化时，回调函数才会重新传教
const clickHandler = useCallback(() => {
  // ...
}, [])
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

## 8. Context

Context 是用来解决 props 只能一层一层传递数据的方案，它类似于一个 JS 全局作用域，我们在外层组件设置 Context 来储存一些公共数据后，其所有组件都可以访问。

Context 通常都放在一个 store 文件中。

```js
// 新建一个TestContext.js文件
import React from "reaxt"

const TestContext = React.createContext({
  name: "姓名",
  age: 18,
})

export default TestContext

// 在组件中引入TestContext.js
import TestContext from "../store/TestContext.js"

// 方法A（不推荐）: 使用Context自带的Consumer属性，传入回调函数，该函数的参数即为TestContext
const A = () => {
  return (
    // Consumer消费者
    <TestContext.Consumer>
      {(ctx) => {
        return (
          <div>
            {ctx.name} - {ctx.age}
            {/* 姓名 - 18 */}
          </div>
        )
      }}
    </TestContext.Consumer>
  )
}

// 方法B：
const B = () => {
  // 使用钩子函数useContext()，传入TestContext来获取数据
  const ctx = useContext(TestContext)
  return (
    <div>
      {ctx.name} - {ctx.age}
      {/* 姓名 - 18 */}
    </div>
  )
}
```

在实际开发中，我们需要定义动态的数据，如下使用：

```js
// 在父组件中定义数据，在TestContext中仅保留数据名
const [valueData, setValueData] = useState({
  name: "姓名",
  age: 18,
})

// 使用Context自带的Provider属性来包裹组件，定义value值，后代组件均可访问该值
const C = () => {
  return (
    // Provider生产者
    <TestContext.Provider value={valueData}>
      {/* 多层Provider采用就近原则 */}
      <div>
        {ctx.name} - {ctx.age}
        {/* 姓名 - 18 */}
      </div>
    </TestContext.Provider>
  )
}
```

> _Context 这种通信方式有点类似于 Vue 中的 bus 模式，不太适用于大型复杂应用。_

## 9. hooks（自定义钩子）

hooks 意为可以调用其它钩子函数的钩子函数，但它实际上只是一个普通的函数，但定义时需要用 use 开头。

hooks 的作用很好理解，我们可以将会在许多组件用到的`state`和函数都定义到某个 hooks 中去，并在该 hooks 中进行暴露，随后在需要用的组件中引入即可。

```js
export default function useTest(res) {
  const [data, setData] = useState(res.data)
  const [loading, setLoading] = useState(res.loading)
  // ……
  return {
    data,
    loading,
  }
}

import useTest from "./useTest"
const { data, loading } = useTest({
  data: [],
  loading: false,
})
```

> _Vue2 中有 mixins（混入）来解决重复代码的问题，但在 Vue3 中被逐渐废弃了，并且 Vue3 中也引入了 hooks 的概念，简洁且优雅，这应该是短期内最好的方案了_

## 10. Redux

Redux 时一个专为 JS 应用设计的可预期的状态管理器，并不专属于 React。`useState`只能在当前组件定义和管理`state`，Context 也只能进行简单的跨组件通信，而 Redux 可以进行全局通信，功能更全面，能适应更复杂的需求。

使用 Redux 来管理`state`，外部无法直接修改`state`，只能通过 Redux 提供的方法来操作。
