import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import selectSquareReducer from './reducers/selectSquareReducer'
import highlightSquareReducer from './reducers/highlightSquareReducer'
import chessReducer from './reducers/chessReducer'
import chatReducer from './reducers/chatReducer'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import App from './App'

const combinedReducer = combineReducers({
  selectedSquare: selectSquareReducer,
  highlightSquares: highlightSquareReducer,
  fen: chessReducer,
  chat: chatReducer
})

const store = createStore(combinedReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);