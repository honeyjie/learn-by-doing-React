let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}//text，input.value

export const setVisibilityFilter = (filter) => {
  return{
    type: 'SET_VISIBILITY_FILTER',
    filter
  }//将会变成一个对象
}

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
