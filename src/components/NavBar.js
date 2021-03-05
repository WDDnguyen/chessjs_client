import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'

const NavBar = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          display: 'flex',
          justifyContent:'flex-end'
        },
        titleButton: {
          marginRight: theme.spacing(2),
        },
        loginButton: {
            marginLeft: 'auto'
        }
      }));
      
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.titleButton} color="inherit">
                ChessJS
              </IconButton>
              <Button className={classes.loginButton} color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
      )
}
export default NavBar