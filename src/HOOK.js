import { useState, useEffect, useCallback, useRef } from "react"
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

export default useSendPose
