
import React from 'react'
import {withStyles, makeStyles} from '@material-ui/core/styles';
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
            height: '300px',
            overflowY: 'auto',
            border: "1px solid black",
            borderRadius: "5px",
            marginBottom: "5px"
        }
    })

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        },
        body: {
            fontSize: 18
        }
    }))(TableCell)

    const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.divider,
          },
        },
    }))(TableRow);
    
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
                <StyledTableCell>Turn</StyledTableCell>
                <StyledTableCell>White</StyledTableCell>
                <StyledTableCell>Black</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return(
              <StyledTableRow key={row.t}>
                <StyledTableCell>{row.t}</StyledTableCell>
                <StyledTableCell>{row.w}</StyledTableCell>
                <StyledTableCell>{row.b}</StyledTableCell>
              </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

export default HistoryTable