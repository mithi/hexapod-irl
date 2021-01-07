const readline = require("readline")
const PubNub = require("pubnub")
const { keys } = require("./keys.js")

uuid = "raw-input-uuid-servo"
channel = "hello_world"

const pubnub = new PubNub({ ...keys, uuid })

pubnub.subscribe({
    channels: [channel],
    withPresence: true,
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const recursiveAsyncReadLine = async function () {
    rl.question("Enter a number between 1 and 180: ", async function (answer) {
        if (answer == "exit") {
            return rl.close()
        }

        let n = Number(answer)
        n = isNaN(n) ? 1 : n
        n = Math.max(1, Math.min(n, 180))

        const result = await pubnub.publish({
            channel,
            message: { degrees: n, from: uuid },
        })

        console.log(result)
        recursiveAsyncReadLine()
    })
}

recursiveAsyncReadLine()
