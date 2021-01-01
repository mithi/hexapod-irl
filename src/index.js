import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { PubNubProvider } from "pubnub-react"
import PubNub from "pubnub"
import { keys } from "./KEYS"

const uuid = "sample-react-app-uuid"
const pubnub = new PubNub({ ...keys, uuid })

const App = React.lazy(() => import("./App"))

ReactDOM.render(
    <React.StrictMode>
        <PubNubProvider client={pubnub}>
            <Suspense fallback={<p>Mithi's Bare Minimum Hexapod Robot Simulator...</p>}>
                <App />
            </Suspense>
        </PubNubProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
