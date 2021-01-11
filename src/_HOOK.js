import { useState, useEffect, useCallback, useRef } from "react"
import socketIOClient from "socket.io-client"
import {
    SOCKET_SERVER_URL,
    MINIMUM_TIME_BETWEEN_MESSAGES,
    CLIENT_SENDER_NAME,
    CHANNEL_NAME,
} from "./_VAR_CONFIG"

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

            // we shouldn't spam the robot with commands
            if (newDeltaDate < MINIMUM_TIME_BETWEEN_MESSAGES) {
                console.log("too soon: ", newDeltaDate)
                return
            }

            console.log("just right: ", newDeltaDate)

            socketRef.current.emit(CHANNEL_NAME, {
                pose: transformPose(pose),
                sender: CLIENT_SENDER_NAME,
                time: currentDate.getTime(),
            })

            setLastDate(currentDate)
            setDeltaDate(newDeltaDate)
        },
        [lastDate]
    )

    return [sendPose, deltaDate]
}

export default useSendPose
