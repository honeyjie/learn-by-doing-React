import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

class AddTodo extends React.Component{
    onSubmit(e) {
        const { addTodo } = this.props;
        e.preventDefault()
        if (!this.input.value.trim()) {
          return
        }
        addTodo(this.input.value)
        this.input.value = ''
    }
    render() {
      return (
          <div>
            <form onSubmit={this.onSubmit.bind(this)}>
              <input ref={(node)=>{this.input = node}}/>
              <button>
                Add Todo
              </button>
            </form>
          </div>
      )
    }
}
// ref={
//                 (node) => {input = node}
//               } 
// onSubmit={e => {
//               e.preventDefault()
//               if (!input.value.trim()) {
//                 return
//               }
//               dispatch(addTodo(input.value))
//                 input.value = ''
//             }}
const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return ({
    state: state //仅当自身的filter属性与state中属性一致时，active
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(actions, dispatch)//此处不需要手动触发dispatch
}

const AddTodoC = connect(
   mapStateToProps,
   mapDispatchToProps
)(AddTodo)
export default AddTodoC
