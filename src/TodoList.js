import React, {
  Component
} from 'react'

import store from './store'
import {
  getTodoList,
  getInputChangeAction,
  getAddItemAction,
  getDeleteItemAction
} from './store/actionCreators'
import TodoListUI from './TodoListUI'

class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
    store.subscribe(this.handleStoreChange)
  }

  render() {
    return <TodoListUI 
              inputValue={this.state.inputValue}
              list={this.state.list}
              handleInputChange={this.handleInputChange}
              handleBtnClick={this.handleBtnClick}
              handleDeleteItem={this.handleDeleteItem}
          />
  }

  componentDidMount() {
    // axios.get('/list.json')
    //   .then((res) => {
    //     const data = res.data
    //     const action = initListAction(data)
    //     store.dispatch(action)
    //     console.log(res)
    //   })
    const action = getTodoList()
    store.dispatch(action)
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }

  handleStoreChange() {
    this.setState(store.getState())
  }

  handleBtnClick() {
    const action = getAddItemAction()
    store.dispatch(action)
  }

  handleDeleteItem(index) {
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }

}

export default TodoList