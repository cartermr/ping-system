import { PingService } from "./services/PingService";
import { runSeed } from "./services/seedTestData";
import { pingStartup } from './startup/pingStartup'

interface ActivePings {
  [key: string]: PingService
}

let activePingServices: ActivePings = {}

pingStartup(activePingServices)

// const app = express()
// const webServer = createServer(app)
// const webSocketServer = new Server(webServer)

// app.use(cors())
// app.use(express.static('src/public'))

// webSocketServer.on('connection', (socket: Socket) => {
//   console.log(`Client connected: socket ID: ${socket.id}`)

//   socket.on('accountID', (data) => {
//     if (activePingServices[data]) {
//       activePingServices[data].attachWebSocket(socket)
//       console.log(activePingServices[data].webSocket?.id)
//     }
//   })

//   socket.on('update', (data) => console.log(socket.rooms))

//   socket.on('disconnect', () => {
//     console.log('Client Disconnected')
//   })
// })

// webServer.listen('80', () => console.log('Server Running'))