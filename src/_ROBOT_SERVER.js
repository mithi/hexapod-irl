const { Board, Servo } = require("johnny-five")
const { servoConfig } = require("./_SERVO_CONFIG")

const app = require("express")()
const http = require("http").Server(app)
// server-side
const io = require("socket.io")(http, {
    cors: {
        origin: ["http://localhost:5000", "http://192.168.254.105:5000"],
    },
})

const board = new Board()

const LEG_POSITIONS = [
    "leftFront",
    "rightFront",
    "leftMiddle",
    "rightMiddle",
    "leftBack",
    "rightBack",
]

board.on("ready", () => {
    console.log("Board connected.")

    // *************************
    // INITIALIZE SERVOS
    // *************************
    const initServo = (legPosition, angleName) =>
        new Servo(servoConfig[legPosition][angleName])

    let hexapodServos = {}

    for (let leg of LEG_POSITIONS) {
        hexapodServos[leg] = {
            alpha: initServo(leg, "alpha"),
            beta: initServo(leg, "beta"),
            gamma: initServo(leg, "gamma"),
        }

        hexapodServos[leg].alpha.to(90)
        hexapodServos[leg].beta.to(90)
        hexapodServos[leg].gamma.to(90)
    }

    // *************************
    // COMMAND SERVOS
    // *************************
    const setServo = (pose, leg, angle) => {
        const newPose = pose[leg][angle]
        hexapodServos[leg][angle].to(newPose)
    }

    const setHexapodPose = pose => {
        for (let leg of LEG_POSITIONS) {
            setServo(pose, leg, "alpha")
            setServo(pose, leg, "beta")
            setServo(pose, leg, "gamma")
        }
    }

    // *************************
    // LISTEN TO SOCKET
    // *************************
    io.on("connection", socket => {
        console.log("client connected.")

        socket.on("disconnect", () => {
            console.log("client disconnected.")
        })

        socket.on("setServo", msg => {
            if (msg.pose) {
                setHexapodPose(msg.pose)
            }
        })
    })
})

http.listen(4001, function () {
    console.log("listening on *:4001")
})
