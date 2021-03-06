
import React from 'react'
import NavBar from './components/NavBar'
import ChessGame from './components/ChessGame'
import Lobby from './components/Lobby'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

const App = () => {
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
