import Chessboard from 'chessboardjsx'
import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import {setSelectSquare, resetSelectedSquare} from '../reducers/selectSquareReducer'
import {setHighlightSquares, resetHighlightSquares} from '../reducers/highlightSquareReducer'
import {updateFen} from '../reducers/chessReducer'
import HistoryTable from './HistoryTable'
import ChatBox from './ChatBox'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const Chess = require("chess.js")
let chess

const ChessGame = () => {
    const dispatch = useDispatch()
    const selectedSquare = useSelector(state => state.selectedSquare)
    const highlightedSquares = useSelector(state => state.highlightSquares)
    const fen = useSelector(state => state.fen)

    const useStyles = makeStyles(() => ({
        root: {
            width: '540px'
        },
        turn : {
        textAlign: 'center'
        }
    }))
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
    } else {
      dispatch(resetHighlightSquares())
    }
    dispatch(resetSelectedSquare())
  }

  const createChessGame = () => {
    chess = new Chess()
  }

  useEffect(createChessGame, [])
  const turn = fen === 'start' ? 'w' : fen.split(' ')[1]
  const history = chess === undefined ? undefined : chess.history()
  const classes = useStyles()

    return (
        <Grid container justify="center" spacing={4}>
        <Grid item>
          <div className={classes.root}>
            <Typography variant="h4" className={classes.turn}>
              Turn: {turn}
            </Typography>
            <Chessboard 
              width={540}
              position={fen}
              draggable={false}
              onSquareClick={onSquareClick}
              squareStyles={highlightedSquares}/>
          </div>
        </Grid>
          <Grid item xl={6}>
            <div className={classes.root}>
              <HistoryTable history={history}/>
              <ChatBox/>
            </div>
          </Grid>
        </Grid>
    )
}

export default ChessGame