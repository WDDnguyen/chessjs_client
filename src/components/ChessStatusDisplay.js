import React from 'react'
import Typography from '@material-ui/core/Typography'

const ChessStatusDisplay = ({isChecked, isGameOver, winner, currentPlayer}) => {
    if (!isChecked && !isGameOver) {
      return null
    } else if (isGameOver) {
      return (
        <Typography variant="h5">
          Winner: {winner}
        </Typography>
      )
    } else if (isChecked) {
      return (
        <Typography variant="h5">
          Checked: {currentPlayer} 
        </Typography>
      )
    }
}

export default ChessStatusDisplay