const PubNub = require("pubnub")
const { keys } = require("./KEYS.js")

const uuid = "first-node-uuid"
const channel = "hexapod-pose"

const pubnub = new PubNub({ ...keys, uuid })

const presenceCallback = presenceEvent => {
    console.log(".....presence.......")
    console.log("action: ", presenceEvent.action)
    console.log("uuid: ", presenceEvent.uuid)
    console.log("channel: ", presenceEvent.channel)
}

const logStatusEvent = statusEvent => {
    console.log("....status.....")
    console.log()
    console.log("category: ", statusEvent)
}

const logMessageEvent = (messageEvent, receivedInNode) => {
    console.log()
    console.log(".........message......")
    console.log("received in: ", receivedInNode)
    console.log(messageEvent.message)
}

async function publishSampleMessage() {
    const result = await pubnub.publish({
        channel,
        message: { title: "this message is from: ", uuid },
    })
    console.log("published: ", result)
}

pubnub.addListener({
    status: function (statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            publishSampleMessage()
        }

        logStatusEvent(statusEvent)
    },
    message: function (messageEvent) {
        logMessageEvent(messageEvent, uuid)
    },
    presence: presenceCallback,
})

pubnub.subscribe({
    channels: [channel],
    withPresence: true,
})
