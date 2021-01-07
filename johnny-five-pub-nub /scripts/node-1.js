const PubNub = require("pubnub")
const { keys } = require("./keys.js")
const { presenceCallback, logMessageEvent, logStatusEvent } = require("./utils.js")

uuid = "first-node-uuid"
channel = "hello_world"

const pubnub = new PubNub({ ...keys, uuid })

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
