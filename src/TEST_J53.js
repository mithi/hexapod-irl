const { Board, Servo } = require("johnny-five")

/********************
pose = {
    rightMiddle: {alpha, beta, gamma },
    leftBack: { alpha, beta, gamma },
    ...
}
    (leftFront)       (rightFront)
        v2            v1
            \   head  /
             *---*---*
            /    |    \
(left      /     |     \
Middle)   /      |      \
    v3 --*------cog------*-- v0 (rightMiddle)
.         \      |      /
.          \     |     /
            \    |    /
             *---*---*
            /         \
.         v4           v5
.      (leftBack)   (rightBack)
 ********************/

// { port: "/dev/cu.usbserial-ADAOFIPEd" }
const board = new Board()

// frequency: 50
// pwmRange: [600, 2400],
// address: 0x40
// pin: 0
const specs = {
    controller: "PCA9685",
}

board.on("ready", () => {
    console.log("Connected")

    const tibiaJoints = {
        rightMiddle: new Servo({ ...specs, pin: 12 }),
        rightFront: new Servo({ ...specs, address: "0x41", pin: 4 }),
        leftFront: new Servo({ ...specs, address: "0x41", pin: 0 }),
        leftMiddle: new Servo({ ...specs, address: "0x41", pin: 8 }),
        leftBack: new Servo({ ...specs, pin: 0 }),
        rightBack: new Servo({ ...specs, address: "0x41", pin: 12 }),
    }

    const femurJoints = {
        rightMiddle: new Servo({ ...specs, pin: 13 }),
        rightFront: new Servo({ ...specs, address: "0x41", pin: 5 }),
        leftFront: new Servo({ ...specs, address: "0x41", pin: 2 }),
        leftMiddle: new Servo({ ...specs, address: "0x41", pin: 9 }),
        leftBack: new Servo({ ...specs, pin: 1 }),
        rightBack: new Servo({ ...specs, address: "0x41", pin: 13 }),
    }

    const coxiaJoints = {
        rightMiddle: new Servo({ ...specs, pin: 14 }),
        rightFront: new Servo({ ...specs, address: "0x41", pin: 6 }),
        leftFront: new Servo({ ...specs, address: "0x41", pin: 1 }),
        leftMiddle: new Servo({ ...specs, address: "0x41", pin: 10 }),
        leftBack: new Servo({ ...specs, pin: 2 }),
        rightBack: new Servo({ ...specs, address: "0x41", pin: 14 }),
    }

    tibiaJoints.rightFront.to(0) // up=0
    tibiaJoints.rightMiddle.to(0) // up=0
    tibiaJoints.rightBack.to(0) // up=0
    tibiaJoints.leftBack.to(180) // up=180
    tibiaJoints.leftMiddle.to(180) // up=180
    tibiaJoints.leftFront.to(180) // up=180

    femurJoints.rightFront.to(180) // up=180
    femurJoints.rightMiddle.to(180) // up=180
    femurJoints.rightBack.to(180) // up=180
    femurJoints.leftBack.to(0) // up=0
    femurJoints.leftMiddle.to(0) // up=0
    femurJoints.leftFront.to(0) // up=0

    // 120=clockwise
    // 60=counterclockwise
    coxiaJoints.rightFront.to(60)
    coxiaJoints.rightMiddle.to(60)
    coxiaJoints.rightBack.to(60)
    coxiaJoints.leftBack.to(60)
    coxiaJoints.leftMiddle.to(60)
    coxiaJoints.leftFront.to(60)

    const allJoints = [
        tibiaJoints.rightFront,
        tibiaJoints.rightMiddle,
        tibiaJoints.rightBack,
        tibiaJoints.leftBack,
        tibiaJoints.leftMiddle,
        tibiaJoints.leftFront,
        femurJoints.rightFront,
        femurJoints.rightMiddle,
        femurJoints.rightBack,
        femurJoints.leftBack,
        femurJoints.leftMiddle,
        femurJoints.leftFront,
        coxiaJoints.rightFront,
        coxiaJoints.rightMiddle,
        coxiaJoints.rightBack,
        coxiaJoints.leftBack,
        coxiaJoints.leftMiddle,
        coxiaJoints.leftFront,
    ]

    let i = 0
    board.loop(500, () => {
        console.log(i)
        allJoints[i].to(90)
        i += 1
        if (i >= allJoints.length) {
            i = 0
        }
    })
})
