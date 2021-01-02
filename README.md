# Mithi's Hexapod IRL

<p align="center">
    <img src="https://user-images.githubusercontent.com/1670421/103467765-451a2180-4d8d-11eb-8f94-1a23201595b9.gif" alt="drawing" />
</p>

This is a "fork" of the original [Bare-Minimum Hexapod Robot Simulator 2](https://github.com/mithi/hexapod) that is modified to be able to control a real physical hexapod robot, among other things.

<p align="center">
    <img src="https://user-images.githubusercontent.com/1670421/103467849-46981980-4d8e-11eb-911e-7cb63282c0c2.gif" alt="drawing" />
</p>


❗❗🚜 🚧 👷 🏗️
## Under Construction (Use at your own risk! )
❗❗🚜 🚧 👷 🏗️

## How to Use

- Build a hexapod robot with an [Arduino](http://arduino.cc/)-compatible / [Johnny-five](http://johnny-five.io/) compatible board. I personally used an [Adafruit Metro Mini 328](https://www.adafruit.com/product/2590). Don't forget to flash your board with the recommended standard firmata flavor (see also: [Johnny Five Wiki: Getting Started](https://github.com/rwaldron/johnny-five/wiki/Getting-Started))
- Signup with [PubNub](https://pubnub.com) then update the keys in [`./src/KEYS.js`](https://github.com/mithi/hexapod-irl/blob/dev/src/KEYS.js)
- Update your servo config in [`./src/SERVO_CONFIG.js`](https://github.com/mithi/hexapod-irl/blob/dev/src/SERVO_CONFIG.js). The [Johnny Five documentation, Servo API page](http://johnny-five.io/api/servo/) is your friend!
- I personally two [PCA9685](https://www.adafruit.com/product/815) to drive my servos. If you do the same, make sure [you hook it up properly](https://learn.adafruit.com/16-channel-pwm-servo-driver/hooking-it-up)! 
- This is how the angle of each servo is transformed [(function)](https://github.com/mithi/hexapod-irl/blob/0d0bb156b7c79b2c7945e9793f6bf11b56866e68/src/App.js#L29) based on my specific hexapod robot configuration. You can modify this to suit your needs.
- More importantly, also inspect the bare minimum [node script](https://github.com/mithi/hexapod-irl/blob/dev/src/TEST_J52.js) that will talk to your Arduino and the front-end web app / user interface.

- Open two terminal tabs and run the following:
```
$ npm install

# on one terminal tab

$ npm run build
$ npm install -g serve
$ serve -s build

# on another terminal tab

$ node ./src/TEST_J52.js
```
## Changes

### Major changes

-   Use [`hexapod-kinematics-library`](https://github.com/mithi/hexapod-kinematics-library) for computations, replacing previous `src/hexapod`
-   Refactor [`App`](https://github.com/mithi/hexapod-irl/blob/0d0bb156b7c79b2c7945e9793f6bf11b56866e68/src/App.js) component from class component to function component
-   Add [function](https://github.com/mithi/hexapod-irl/blob/0d0bb156b7c79b2c7945e9793f6bf11b56866e68/src/App.js#L29) to transform pose wrt to physical servo configuration of my  hexapod robot.
-   Modify `App` component to broadcast pose to the world via [PubNub](https://pubnub.com)
-   Add code to run on a physical robot ([a `johnny-five` script](https://github.com/mithi/hexapod-irl/blob/dev/src/TEST_J52.js))

### Other minor changes

-   Remove tests and test related files
-   Remove google analytics and service worker
-   Landing page texts
-   Change slider parameters `./src/components/vars.js`
-   Change default dimensions `./src/templates/hexapodParams.js`

## Measurements

-   front: 400
-   side: 750
-   middle: 650
-   coxia: 300
-   femur: 850
-   tibia: 1200
