import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const {
      deleteItem,
      index
    } = this.props
    deleteItem(index)
  }

  render() {
    const {
      content,
      test
    } = this.props
    return (
      /*<li key={index} 
          onClick={this.handleItemDelete.bind(this, index)}
        >
          {item}
        </li>*/
      // 双花括号，外层用于解析js表达式，内层花括号表示对象
      // dangerouslySetInnerHTML防止输入的html标签被转义成字符串
      // <li key={index} 
      //   onClick={this.handleItemDelete.bind(this, index)}
      //   dangerouslySetInnerHTML={{__html: item}}
      // ></li>
      <li onClick={this.handleClick}>
        {test} - { content }
      </li>
    )
  }
}

TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

TodoItem.defaultProps = {
  test: 'hello react'
}

export default TodoItem