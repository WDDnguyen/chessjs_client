import React, {useContext, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {setNewRoomPlayerSide, setAvailableRooms} from '../reducers/lobbyReducer'
import {setRoomJoined} from '../reducers/lobbyReducer'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { SocketContext } from '../services/socket'
import {nanoid} from 'nanoid'
import {useHistory} from "react-router-dom"

const userId = nanoid(6)

const Lobby = () => {
    const socket = useContext(SocketContext)
    const history = useHistory()
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.lobby.rooms)
    const newRoomInfo = useSelector(state => state.lobby.newRoomInfo)
    const user = {
        userName: 'anonymous',
        userId: userId
    }

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

    const handleJoinGame = roomName => {
        socket.emit('join_room', {roomName, user})
    }

    const handleCreateRoom = (event) => {
        event.preventDefault()
        socket.emit("create_room", {newRoomInfo, user})
    }

    const handleSideChange = (event) => {
        dispatch(setNewRoomPlayerSide(event.target.value))
    }

    const setupRoom = () => {

        socket.on('connect', () => {
            socket.emit('available_rooms')
        })
        socket.on("available_rooms", (rooms) => {
            dispatch(setAvailableRooms(rooms))
        })

        socket.on('create_room_accepted', ({newRoomId}) => {
            console.log(newRoomId)
            dispatch(setRoomJoined(newRoomId))
        })

        socket.on('join_room_accepted', ({roomName}) => {
            dispatch(setRoomJoined(roomName))
        })

        socket.on('play_chess_game', ({roomName}) => {
            history.push(`/game/${roomName}`)
        })
    }

    useEffect(setupRoom, [socket, dispatch, history])

    const classes = useStyles()

    return (
        <Grid container justify="center" direction="column" alignItems="center">
            <Grid item>
                <form className={classes.form} onSubmit={handleCreateRoom}>
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
                            <ListItem key={room.roomName} button onClick={() => handleJoinGame(room.roomName)}>
                                <ListItemText primary={room.roomOwner.userName} secondary={room.roomName}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </Grid>
    )
}

export default Lobby