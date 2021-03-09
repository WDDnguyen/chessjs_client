import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {signUp} from '../services/sign'
import {useHistory} from "react-router-dom"
import {useDispatch} from 'react-redux'
import {setUser} from '../reducers/userReducer'

const SignupForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const validate = values => {
        const errors = {};
        if (!values.userName) {
            errors.userName = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            userName: 'userName',
            password: ''
        },
        validate,
        onSubmit: async (values, actions) => {
            try {
                const response = await signUp(values)
                const newUser = {
                    userName: response.data.userName
                }
                dispatch(setUser(newUser))
                history.push('/lobby')
            } catch (error) {
                actions.setFieldError('general', error.response.data.message)
            } finally {
                actions.setSubmitting(false)
            }
        }
    })

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        error: {
            color: 'red'
        }
    }))

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography className={classes.error} component="h1" variant="h5">
          {formik.errors.general}
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="userName"
                name="userName"
                value={formik.userName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.password}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignupForm
