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

module.exports = { logStatusEvent, logMessageEvent, presenceCallback }
