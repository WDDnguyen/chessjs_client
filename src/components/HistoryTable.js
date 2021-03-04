
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const HistoryTable = ({history}) => {

    const useStyles = makeStyles({
        table: {
            minWidth: '540px',
            maxHeight: '200px',
            overflowY: 'auto'
        }
    })

    const createRow = (turn, whiteMove, blackMove) => {
      return {t: turn, w: whiteMove, b: blackMove}
    }
    
    const splitHistoryToRows = (history) => {
      let rows = []
      if (history === undefined) {
        return rows
      }
      let turn = 1
      while (history.length) {
        const row = history.splice(0, 2)
        rows.push(createRow(turn, row[0], row[1]))
        turn++
      }
      return rows
    }

    const rows = splitHistoryToRows(history)

    const classes = useStyles()

    return (
      <TableContainer className={classes.table}>
        <Table size="small">
          <TableHead>
            <TableRow>
                <TableCell>Turn</TableCell>
                <TableCell>White</TableCell>
                <TableCell>Black</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return(
              <TableRow key={row.t}>
                <TableCell>{row.t}</TableCell>
                <TableCell>{row.w}</TableCell>
                <TableCell>{row.b}</TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

export default HistoryTable