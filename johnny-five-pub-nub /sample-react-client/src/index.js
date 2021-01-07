import ReactDOM from "react-dom"
import React, { useState, useEffect } from "react"
import PubNub from "pubnub"
import { PubNubProvider, usePubNub } from "pubnub-react"
import { keys } from "../../scripts/keys"
import { pageStyles, footerStyles, inputStyles, buttonStyles } from "./styles"

const uuid = "sample-react-app-uuid"
const channel = "hello_world"

const pubnub = new PubNub({ ...keys, uuid })

const ServoSender = () => {
    const pubnub = usePubNub()
    const [channels] = useState([channel])

    const [message, setMessage] = useState("")

    const handleMessage = event => {
        const message = event.message
        if (typeof message === "string" || message.hasOwnProperty("text")) {
            const text = message.text || message
            addMessage(messages => [...messages, text])
        }
    }

    const sendMessage = m => {
        if (m) {
            console.log(m)
            let n = Number(m)
            n = isNaN(n) ? 1 : n
            n = Math.max(1, Math.min(n, 180))

            pubnub
                .publish({ channel: channels[0], message: { degrees: n, from: uuid } })
                .then(() => setMessage(""))
        }
    }

    useEffect(() => {
        pubnub.addListener({ message: handleMessage })
        pubnub.subscribe({ channels })
    }, [pubnub, channels])

    return (
        <div style={pageStyles}>
            <div style={footerStyles}>
                <input
                    type="text"
                    style={inputStyles}
                    placeholder="Between 1 and 180"
                    value={message}
                    onKeyPress={e => {
                        if (e.key !== "Enter") return
                        sendMessage(message)
                    }}
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    style={buttonStyles}
                    onClick={e => {
                        e.preventDefault()
                        sendMessage(message)
                    }}
                >
                    Send Number
                </button>
            </div>
        </div>
    )
}

const App = () => {
    return (
        <PubNubProvider client={pubnub}>
            <ServoSender />
        </PubNubProvider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
