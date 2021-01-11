import React, { useState, useEffect, useCallback } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { DEFAULT_POSE } from "./templates"
import { SECTION_NAMES } from "./components/vars"
import { Nav, NavDetailed, DimensionsWidget } from "./components"
import { updateHexapod, Page } from "./AppHelpers"
import HexapodPlot from "./components/HexapodPlot"
import useSendPose from "./_HOOK"

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
