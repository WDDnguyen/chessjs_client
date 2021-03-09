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
import {useHistory} from "react-router-dom"

const Lobby = () => {
    const socket = useContext(SocketContext)
    const history = useHistory()
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.lobby.rooms)
    const newRoomInfo = useSelector(state => state.lobby.newRoomInfo)
    const roomJoined = useSelector(state => state.lobby.roomJoined)
    const user = useSelector(state => state.user)

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
          textAlign: 'center',
        },
        grid: {
            marginTop: theme.spacing(2),
            minWidth: 540
        },
        colorStyle: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        }
    }))

    const handleJoinGame = roomName => {
        if (roomJoined === null) {
            socket.emit('join_room', {roomName, user})
        }
    }

    const handleCreateRoom = (event) => {
        event.preventDefault()
        if (roomJoined === null) {
            socket.emit("create_room", {newRoomInfo, user})
        }
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

    if (user === undefined || user.userName === undefined) {
        history.push('/')
    }

    const availableRooms = user 

    return (
        <Grid container className={classes.root} justify="center" direction="column" alignItems="center">
            <Grid item>
                    <Typography className={classes.colorStyle} variant="h4">
                    Create Game 
                    </Typography>
                    <form onSubmit={handleCreateRoom}>
                        <FormControl className={classes.grid} variant="outlined">
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
                        <Button 
                            variant="contained"
                            className={classes.formButton}
                            color="primary" 
                            endIcon={<AddBoxIcon />}
                            type="submit"
                        >
                            create
                        </Button>          
                        </FormControl> 
                    </form>
            </Grid>
            <Grid item className={classes.grid}>
                <div>
                    <Typography className={classes.colorStyle} variant="h4">
                        Available Rooms
                    </Typography>

                    <List>
                        {rooms.map(room => {
                            return (
                                <ListItem key={room.roomName} button onClick={() => handleJoinGame(room.roomName)}>
                                    <ListItemText primary={room.roomOwner.userName} secondary={room.roomName}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            </Grid>
        </Grid>
    )
}

export default Lobby