const { Board, Servo } = require("johnny-five")
const PubNub = require("pubnub")
const { keys } = require("./keys.js")

uuid = "johnny-five-node-uuid-servo"
channel = "hello_world"

const pubnub = new PubNub({ ...keys, uuid, ssl: true })
const board = new Board()

const specs = {
    controller: "PCA9685",
}

board.on("ready", () => {
    console.log(".....Connected.....")
    let myServo = new Servo({ ...specs, pin: 12 })
    myServo.to(0)

    const setServo = messageEvent => {
        console.log("...setServo....")
        console.log("message: ", messageEvent.message)

        if (!messageEvent.message.degrees) {
            return
        }

        let degrees = Number(messageEvent.message.degrees)
        degrees = isNaN(degrees) ? 0 : degrees
        console.log("degrees: ", degrees)

        myServo.to(degrees)
    }

    pubnub.addListener({
        message: function (messageEvent) {
            setServo(messageEvent)
        },
    })

    pubnub.subscribe({
        channels: [channel],
        withPresence: true,
    })
})
