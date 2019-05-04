# React TodoList

## 开发方式
- 命令式开发
  + 如 `jquery`，大部分代码都是在直接操作DOM
- 声明式开发
  + 如 `react`，面向数据编程，数据结构构建好之后，`react`会根据数据自动构建页面，节约了大量的DOM操作

## 父子组件通信是单向数据流的体现
- 父组件通过 `props` 将数据传递给子组件，子组件向父组件传值通过调用父组件传过来的方法（此时父组件的方法调用还是在父组件内发生），这样组件内的方法都是在组件内调用的，数据的改变都是在当前组件内，而不会被其他组件修改

## state, props, render 之间的关系
当组件的 `state` 或者 `props` 发生改变的时候，`render` 函数就会重新执行,当父组件的 `render` 函数重新执行时，子组件的 `render` 也会重新执行，可以从两个方面理解：
- 一是因为当父组件 `render` 函数重新执行，子组件也会被重新渲染，子组件的 `render` 函数就会重新执行
- 二是因为当父组件的 `state.inputValue` 发生变化，子组件的 `props.content` 也会变化，从而触发 `render` 函数

## 虚拟DOM
### 不使用虚拟DOM
1. state 数据
2. JSX 模板
3. 数据 + 模板 结合，生成真实的DOM，来显示
4. state 发生改变
5. 数据 + 模板 结合，生成真实的DOM，并不直接替换原始的DOM
6. 新的DOM（DocumentFragment）和原始的DOM做对比，找差异
7. 发现input框发生改变
8. 只用新的DOM中的 input 元素，替换老的DOM中的 input 元素

**缺陷**
性能的提升并不明显

### 使用虚拟DOM
1. state 数据
2. JSX 模板
3. 数据 + 模板 生成虚拟DOM（虚拟DOM就是一个js对象，用它来描述真实DOM，损耗了性能，但是此处js生成对象比用js操作dom的性能损耗要小）
```javascript
['div', {id: 'abc'}, ['span', {}, 'hello world']]
```
4. 用虚拟DOM的结构生成真实DOM
 ```html
<div id='abc'>
  <span>hello world</span>
</div>
```

5. state 发生变化
6. 生成新的虚拟DOM（与生成真实DOM相比极大的提升了性能）
```javascript
['div', {id: 'abc'}, ['span', {}, 'bye bye']]
```
7. 比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是 span 中的内容（js对象的比较，与原来相比也极大的提升了性能）
8. 直接操作DOM，改变 span 中的内容

**优点**
1. 性能提升
2. 它使得跨端应用得以实现 -> React Native (主要得益于虚拟DOM)

### JSX
JSX -> React.createElement -> 虚拟DOM（js对象）-> 真实DOM

### Diff算法
Diff 即 difference
当同时调用多次 `setState` 的时候，由于调用间隔的时间小，`react` 会将多次调用合并成一次，所以将 `setState` 内写成异步函数，提升性能

- 同级比对
- 设置唯一key值

## 生命周期函数
**指在某一个时刻会自动执行的函数**

### Initialization
setup props and state 
`react` 初始化在 `constructor` 中进行

### Mounting
componentWillMount -> render -> componentDidMount

- componentWillMount
    + 在组件即将被挂载到页面的时刻自动执行

- render
    + 将组件挂载到页面

- componentDidMount
    + 组件挂载到页面之后执行

### Updation
props 或者 state 更新

#### props
componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

#### state
 shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

- componentWillReceiveProps
    + 当一个组件从父组件接受了参数，只要父组件的render函数执行了，子组件的这个生命周期函数就会被执行；如果这个组件第一次存在于父组件中，不会被执行；如果这个组件之前已经存在于父组件中，才会被执行
- shouldComponentUpdate
    + 组件被更新之前自动执行
- componentWillUpdate
    + 组件被更新之前，它会自动执行，但在 shouldComponentUpdate 之后执行，并且只有当 shouldComponentUpdate 为 true 时执行，值为 false 时不执行
- componentDidUpdate
    + 组件更新完成之后执行

### Unmounting
componentWillUnmount
当组件被移除的时候会执行

## react提升性能的点
1. 将改变作用域(`bind(this)`)的方法放在 `constructor` 中进行
2. `setState` 内置提升性能机制，是异步函数，可以把多次数据的改变合并成一次，将低虚拟DOM的比对频率
3. 虚拟DOM，同层比对，key值的存在用于加快虚拟DOM的比对速度，提升性能
4. `shouldComponentUpate` 只有在必要的条件下重新渲染组件，提升性能

## 获取数据
1. `react` `ajax`请求获取数据通常放在`componentDidUpate`中进行，不宜放在`render`函数中，因为每次数据变化都会引起`render`函数的执行，会引起`render`函数的无限循环
2. `componentWillMount` 和 `componentDidMount` 都只会在初次渲染时执行一次，但是`componentWillMount`在`react-native`和服务端渲染时会产生冲突，所以可以约定 `ajax` 获取数据放在 `componentDidMount` 中进行
3. 放在 `constructor` 中进行也行

## redux
1. store是唯一的
2. 只有store能改变store里的内容
3. reducer是纯函数，（纯函数是指给固定的输入，就一定会有固定的输出，不会有副作用）

