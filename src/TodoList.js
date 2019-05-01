import React, {
  Component,
  Fragment
} from 'react'

import './style.css'

class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleBtnClick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }

  handleItemDelete(index) {
    // immutable
    // state 不允许我们做任何改变，因此将list拷贝出一个副本，操作副本
    // 而不是直接操作 this.state 中的内容    
    const list = [...this.state.list]

    list.splice(index, 1)

    this.setState({
      list
    })
  }

  render() {
    return (
      <Fragment>
        {/*jsx 注释*/}
        <div>
          <label htmlFor="insertArea">输入内容</label>
          <input type="text"
            id="insertArea"
            className="input" 
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
          />
          <button onClick={this.handleBtnClick.bind(this)}>提交</button>
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                /*<li key={index} 
                  onClick={this.handleItemDelete.bind(this, index)}
                >
                  {item}
                </li>*/
                // 双花括号，外层用于解析js表达式，内层花括号表示对象
                // dangerouslySetInnerHTML防止输入的html标签被转义成字符串
                <li key={index} 
                  onClick={this.handleItemDelete.bind(this, index)}
                  dangerouslySetInnerHTML={{__html: item}}
                ></li>
              )
            })
          }     
        </ul>
      </Fragment>
    )
  }
}

export default TodoList