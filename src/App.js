import Chessboard from 'chessboardjsx'
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setSelectSquare, resetSelectedSquare} from './reducers/selectSquareReducer'
import {setHighlightSquares} from './reducers/highlightSquareReducer'
import {updateFen} from './reducers/chessReducer'
import HistoryTable from './components/HistoryTable'
import ChatBox from './components/ChatBox'
import Grid from '@material-ui/core/Grid';
const Chess = require("chess.js")
let chess

const App = () => {
  const dispatch = useDispatch()
  const selectedSquare = useSelector(state => state.selectedSquare)
  const highlightedSquares = useSelector(state => state.highlightSquares)
  const fen = useSelector(state => state.fen)

  const highlightPotentialMoves = (validMoves) => {
    const highlightedSquares = [...validMoves].reduce((acc, cur) => {
      if (cur.flags === 'c') {
        return {
          ...acc,
          ...{
            [cur.from]: {
              backgroundColor: "#006600"
            },
            [cur.to]: {
              backgroundColor: "#004C99"
            }
          }
        }
     } else {
        return {
          ...acc,
          ...{
            [cur.from]: {
              backgroundColor: "#006600"
            },
            [cur.to]: {
              background: "radial-gradient(circle, #009900 30%, transparent 30%)",
              backgroundRadius: "30%"
            }
          }
        }
      }
    }, {})

    dispatch(setHighlightSquares(highlightedSquares))
  }

  const highlightMove = (move) => {
    const highlightedSquares = {
      [move.from]: {
        backgroundColor: "#006600"
      },
      [move.to]: {
        backgroundColor: "#009900"
      }
    }
    dispatch(setHighlightSquares(highlightedSquares))
  }

  const onSquareClick = square => {
    if (selectedSquare === null) {
      const validMoves = chess.moves({square: square, verbose: true}) 
      if (validMoves.length > 0) {
        dispatch(setSelectSquare(square))
        highlightPotentialMoves(validMoves)
      }
      return null
    }

    const validMove = chess.move({from: selectedSquare, to: square})
    if (validMove) {
      dispatch(updateFen(chess.fen()))
      highlightMove(validMove)
    }
    dispatch(resetSelectedSquare())
  }

  const createChessGame = () => {
    chess = new Chess()
  }

  useEffect(createChessGame, [])
  const turn = fen === 'start' ? 'w' : fen.split(' ')[1]
  const history = chess === undefined ? undefined : chess.history()
  
  return (
    <Grid container justify="center" spacing={4}>
      <Grid item>
        <Chessboard 
          width={540}
          position={fen}
          draggable={false}
          onSquareClick={onSquareClick}
          squareStyles={highlightedSquares}/>
      </Grid>
        <Grid xl={6}>
          <div>
            <p>Turn: {turn}</p>
            <HistoryTable history={history}/>
          </div>
          <div>
            <ChatBox/>
          </div>
          </Grid>
    </Grid>
  )
}

export default App;
