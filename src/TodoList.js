import React, {
  Component,
  Fragment
} from 'react'
import TodoItem from './TodoItem'
import Test from './Test'

import './style.css'

class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleItemDelete = this.handleItemDelete.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
  }

  handleInputChange(e) {
    // this.setState({
    //   inputValue: e.target.value
    // })
    // const value = e.target.value
    const value = this.input.value
    this.setState(() => ({
      inputValue: value
    }))
  }

  handleBtnClick() {
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
    // this.setState((state) => ({
    //   list: [...state.list, state.inputValue],
    //   inputValue: ''
    // }))
    // setState 是异步函数，所以下面console.log内容在 setState之前立即执行，因此打印出的length总比实际的少一个
    // console.log(this.ul.querySelectorAll('li').length)

    // 第二个函数是setState完成之后的回调，如此打印出的长度就正确了
    this.setState((state) => ({
      list: [...state.list, state.inputValue],
      inputValue: ''
    }), () => {
      console.log(this.ul.querySelectorAll('li').length)
    })

  }

  handleItemDelete(index) {
    // immutable
    // state 不允许我们做任何改变，因此将list拷贝出一个副本，操作副本
    // 而不是直接操作 this.state 中的内容    
    // const list = [...this.state.list]

    // list.splice(index, 1)

    this.setState((state) => {
      const list = [...state.list]
      list.splice(index, 1)
      return {
        list
      }
    })

  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem 
          key={item}
          content={item} 
          index={index} 
          deleteItem={this.handleItemDelete}
        />

      )
    })
  }

  componentWillMount() {
    console.log('component will mount')
  }

  render() {
    console.log('render')
    return (
      <Fragment>
        {/*jsx 注释*/}
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input type="text"
            id="insertArea"
            className="input" 
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            ref={input => {this.input = input}}
          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul ref={ul => {this.ul = ul}}>
          { this.getTodoItem() }  
        </ul>
        <Test content={this.state.inputValue} />
      </Fragment>
    )
  }

  componentDidMount() {
    console.log('component did mount')
  }

  // 组件被更新之前，他会被自动执行
  shouldComponentUpdate() {
    console.log('should component update')
    return true
  }

  // 组件被更新之前，它会自动执行，但在 shouldComponentUpdate 之后执行
  // 并且只有当 shouldComponentUpdate 为 true 时执行，值为 false 时不执行
  componentWillUpdate() {
    console.log('component will update')
  }

  // 组件更新之后执行
  componentDidUpdate() {
    console.log('component did update')
  }

}

export default TodoList