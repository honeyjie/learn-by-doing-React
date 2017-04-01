import React from 'react'
import Todo from './Todo'

class TodoList extends React.Component{
    render() {
        console.log(this.props);
        let listItem = this.props.todos.map(function(item) {
            return <Todo key={item.id} id={item.id} completed={item.completed} text={item.text} />
        })
        return (
          <div>
            {listItem}
            <h1>Hello World!</h1>
          </div>
        )
    }
}
TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    completed: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default TodoList
