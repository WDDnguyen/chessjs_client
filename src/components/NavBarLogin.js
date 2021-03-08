import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'

const NavBarLogin = ({user}) => {
  
  const useStyles = makeStyles((theme) => ({
    loginButton: {
        marginLeft: 'auto',
        margin: theme.spacing(2)
    }
  }))
  
  const classes = useStyles();
  console.log(user.userName)
  if (user.userName === undefined) {
    return (
      <IconButton
        className={classes.loginButton}
        color="inherit"
      >
        <Typography variant="h6">
          Login
        </Typography>
      </IconButton>
    )
  } else {
    return (
      <IconButton
        className={classes.loginButton}
        color="inherit"
      >
        <Typography variant="h6">
            {user.userName}
        </Typography>
        <AccountCircle />
      </IconButton>
    )
  }
}

export default NavBarLogin