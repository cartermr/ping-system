import * as dotenv from 'dotenv'
dotenv.config()

import http from 'node:http'
import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const webServer = http.createServer(app)
const webSocketServer = new WebSocketServer({ server: webServer, path: '/api/socket'})

app.get('/hello', (request, response) => response.send('Hello!!!!'))

webServer.listen(8080, () => console.log('Server Running'))