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
    const user = useSelector(state => state.user)
    const chessStatus = useSelector(state => state.chess)
    
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '540px',
            textAlign: 'center'
        },
        status: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
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
    if (chessStatus.isGameOver || chessStatus.currentPlayer !== user.userName) {
      return null
    }

    if (selectedSquare === null) {
      const squarePotentialMoves = chessStatus.potentialMoves.filter(move => move.from === square)
      if (squarePotentialMoves.length > 0) {
        dispatch(setSelectSquare(square))
        highlightPotentialMoves(squarePotentialMoves)
      }
      return null
    }

    const validMove = chessStatus.potentialMoves.find(move => move.from === selectedSquare && move.to === square)
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
      <Grid container className={classes.root} justify="center" spacing={4}>
      <Grid item>
        <div className={classes.status}>
          <ChessStatusDisplay 
            isChecked={chessStatus.isChecked}
            isGameOver={chessStatus.isGameOver}
            winner={chessStatus.winner}
            currentPlayer={chessStatus.currentPlayer}
          />
          <Typography variant="h4">
            Turn: {chessStatus.currentPlayer}
          </Typography>
          <Chessboard 
            width={540}
            position={chessStatus.fen}
            draggable={false}
            onSquareClick={onSquareClick}
            squareStyles={highlightedSquares}/>
        </div>
      </Grid>
        <Grid item xl={6}>
            <HistoryTable history={chessStatus.history}/>
            <ChatBox/>
        </Grid>
      </Grid>
  )
}

export default ChessGame