import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import {Link} from "react-router-dom"

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
        },
        link: {
            color: theme.palette.background.paper,
            textDecoration: 'none',
            ':hover': {
                color: '#00F'
            }
        }


      }));
      
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
                <Link className={classes.link} to="/">
                    <IconButton edge="start" className={classes.titleButton} color="inherit">
                        ChessJS
                    </IconButton>
                </Link>
              <Button className={classes.loginButton} color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
      )
}
export default NavBar