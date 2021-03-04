import Chessboard from 'chessboardjsx'
import React, {useState, useEffect} from 'react'

const Chess = require("chess.js")
let chess

const App = () => {
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [highlightedSquares, setHighlightedSquares] = useState({})
  const [fen, setFen] = useState('start')

  const clearHighlightSquares = () => {
    setHighlightedSquares({})
  }

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
    setHighlightedSquares(highlightedSquares)
  }

  const onSquareClick = square => {
    if (selectedSquare === null) {
      const validMoves = chess.moves({square: square, verbose: true}) 
      if (validMoves.length > 0) {
        setSelectedSquare(square)
        highlightSquares(validMoves)
      }
      return null
    }

    console.log('To', square)
    const validMove = chess.move({from: selectedSquare, to: square})
    if (validMove) {
      setFen(chess.fen())
    }
    clearHighlightSquares()
    setSelectedSquare(null)
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
