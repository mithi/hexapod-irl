# Mithi's Hexapod IRL

<p align="center">
    <img src="https://user-images.githubusercontent.com/1670421/103467765-451a2180-4d8d-11eb-8f94-1a23201595b9.gif" alt="drawing" />
</p>

This is a "fork" of the original [Bare-Minimum Hexapod Robot Simulator 2](https://github.com/mithi/hexapod) that is modified to be able to control a real physical hexapod robot, among other things. Note: This also uses the [hexapod-kinematics-library](https://github.com/mithi/hexapod-kinematics-library) for computations, replacing previous `src/hexapod`).

<p align="center">
    <img src="https://user-images.githubusercontent.com/1670421/103467849-46981980-4d8e-11eb-911e-7cb63282c0c2.gif" alt="drawing" />
</p>


❗❗🚜 🚧 👷 🏗️
## Under Heavy Construction 
(Use at your own risk! )
❗❗🚜 🚧 👷 🏗️

## How to Use

1. Never built a hexapod robot before? The [mithi/hexy](https://github.com/mithi/hexy) repository is a great place to start! Included BOM!

2. Build your hexapod robot with an [Arduino](http://arduino.cc/)-compatible / [Johnny-five](http://johnny-five.io/) compatible board. I personally used an [Adafruit Metro Mini 328](https://www.adafruit.com/product/2590). Don't forget to flash your board with the recommended standard firmata flavor (see also: [Johnny Five Wiki: Getting Started](https://github.com/rwaldron/johnny-five/wiki/Getting-Started))

3. Create an account with [PubNub](https://pubnub.com) then update the keys in [`./src/KEYS.js`](https://github.com/mithi/hexapod-irl/blob/dev/src/KEYS.js)

4. Update your servo config in [`./src/SERVO_CONFIG.js`](https://github.com/mithi/hexapod-irl/blob/dev/src/SERVO_CONFIG.js). The [Johnny Five documentation, Servo API page](http://johnny-five.io/api/servo/) is your friend!

5. I personally ise two [PCA9685](https://www.adafruit.com/product/815) to drive my servos. If you do the same, make sure [you hook it up properly](https://learn.adafruit.com/16-channel-pwm-servo-driver/hooking-it-up)!

6. This is how the angle of each servo is transformed [(function)](https://github.com/mithi/hexapod-irl/blob/0d0bb156b7c79b2c7945e9793f6bf11b56866e68/src/App.js#L29) based on my specific hexapod robot configuration. You can modify this to suit your needs.

7. More importantly, also inspect the bare minimum [node script](https://github.com/mithi/hexapod-irl/blob/dev/src/TEST_J52.js) that will talk to your Arduino and the front-end web app / user interface.

8. Open two terminal tabs and run the following:

```
$ npm install

# on one terminal tab

$ npm run build
$ npm install -g serve
$ serve -s build

# on another terminal tab

$ node ./src/TEST_J52.js
```

Enjoy!
