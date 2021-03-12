import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import {useHistory} from "react-router-dom"

const NavBarLogin = ({user}) => {
  const history = useHistory()  
  const useStyles = makeStyles((theme) => ({
    loginButton: {
        marginLeft: 'auto',
        margin: theme.spacing(2)
    }
  }))
  
  const handleLoginButton = () => {
    history.push('/signin')
  }

  const classes = useStyles();
  if (user.userName === undefined) {
    return (
      <IconButton
        className={classes.loginButton}
        color="inherit"
        onClick={handleLoginButton}
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