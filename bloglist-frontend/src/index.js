/* eslint-disable indent */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import Container from '@material-ui/core/Container';
import App from './App'
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Container maxWidth={'md'}>
        <App />
      </Container>
    </Router>
  </Provider>
  , document.getElementById('root'))