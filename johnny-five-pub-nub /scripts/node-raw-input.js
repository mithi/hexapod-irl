const readline = require("readline")
const PubNub = require("pubnub")
const { keys } = require("./keys.js")

uuid = "raw-input-uuid"
channel = "hello_world"

const pubnub = new PubNub({ ...keys, uuid })

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const recursiveAsyncReadLine = async function () {
    rl.question("Command: ", async function (answer) {
        if (answer == "exit") {
            return rl.close()
        }

        const result = await pubnub.publish({
            channel,
            message: { title: "this message is from: ", uuid, answer },
        })

        console.log(".............")
        console.log(result)

        recursiveAsyncReadLine()
    })
}

recursiveAsyncReadLine()
