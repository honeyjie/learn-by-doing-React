import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,//将分散的函数聚合一起
  visibilityFilter
})//整合纯函数


export default todoApp
