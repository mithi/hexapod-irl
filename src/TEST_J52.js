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

const clean = x => {
    const n = Number(x)
    return isNaN(n) ? 0 : Math.max(Math.min(Math.round(n) + 90, 180), 0)
}

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

    // *************************
    // COMMAND SERVOS
    // *************************
    const setServo = (pose, leg, angle) =>
        hexapodServos[leg][angle].to(clean(pose[leg][angle]))

    const setHexapodPose = messageEvent => {
        console.log("...setServo....", messageEvent.message)
        const pose = messageEvent.message.pose

        if (!pose) {
            return
        }

        for (let leg of LEG_POSITIONS) {
            setServo(pose, leg, "alpha")
            setServo(pose, leg, "beta")
            setServo(pose, leg, "gamma")
        }
    }

    // *************************
    // SUBSCRIBE AND LISTEN TO INCOMING MESSAGES
    // *************************
    pubnub.addListener({
        message: messageEvent => setHexapodPose(messageEvent),
    })

    pubnub.subscribe({ channels: [channel], withPresence: true })
})
