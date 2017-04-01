import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { bindActionCreators } from 'redux'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

//connect([mapStateToprops],[mapDispatchToProps],[mergeProps], [options])
//mapStateToprops(state, ownProps),将store中的属性传递到props上
//mapDispatchToProps(dispatch, ownProps)将 action 作为 props 绑定到 MyComp 上。函数返回的数据
const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch, ownProps) =>{
    return bindActionCreators(actions, dispatch)
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
