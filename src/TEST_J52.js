const { Board, Servo } = require("johnny-five")
const PubNub = require("pubnub")
const { keys } = require("./KEYS.js")
const { servoConfig } = require("./SERVO_CONFIG")

const uuid = "johnny-five-node-uuid-servo"
const channel = "hexapod-pose"
const pubnub = new PubNub({ ...keys, uuid, ssl: true })
const board = new Board()

const LEG_POSITIONS = [
    "leftFront",
    "rightFront",
    "leftMiddle",
    "rightMiddle",
    "leftBack",
    "rightBack",
]

/*
let previousPose = {
    leftFront: { alpha: 90, beta: 90, gamma: 90 },
    rightFront: { alpha: 90, beta: 90, gamma: 90 },
    leftMiddle: { alpha: 90, beta: 90, gamma: 90 },
    rightMiddle: { alpha: 90, beta: 90, gamma: 90 },
    leftBack: { alpha: 90, beta: 90, gamma: 90 },
    rightBack: { alpha: 90, beta: 90, gamma: 90 },
}
*/
let previousDate = new Date()

board.on("ready", () => {
    console.log(".....Connected.....")

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

    previousDate = new Date()
    // *************************
    // COMMAND SERVOS
    // *************************
    const setServo = (pose, leg, angle) => {
        //const oldPose = previousPose[leg][angle]
        const newPose = pose[leg][angle]
        //const deltaPose = Math.abs(oldPose - newPose)
        //hexapodServos[leg][angle].to(newPose, deltaPose, 10)
        hexapodServos[leg][angle].to(newPose)
    }

    const setHexapodPose = messageEvent => {
        //console.log("...setServo....", messageEvent.message)
        const pose = messageEvent.message.pose
        if (!pose) {
            return
        }
        const currentDate = new Date()
        const deltaDate = currentDate - previousDate
        console.log("delta: ", deltaDate, "gamma: ", pose.rightMiddle.gamma)

        for (let leg of LEG_POSITIONS) {
            setServo(pose, leg, "alpha")
            setServo(pose, leg, "beta")
            setServo(pose, leg, "gamma")
        }

        //previousPose = pose
        previousDate = currentDate
    }

    // *************************
    // SUBSCRIBE AND LISTEN TO INCOMING MESSAGES
    // *************************
    pubnub.addListener({
        message: messageEvent => setHexapodPose(messageEvent),
    })

    pubnub.subscribe({ channels: [channel], withPresence: true })
})
