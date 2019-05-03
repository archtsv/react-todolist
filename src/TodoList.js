import React, {
  Component,
  Fragment
} from 'react'
import axios from 'axios'
import TodoItem from './TodoItem'
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
    const value = e.target.value
    this.setState(() => ({
      inputValue: value
    }))
  }

  handleBtnClick() {
    this.setState((state) => ({
      list: [...state.list, state.inputValue],
      inputValue: ''
    }))
  }

  handleItemDelete(index) {
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
    return (
      <Fragment>        
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input type="text"
            id="insertArea"
            className="input" 
            value={this.state.inputValue}
            onChange={this.handleInputChange}          />
          <button onClick={this.handleBtnClick}>提交</button>
        </div>
        <ul>
          { this.getTodoItem() }  
        </ul>
      </Fragment>
    )
  }

  componentDidMount() {
    axios.get('/api/todolist')
      .then((res) => {
        console.log(res.data)
        this.setState(() => {
          return {
            list: [...res.data]
          }
        })
      })
      .catch((err) => {
        console.log('error ', err)
      })
  }
}

export default TodoList