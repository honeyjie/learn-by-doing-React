import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux' 
/*All container components need access to the Redux store so they can subscribe to it
使Redux存储区可用于下面组件层次结构中的connect（）调用*/
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
