import React from "react"
import { SECTION_NAMES } from "../vars"
import RandomRobotGif from "../pagePartials/RandomRobotGif"

class LandingPage extends React.Component {
    pageName = SECTION_NAMES.landingPage

    componentDidMount = () => this.props.onMount(this.pageName)

    render = () => (
        <>
            <div id="landing">
                <RandomRobotGif />
            </div>
        </>
    )
}

export default LandingPage
