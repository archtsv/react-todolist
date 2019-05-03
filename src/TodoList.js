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
    this.setState((state) => ({
      list: [...state.list, state.inputValue],
      inputValue: ''
    }))
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
        <ul>
          { this.getTodoItem() }  
        </ul>
        <Test content={this.state.inputValue} />
      </Fragment>
    )
  }
}

export default TodoList