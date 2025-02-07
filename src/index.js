import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import selectSquareReducer from './reducers/selectSquareReducer'
import highlightSquareReducer from './reducers/highlightSquareReducer'
import chessReducer from './reducers/chessReducer'
import chatReducer from './reducers/chatReducer'
import lobbyReducer from './reducers/lobbyReducer'
import userReducer from './reducers/userReducer'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {SocketContext, socket} from './services/socket'
import App from './App'

const combinedReducer = combineReducers({
  selectedSquare: selectSquareReducer,
  highlightSquares: highlightSquareReducer,
  chess: chessReducer,
  chat: chatReducer,
  lobby: lobbyReducer,
  user: userReducer
})

const store = createStore(combinedReducer)

ReactDOM.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </Provider>,
  document.getElementById('root')
);