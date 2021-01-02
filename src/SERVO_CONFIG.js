// See configurable parameters at: http://johnny-five.io/api/servo/

const controller = "PCA9685"

const servoConfig = {
    rightMiddle: {
        alpha: { controller, pin: 14 },
        beta: { controller, pin: 13 },
        gamma: { controller, pin: 12 },
    },

    rightFront: {
        alpha: { controller, pin: 6, address: "0x41" },
        beta: { controller, pin: 5, address: "0x41" },
        gamma: { controller, pin: 4, address: "0x41" },
    },

    leftFront: {
        alpha: { controller, pin: 1, address: "0x41" },
        beta: { controller, pin: 2, address: "0x41" },
        gamma: { controller, pin: 0, address: "0x41" },
    },

    leftMiddle: {
        alpha: { controller, pin: 10, address: "0x41" },
        beta: { controller, pin: 9, address: "0x41" },
        gamma: { controller, pin: 8, address: "0x41" },
    },

    leftBack: {
        alpha: { controller, pin: 2 },
        beta: { controller, pin: 1 },
        gamma: { controller, pin: 0 },
    },

    rightBack: {
        alpha: { controller, pin: 14, address: "0x41" },
        beta: { controller, pin: 13, address: "0x41" },
        gamma: { controller, pin: 12, address: "0x41" },
    },
}

module.exports = { servoConfig }
