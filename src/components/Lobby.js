import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import {useSelector, useDispatch} from 'react-redux'
import {addRoom} from '../reducers/lobbyReducer'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import SendIcon from '@material-ui/icons/Send';

const Lobby = () => {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.lobby)
    const [side, setSide] = useState('white')

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
          border: '2px solid black'
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        table: {
            border: '2px solid black'
        },
        list: {
            textAlign :'center',
            width: '540px'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
          }
    }))

    const handleJoinGame = room => {
        console.log(`Joined room ${room}`)
    }

    const handleCreateRoom = (event) => {
        event.preventDefault()
    }

    const handleSideChange = (event) => {
        setSide(event.target.value)
    }

    const classes = useStyles()
    return (
            <Grid container justify="center" direction="column" alignItems="center">
                <Grid item>
                    <form className={classes.form} onSubmit={() => handleCreateRoom}>
                        <TextField
                            name="roomName"
                            placeholder="roomName"
                            label="Room Name"
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Side</InputLabel>
                            <Select
                            native
                            value={side}
                            onChange={handleSideChange}
                            label="Side"
                            inputProps={{
                                name: 'age',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                                <option value='white'>White</option>
                                <option value='black'>Black</option>    
                            </Select>
                        </FormControl> 
                        <Button 
                            variant="contained"
                            color="primary" 
                            endIcon={<SendIcon />}
                            type="submit"
                        >
                            create
                        </Button>          
                    </form>
                </Grid>
                <Grid item>
                    <Typography variant="h4">
                        Available Rooms
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.table}>
                    <List className={classes.list}>
                        {rooms.map(room => {
                            return (
                                <ListItem key={room.id} button onClick={() => handleJoinGame(room)}>
                                    <ListItemText primary={room.name} secondary={room.player}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
    )
}

export default Lobby