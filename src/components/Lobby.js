import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {setNewRoomPlayerSide, setNewRoomName, setNewRoomOwner} from '../reducers/lobbyReducer'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import AddBoxIcon from '@material-ui/icons/AddBox'

const Lobby = () => {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.lobby.rooms)
    const newRoom = useSelector(state => state.lobby.newRoom)

    const useStyles = makeStyles((theme) => ({
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
          border: '2px solid black'
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
        dispatch(setNewRoomOwner('player'))
    }

    const handleSideChange = (event) => {
        dispatch(setNewRoomPlayerSide(event.target.value))
    }

    const handleRoomNameChange = (event) => {
        dispatch(setNewRoomName(event.target.value))
    }

    const classes = useStyles()

    return (
        <Grid container justify="center" direction="column" alignItems="center">
            <Grid item>
                <form className={classes.form} onSubmit={handleCreateRoom}>
                    <TextField
                        name="roomName"
                        placeholder="roomName"
                        label="Room Name"
                        onChange={handleRoomNameChange}
                        value={newRoom.roomName}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Side</InputLabel>
                        <Select
                            native
                            value={newRoom.side}
                            onChange={handleSideChange}
                            label="Side"
                        >
                            <option value='white'>White</option>
                            <option value='black'>Black</option>    
                        </Select>
                    </FormControl> 
                    <Button 
                        variant="contained"
                        color="primary" 
                        endIcon={<AddBoxIcon />}
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