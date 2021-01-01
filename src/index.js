import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import "./index.css"

const App = React.lazy(() => import("./App"))

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<p>Mithi's Bare Minimum Hexapod Robot Simulator...</p>}>
            <App />
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
)
