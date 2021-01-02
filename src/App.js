import React, { useState, useEffect, useCallback } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { DEFAULT_POSE } from "./templates"
import { SECTION_NAMES } from "./components/vars"
import { Nav, NavDetailed, DimensionsWidget } from "./components"
import { updateHexapod, Page } from "./AppHelpers"
import HexapodPlot from "./components/HexapodPlot"
import { usePubNub } from "pubnub-react"

const channel = "hexapod-pose"

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

const App = () => {
    const [pageName, setPageName] = useState(SECTION_NAMES.landingPage)
    const [hexapod, setHexapod] = useState(() => updateHexapod("default"))
    const [revision, setRevision] = useState(0)
    const pubnub = usePubNub()

    const inHexapodPage = pageName !== SECTION_NAMES.landingPage

    useEffect(() => {
        pubnub
            .publish({ channel, message: { pose: transformPose(hexapod.pose) } })
            .then(() => console.log("."))
    }, [pubnub, hexapod])

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
