import React, { useState, useEffect, useCallback, useRef } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { DEFAULT_POSE } from "./templates"
import { SECTION_NAMES } from "./components/vars"
import { Nav, NavDetailed, DimensionsWidget } from "./components"
import { updateHexapod, Page } from "./AppHelpers"
import HexapodPlot from "./components/HexapodPlot"
import socketIOClient from "socket.io-client"

const SOCKET_SERVER_URL = "http://127.0.0.1:4001"
const TIME_INTERVAL = 20

const LEG_POSITIONS = [
    "leftFront",
    "rightFront",
    "leftMiddle",
    "rightMiddle",
    "leftBack",
    "rightBack",
]

const LEFT_LEGS = ["leftFront", "leftMiddle", "leftBack"]

const clean = (x, shouldInvert) => {
    let directed = shouldInvert ? -1 * x : x
    //return Math.max(Math.min(Math.round(directed) + 90, 180), 0)
    return directed + 90
}

const transformPose = pose => {
    let newPose = {}

    for (let leg of LEG_POSITIONS) {
        const { alpha, beta, gamma } = pose[leg]
        const isLeft = LEFT_LEGS.includes(leg)
        newPose[leg] = {
            alpha: clean(alpha, true),
            beta: clean(beta, isLeft),
            gamma: clean(gamma, !isLeft),
        }
    }

    return newPose
}

const useSendPose = () => {
    const socketRef = useRef()
    const [lastDate, setLastDate] = useState(() => new Date())
    // delta date is the interval between the last two messages sent
    const [deltaDate, setDeltaDate] = useState(0)

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL)
        return () => socketRef.current.disconnect()
    }, [])

    const sendPose = useCallback(
        pose => {
            const currentDate = new Date()
            const newDeltaDate = currentDate - lastDate
            console.log("delta: ", newDeltaDate, "current: ", currentDate.getTime())
            // we shouldn't spam the robot with commands
            if (newDeltaDate < TIME_INTERVAL) {
                return
            }

            socketRef.current.emit("setServo", {
                pose: transformPose(pose),
                sender: "react-app",
                time: currentDate.getTime(),
            })

            setLastDate(currentDate)
            setDeltaDate(newDeltaDate)
        },
        [lastDate]
    )

    return [sendPose, deltaDate]
}

const App = () => {
    const [pageName, setPageName] = useState(SECTION_NAMES.landingPage)
    const [hexapod, setHexapod] = useState(() => updateHexapod("default"))
    const [revision, setRevision] = useState(0)
    const inHexapodPage = pageName !== SECTION_NAMES.landingPage
    const [sendPose, deltaDate] = useSendPose()

    useEffect(() => sendPose(hexapod.pose), [hexapod, sendPose])

    const manageState = useCallback((updateType, newParam) => {
        setRevision(r => r + 1)
        setHexapod(h => updateHexapod(updateType, newParam, h))
    }, [])

    useEffect(() => {
        document.title = pageName + " - Mithi's Bare Minimum Hexapod Robot Simulator"
        manageState("pose", { pose: DEFAULT_POSE })
    }, [pageName, manageState])

    const pageComponent = useCallback(
        Component => (
            <Component
                onMount={newPageName => setPageName(newPageName)}
                onUpdate={manageState}
                params={{
                    dimensions: hexapod.dimensions,
                    pose: hexapod.pose,
                }}
            />
        ),
        [manageState, hexapod]
    )

    return (
        <Router>
            <Nav />
            <div id="main">
                <div id="sidebar">
                    <div hidden={!inHexapodPage}>
                        <DimensionsWidget
                            params={{ dimensions: hexapod.dimensions }}
                            onUpdate={manageState}
                        />
                    </div>
                    <Page pageComponent={pageComponent} />
                    <p> deltaDate: {deltaDate} </p>
                    {!inHexapodPage ? <NavDetailed /> : null}
                </div>
                <div id="plot" className="border" hidden={!inHexapodPage}>
                    <HexapodPlot revision={revision} hexapod={hexapod} />
                </div>
            </div>
            {inHexapodPage ? <NavDetailed /> : null}
        </Router>
    )
}

export default App
