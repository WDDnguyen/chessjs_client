import Chessboard from 'chessboardjsx'
import React, {useContext, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {setSelectSquare, resetSelectedSquare} from '../reducers/selectSquareReducer'
import {setHighlightSquares, resetHighlightSquares} from '../reducers/highlightSquareReducer'
import {updateFen, updateTurn, updateHistory, setPotentialMoves} from '../reducers/chessReducer'
import HistoryTable from './HistoryTable'
import ChatBox from './ChatBox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { SocketContext } from '../services/socket'

const ChessGame = () => {
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const roomId = useSelector(state => state.lobby.joinedRoom)
    const selectedSquare = useSelector(state => state.selectedSquare)
    const highlightedSquares = useSelector(state => state.highlightSquares)
    const fen = useSelector(state => state.chess.fen)
    const turn = useSelector(state => state.chess.turn)
    const potentialMoves = useSelector(state => state.chess.potentialMoves)
    const history = useSelector(state => state.chess.history)
  
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

  const onSquareClick = (square) => {
    if (selectedSquare === null) {
      const squarePotentialMoves = potentialMoves.filter(move => move.from === square)
      console.log('EMIT POTENTIAL MOVES', squarePotentialMoves)
      if (squarePotentialMoves.length > 0) {
        dispatch(setSelectSquare(square))
        highlightPotentialMoves(squarePotentialMoves)
      }
      return null
    }

    const validMove = potentialMoves.find(move => move.from === selectedSquare && move.to === square)
    if (validMove) {
      highlightMove(validMove)
      socket.emit('move', {roomId, from: selectedSquare, to: square})
    } else {
      dispatch(resetHighlightSquares())
    }
    dispatch(resetSelectedSquare())
  }

  const setupGame = () => {
    console.log('SETUP GAME ROOM ID', roomId)
    socket.emit('chess_state', {roomId})
  
    socket.on('chess_state', ({fen, turn, history, potentialMoves}) => {
      console.log('CHESS STATE', fen, turn, history, potentialMoves)
      dispatch(updateFen(fen))
      dispatch(updateTurn(turn))
      dispatch(updateHistory(history))
      dispatch(setPotentialMoves(potentialMoves))
    })
  }

  useEffect(setupGame, [socket, dispatch, roomId])

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