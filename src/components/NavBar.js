import React from 'react';
import {makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import NavBarLogin from './NavBarLogin'
import Typography from '@material-ui/core/Typography'
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux'

const NavBar = () => {
    const user = useSelector(state => state.user)
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          display: 'flex',
          justifyContent:'flex-end',
          marginBottom: '10px'
        },
        navItem: {
          marginRight: theme.spacing(4),
        },
        link: {
            color: theme.palette.background.paper,
            textDecoration: 'none',
            ':hover': {
                color: '#00F'
            }
        }
      }))
      
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
                <Typography className={classes.navItem} variant="h4">
                  Chess JS
                </Typography>
                <Link className={classes.link} to="/lobby">
                    <IconButton edge="start" className={classes.navItem} color="inherit">
                        <Typography variant="h6">
                          Lobby
                        </Typography>
                    </IconButton>
                </Link>
              <NavBarLogin user={user} />
            </Toolbar>
          </AppBar>
        </div>
      )
}
export default NavBar