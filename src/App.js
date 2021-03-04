import Chessboard from 'chessboardjsx'
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setSelectSquare, resetSelectedSquare} from './reducers/selectSquareReducer'
import {setHighlightSquares, resetHighlightSquares} from './reducers/highlightSquareReducer'
import {updateFen} from './reducers/chessReducer'

const Chess = require("chess.js")
let chess

const App = () => {
  const dispatch = useDispatch()
  const selectedSquare = useSelector(state => state.selectedSquare)
  const highlightedSquares = useSelector(state => state.highlightSquares)
  const fen = useSelector(state => state.fen)

  const highlightSquares = validMoves => {
    const squaresToHighlight = validMoves.map(move => move.to)
    const highlightedSquares = [...squaresToHighlight].reduce((acc, cur) => {
      return {
        ...acc,
        ...{
            [cur]: {
              backgroundColor: 'orange',
              border: '2px black'
          }
        }
      }
    }, {})
    dispatch(setHighlightSquares(highlightedSquares))
  }

  const onSquareClick = square => {
    if (selectedSquare === null) {
      const validMoves = chess.moves({square: square, verbose: true}) 
      if (validMoves.length > 0) {
        dispatch(setSelectSquare(square))
        highlightSquares(validMoves)
      }
      return null
    }

    console.log('To', square)
    const validMove = chess.move({from: selectedSquare, to: square})
    if (validMove) {
      dispatch(updateFen(chess.fen()))
    }
    dispatch(resetHighlightSquares())
    dispatch(resetSelectedSquare())
  }

  const createChessGame = () => {
    chess = new Chess()
  }

  useEffect(createChessGame, [])
  
  return (
    <div>
      <Chessboard 
        position={fen}
        draggable={false}
        onSquareClick={onSquareClick}
        squareStyles={highlightedSquares}/>
      <h1>Chess JS</h1>
    </div>
  )
}

export default App;
