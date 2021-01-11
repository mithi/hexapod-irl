# Mithi's Hexapod IRL [![buy me coffee](https://img.shields.io/badge/Buy%20me%20-coffee!-orange.svg?logo=buy-me-a-coffee&color=795548)](https://ko-fi.com/minimithi)

<p align="center">
    <img src="https://user-images.githubusercontent.com/1670421/103467765-451a2180-4d8d-11eb-8f94-1a23201595b9.gif" alt="drawing" />
</p>

This is a "fork" of the original [Bare-Minimum Hexapod Robot Simulator 2](https://github.com/mithi/hexapod) that is modified to be able to control a real physical hexapod robot, among other things. Note: This uses the [hexapod-kinematics-library](https://github.com/mithi/hexapod-kinematics-library) for computations, replacing previous `src/hexapod`.

<p align="center">
    <img src="https://user-images.githubusercontent.com/1670421/103467849-46981980-4d8e-11eb-911e-7cb63282c0c2.gif" alt="drawing" />
</p>

## 🚧 Work In Progress  🚧

❗❗🚜 🚧 👷 🏗️  (Underconstruction, use at your own risk! ) ❗❗🚜 🚧 👷 🏗️

## Updates

-   [`v0.2.0`](https://github.com/mithi/hexapod-irl/tree/socket-io-version) - Replace PubNub with [SocketIO](http://socket.io/). Based on my experiments, PubNub batches messages and isn't _"inrealtime"_ enough. Using SocketIO, the jankiness is significantly reduced.
-   [`v0.1.0`](https://github.com/mithi/hexapod-irl/tree/pubnub-version) - Use [PubNub](https://www.pubnub.com/) to send commands. Janky.

## How to Use (v0.0.2)

1. Never built a hexapod robot before? The [mithi/hexy](https://github.com/mithi/hexy) repository is a great place to start! Includes the BOM!

2. Build your hexapod robot with an [Arduino](http://arduino.cc/)-compatible / [Johnny-five](http://johnny-five.io/) compatible board. I personally used an [Adafruit Metro Mini 328](https://www.adafruit.com/product/2590). Don't forget to flash your board with the recommended standard firmata flavor (see also: [Johnny Five Wiki: Getting Started](https://github.com/rwaldron/johnny-five/wiki/Getting-Started))

3. Update your servo config in [`./src/_SERVO_CONFIG.js`](./src/_SERVO_CONFIG.js). The [Johnny Five documentation, Servo API page](http://johnny-five.io/api/servo/) is your friend!

4. I personally use two pwm pins of my board and one [PCA9685](https://www.adafruit.com/product/815) to drive my eighteen mg996r servos. If you do the same, make sure [you hook it up properly](https://learn.adafruit.com/16-channel-pwm-servo-driver/hooking-it-up)!

5. Inspect and modify the variables in [`./src/_VAR_CONFIG.js`](./src/_VAR_CONFIG.js) as needed.

6. This is how the angle of each servo is transformed [(function)](./src/_TRANSFORM.js) based on my specific physical hexapod robot configuration. Modify this to suit your needs.

7. This is the bare minimum [node script](./src/_ROBOT_SERVER.js) that will talk to your Arduino and the front-end web app / user interface. Modify this to suit your needs.

8. Open two terminal tabs and run the following:

```
$ npm install

# on one terminal tab, this builds and serves the react app
$ npm run prod:client

# on another terminal tab, this runs the johnny-five script
$ npm run run:server
```

Enjoy!
