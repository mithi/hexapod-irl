Various example scripts for controlling servos with [Johnny-Five](https://www.pubnub.com/) and [PubNub](https://www.pubnub.com/), among other things.

These are scripts to help set up a hexapod robot that uses two [PCA9685](https://www.adafruit.com/product/815) servo drivers and an Arduino board. The goal is to be able to use react apps or node js apps to control the servos of that hexapod robot.

## Preliminaries

-   [Upload `StandardFirmata`](https://www.instructables.com/Arduino-Installing-Standard-Firmata/) to your Arduino compatible board board
-   [Hookup your servos and servo driver](https://learn.adafruit.com/adafruit-16-channel-servo-driver-with-raspberry-pi/hooking-it-up)
-   Signup and get your api keys from [pubnub.com](https://pubnub.com)
-   Write your `subscribeKey` and `publishKey` in `scripts/utils.js`
-   Install all packages with `npm install`

# 1. Test the hexapod robot

Edit `node index.js` to set the `address` and `pin` for each of the 18 servos.
Running the script below should one by one center each servo until the hexapod is at its default initial position.

```
node index.js
```

# 2. Test One Servo

Kill the process running `node index.js`
The script below listens to the channel `hello_world` for a `message` object with a key of `degrees`.
If `degrees` is a number between `1` and `180` it will rotate the servo to that position.

```
node scripts/node-johnny-servo.js
```

# 3. Send servo command with command prompt

Assuming on one tab have `node-johnny-servo` running, on another terminal tab run

```
node scripts/node-raw-input-servo.js
```

The script above will ask you to enter a number between `1` and `180`
which it will publish to the channel `hello_world`. Since the script `node-johnny-servo` is subscribed to this channel, it will receive this message and set that one servo to the commanded position

# 4. Send servo command from a react app

Assuming on one tab have `node-johnny-servo` running, launch the react app on another tab with

```
npm run dev:client
```

Open

```
http://localhost:1234/
```

Where you will see an input field which you can put a number between 1 and 180.
Once you click the submit button, it will publish this to the channel `hello_world` and
the script `node-johnny-servo` is subscribed to this channel, it will receive this message and set that one servo to the commanded position.

# Other tests

Checkout `scripts/README` for other sample programs you can run.
