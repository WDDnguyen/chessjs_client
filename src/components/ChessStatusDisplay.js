import React from 'react'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const ChessStatusDisplay = ({isChecked, isGameOver, winner, currentPlayer}) => {
    const useStyles = makeStyles((theme) => ({
      grid: {
          width: '540px',
          textAlign: 'center'
      },
      status: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white
      }
    }))

    const classes = useStyles()

    if (!isChecked && !isGameOver) {
      return null
    } else if (isGameOver) {
      return (
        <Typography variant="h5" className={classes.status}>
          Winner: {winner}
        </Typography>
      )
    } else if (isChecked) {
      return (
        <Typography variant="h5" className={classes.status}>
          Checked: {currentPlayer} 
        </Typography>
      )
    }
}

export default ChessStatusDisplay