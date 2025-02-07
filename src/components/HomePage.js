import React from 'react'
import { Typography} from '@material-ui/core'
import {Link} from "react-router-dom"
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Button from '@material-ui/core/Button'
import {customAlphabet} from 'nanoid'
import {setUser} from '../reducers/userReducer'
import {useDispatch} from 'react-redux'

const HomePage = () => {
    const dispatch = useDispatch()

    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: 'center',
            height: '100vh'
        },
        link: {
            margin: theme.spacing(0, 2),
            color: theme.palette.background.paper,
            textDecoration: 'none',
            ':hover': {
                color: '#00F'
            }
        },
        name: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderRadius: '30px'
        }
      }))

    const handleGuessButton = () => {
        const nanoid = customAlphabet('1234567890', 8)
        const userName = `Guess-${nanoid()}`
        console.log(userName)
        const user = {
            userName: userName
        }
        dispatch(setUser(user))
    }

    const classes = useStyles()
    
    return (

        <Grid container className={classes.root} justify="center" direction="column" alignItems="center" spacing={8}>
            <Grid item className={classes.name}>
                <Typography variant="h2"> Online Chess JS </Typography>
            </Grid>
            <Grid item>
                <Link className={classes.link} to="/lobby" >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGuessButton}
                        endIcon={<AddBoxIcon />}
                    >
                        Play as Guest
                    </Button>
                </Link>
                <Link className={classes.link} to="/signin">
                    <Button 
                        variant="contained"
                        color="secondary" 
                        endIcon={<AddBoxIcon />}
                    >
                        Sign in
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}

export default HomePage