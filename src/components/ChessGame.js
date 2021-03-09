import Chessboard from 'chessboardjsx'
import React, {useContext, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {setSelectSquare, resetSelectedSquare} from '../reducers/selectSquareReducer'
import {setHighlightSquares, resetHighlightSquares} from '../reducers/highlightSquareReducer'
import {updateChessStatus} from '../reducers/chessReducer'
import HistoryTable from './HistoryTable'
import ChatBox from './ChatBox'
import ChessStatusDisplay from './ChessStatusDisplay'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { SocketContext } from '../services/socket'

const ChessGame = () => {
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const roomId = useSelector(state => state.lobby.joinedRoom)
    const selectedSquare = useSelector(state => state.selectedSquare)
    const highlightedSquares = useSelector(state => state.highlightSquares)
    const currentPlayer = useSelector(state => state.chess.currentPlayer)
    const winner = useSelector(state => state.chess.winner)
    const fen = useSelector(state => state.chess.fen)
    const potentialMoves = useSelector(state => state.chess.potentialMoves)
    const history = useSelector(state => state.chess.history)
    const isGameOver = useSelector(state => state.chess.isGameOver)
    const isChecked = useSelector(state => state.chess.isChecked)
    const user = useSelector(state => state.user)
  
    const useStyles = makeStyles(() => ({
        root: {
            width: '540px'
        },
        currentPlayer : {
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
    if (isGameOver || currentPlayer !== user.userName) {
      return null
    }

    if (selectedSquare === null) {
      const squarePotentialMoves = potentialMoves.filter(move => move.from === square)
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
    socket.emit('chess_state', {roomId})

    socket.on('chess_state', (chessStatus) => {
      dispatch(updateChessStatus(chessStatus))
    })
  }

  useEffect(setupGame, [socket, dispatch, roomId])

  const classes = useStyles()
  return (
      <Grid container justify="center" spacing={4}>
      <Grid item>
        <div className={classes.root}>
          <ChessStatusDisplay 
            isChecked={isChecked}
            isGameOver={isGameOver}
            winner={winner}
            currentPlayer={currentPlayer}
          />
          <Typography variant="h4" className={classes.currentPlayer}>
            Turn: {currentPlayer}
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