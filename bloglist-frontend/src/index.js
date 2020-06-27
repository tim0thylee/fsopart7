/* eslint-disable indent */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificatonReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer
})
const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  , document.getElementById('root'))