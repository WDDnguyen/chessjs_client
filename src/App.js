
import React, {useContext, useEffect} from 'react'
import NavBar from './components/NavBar'
import ChessGame from './components/ChessGame'
import Lobby from './components/Lobby'
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
      <NavBar/>
      <Switch>
        <Route path="/game">
          <ChessGame/>
        </Route>
        <Route path="/">
          <Lobby/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
