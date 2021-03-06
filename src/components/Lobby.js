import React, {useContext, useCallback, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {setNewRoomPlayerSide, setNewRoomName, setNewRoomOwner, setAvailableRooms} from '../reducers/lobbyReducer'
import {setJoinedRoom, resetJoinedRoom} from '../reducers/lobbyReducer'
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
import { SocketContext } from '../services/socket';

const Lobby = () => {
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.lobby.rooms)
    const newRoomInfo = useSelector(state => state.lobby.newRoomInfo)
    const user = "anonymous"
    
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
        console.log(`Joined room ${room.roomName}`)
        dispatch(setJoinedRoom())
    }

    const handleCreateRoom = (event) => {
        event.preventDefault()
        console.log(newRoomInfo)
        socket.emit("create_room", newRoomInfo)
        console.log('CREATE ROOM')
    }

    const handleSideChange = (event) => {
        dispatch(setNewRoomPlayerSide(event.target.value))
    }

    const handleRoomNameChange = (event) => {
        dispatch(setNewRoomName(event.target.value))
    }

    const setupRoom = () => {
        dispatch(setNewRoomOwner(user))

        socket.on("available_rooms", (rooms) => {
            dispatch(setAvailableRooms(rooms))
        })

        socket.on('join_room_accepted', () => {

        })

        return () => {
            socket.disconnect()
        } 
    }

    useEffect(setupRoom, [socket, dispatch])

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
                        value={newRoomInfo.roomName}
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Side</InputLabel>
                        <Select
                            native
                            value={newRoomInfo.side}
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
                                <ListItemText primary={room.roomName} secondary={room.roomOwner}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </Grid>
    )
}

export default Lobby