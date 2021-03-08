import React from 'react'
import Typography from '@material-ui/core/Typography'

const ChessStatusDisplay = ({isChecked, isGameOver, turn}) => {
    if (!isChecked && !isGameOver) {
      return null
    } else if (isGameOver) {
  
      const winner = turn === 'b' ? 'w' : 'b'
      return (
        <Typography variant="h5">
          Winner: {winner}
        </Typography>
      )
    } else if (isChecked) {
      return (
        <Typography variant="h5">
          Checked: {turn} 
        </Typography>
      )
    }
}

export default ChessStatusDisplay