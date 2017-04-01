import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

class Todo extends React.Component {
    render() {
        const style = {
            textDecoration: this.props.completed ? "line-through" : "none"
        }
        return (
            <li style={style} onClick={this.props.toggleTodo.bind(this, this.props.id)}>{this.props.text}</li>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    state: state.todos.filter((item) => (item.id === ownProps.id))
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(actions, dispatch)//此处不需要手动触发dispatch
}

const TodoC = connect(
   mapStateToProps,
   mapDispatchToProps
)(Todo)
export default TodoC
