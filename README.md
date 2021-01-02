# Mithi's Hexapod IRL

<p align="center">
    <img src="https://user-images.githubusercontent.com/1670421/103467765-451a2180-4d8d-11eb-8f94-1a23201595b9.gif" alt="drawing" />
</p>

This is a "fork" of the original [Bare-Minimum Hexapod Robot Simulator 2](https://github.com/mithi/hexapod) that is heavily modified to be able to control a real physical hexapod robot.

<p align="center">
    <img src="https://user-images.githubusercontent.com/1670421/103467849-46981980-4d8e-11eb-911e-7cb63282c0c2.gif" alt="drawing" />
</p>

## 🚜 🚧 👷 🏗️ ❗❗Under Construction (Use at your own risk! ) ❗❗🚜 🚧 👷 🏗️

## How to Use

- Signup with [PubNub](https://pubnub.com) then update the keys in [`./src/KEYS.js`](https://github.com/mithi/hexapod-irl/blob/dev/src/KEYS.js)
- Update your servo config in [`./src/SERVO_CONFIG.js`](https://github.com/mithi/hexapod-irl/blob/dev/src/SERVO_CONFIG.js)
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

-   Use [`hexapod-kinematics-library`](https://github.com/mithi/hexapod-kinematics-library) for computations
-   Refactor `App` component from class component to function component
-   Add function transform pose wrt to physical servo parameters
-   Modify `App` component to broadcast pose to the world via pubnub
-   Code to run on a physical robot (`johnny-five` script)

### Other Minor changes

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
