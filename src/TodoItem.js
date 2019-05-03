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
      content
    } = this.props
    return (
      <li onClick={this.handleClick}>
        { content }
      </li>
    )
  }
}

TodoItem.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

export default TodoItem