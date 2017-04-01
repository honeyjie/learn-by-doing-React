import React from 'react'
import Footer from './Footer'
import AddTodoC from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodoC />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
