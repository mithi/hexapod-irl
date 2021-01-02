# Mithi's Hexapod IRL

## 🚜 🚧 👷 🏗️ ❗❗Under Construction ❗❗🚜 🚧 👷 🏗️

This is a "fork" of the original [Bare-Minimum Hexapod Robot Simulator 2](https://github.com/mithi/hexapod) that will be heavily modified to be able to control a real physical hexapod robot.

## Changes

### Major changes

-   Use `hexapod-kinematics-library` for computations
-   Refactor `App` component from class component to function component
-   Add function transform pose wrt to physical servo parameters
-   Modify `App` component to broadcast pose to the world via pubnub
-   Code to run on a physical robot (`johnny-five` script)

### Other Minor changes

-   Remove tests and test related files
-   Remove google analytics
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
