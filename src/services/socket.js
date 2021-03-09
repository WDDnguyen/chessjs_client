import React from 'react'
import socketio from "socket.io-client"

export const socket = socketio.connect('https://rocky-inlet-25088.herokuapp.com/')
export const SocketContext = React.createContext()