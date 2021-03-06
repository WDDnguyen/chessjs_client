
import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField'
import {useSelector, useDispatch} from 'react-redux'
import {setChatMessage, resetChatMessage, addMessageToLog} from '../reducers/chatReducer'

const ChatBox = () => {

    const dispatch = useDispatch()
    const message = useSelector(state => state.chat.message)
    const messageLog = useSelector(state => state.chat.messageLog)

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
        dispatch(addMessageToLog(message))
        dispatch(resetChatMessage())
    }

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <List dense className={classes.messageArea}>
            {messageLog.map(msg => {
                return (
                    <ListItem key={msg}>
                        <ListItemText>
                            {msg}
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