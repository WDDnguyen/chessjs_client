
import React, {useContext, useEffect} from 'react'
import NavBar from './components/NavBar'
import ChessGame from './components/ChessGame'
import Lobby from './components/Lobby'
import HomePage from './components/HomePage'
import SigninForm from './components/SigninForm'
import SignupForm from './components/SignupForm'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { SocketContext } from './services/socket'

const App = () => {
  const socket = useContext(SocketContext)
  const setupSocket = () => {
    return () => {
      socket.disconnect()
    }
  }
  useEffect(setupSocket, [socket])
  
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <NavBar/>
          <ChessGame/>
        </Route>
        <Route path="/lobby">
          <NavBar/>
          <Lobby/>
        </Route>
        <Route path="/signin">
          <SigninForm/>
        </Route>
        <Route path='/signup'>
          <SignupForm/>
        </Route>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
