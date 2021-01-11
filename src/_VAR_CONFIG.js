// the channel where the client sends command, and the server receives commands
const CHANNEL_NAME = "setServo"

// the port / url where the server listens for commands from clients (clients like our react app)
const SOCKET_SERVER_PORT = 4001
const SOCKET_SERVER_URL = `http://127.0.0.1:${SOCKET_SERVER_PORT}`

// client urls that are allowed to connect with our robot
const SOCKET_CLIENT_URLS = ["http://localhost:5000", "http://192.168.254.105:5000"]

// we don't want to spam too many commands to our robot
// (in milliseconds)
const MINIMUM_TIME_BETWEEN_MESSAGES = 20

// the client app should send its name to the server
// so that the server knows immediately where the command is coming from
// for information purpose only, should NOT be used for security purposes
const CLIENT_SENDER_NAME = "react-app"

module.exports = {
    SOCKET_CLIENT_URLS,
    SOCKET_SERVER_PORT,
    SOCKET_SERVER_URL,
    MINIMUM_TIME_BETWEEN_MESSAGES,
    CLIENT_SENDER_NAME,
    CHANNEL_NAME,
}
