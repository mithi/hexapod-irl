// See configurable parameters at: http://johnny-five.io/api/servo/

const controller = "PCA9685"
const address = "0x41"

const servoConfig = {
    rightMiddle: {
        alpha: { controller, pin: 6, address },
        beta: { controller, pin: 8, address },
        gamma: { controller, pin: 7, address },
    },

    rightFront: {
        alpha: { controller, pin: 15, address },
        beta: { pin: 3 },
        gamma: { pin: 5 },
    },

    leftFront: {
        alpha: { controller, pin: 13, address },
        beta: { controller, pin: 14, address },
        gamma: { controller, pin: 12, address },
    },

    leftMiddle: {
        alpha: { controller, pin: 10, address },
        beta: { controller, pin: 9, address },
        gamma: { controller, pin: 11, address },
    },

    leftBack: {
        alpha: { controller, pin: 2, address },
        beta: { controller, pin: 1, address },
        gamma: { controller, pin: 0, address },
    },

    rightBack: {
        alpha: { controller, pin: 5, address },
        beta: { controller, pin: 4, address },
        gamma: { controller, pin: 3, address },
    },
}

module.exports = { servoConfig }
