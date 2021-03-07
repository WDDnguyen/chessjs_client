
import React, {useContext, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField'
import {useSelector, useDispatch} from 'react-redux'
import {setChatMessage, resetChatMessage, updateChatLog} from '../reducers/chatReducer'
import { SocketContext } from '../services/socket'

const ChatBox = () => {
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const roomId = useSelector(state => state.lobby.joinedRoom)
    const message = useSelector(state => state.chat.message)
    const gameLog = useSelector(state => state.chat.gameLog)

    const useStyles = makeStyles(() => ({
        root: {
            height: '400px',
        },
        messageArea: {
            height: '300px',
            overflow: 'auto',
            border: "2px solid black",
            borderRadius: "5px"
        },
        messageBox: {
            height:'60px',
            marginTop: "5px",
        },
        messageBoxText: {
            height: '100%',
            width: '78%',
            borderRadius: "5px",
            marginRight: "3px"
        },
        messageBoxSend: {
            width: 'auto',
            height: '100%'
        }
    }))

    const handleTextChange = (event) => {
        dispatch(setChatMessage(event.target.value))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        socket.emit('message', {roomId, user, message})
        dispatch(resetChatMessage())
    }

    const classes = useStyles()

    const setupChat = () => {
        socket.emit('request_game_log', {roomId})
        socket.on('game_log', ({gameLog}) => {
            dispatch(updateChatLog(gameLog))
        })
    }

    useEffect(setupChat, [socket, dispatch, message, roomId, user])

    return (
        <div className={classes.root}>
            <List dense className={classes.messageArea}>
            {gameLog.map(logItem => {
                return (
                    <ListItem key={logItem}>
                        <ListItemText>
                            {logItem}
                        </ListItemText>
                    </ListItem>
                )
            })}
            </List>
            <form onSubmit={handleSubmit} className={classes.messageBox}>
                 <TextField
                    className={classes.messageBoxText}
                    placeholder="Type something"
                    value={message}
                    onChange={handleTextChange}
                    variant="outlined"
                />
                <Button 
                    variant="contained"
                    className={classes.messageBoxSend}
                    color="primary" 
                    endIcon={<SendIcon />}
                    type="submit"
                >
                    send
                </Button>
            </form>
        </div>
    )    
}

export default ChatBox