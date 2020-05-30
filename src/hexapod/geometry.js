import {
    sin,
    cos,
    unit,
    matrix,
    multiply,
    transpose,
    identity,
    concat,
    dotMultiply,
    ones,
    add,
} from "mathjs"
import Vector from "./Vector"

function getSinCos(theta) {
    return [sin(unit(theta, "deg")), cos(unit(theta, "deg"))]
}

function tRotXmatrix(theta, tx = 0, ty = 0, tz = 0) {
    const [s, c] = getSinCos(theta)
    return matrix([
        [1, 0, 0, tx],
        [0, c, -s, ty],
        [0, s, c, tz],
        [0, 0, 0, 1],
    ])
}

function tRotYmatrix(theta, tx = 0, ty = 0, tz = 0) {
    const [s, c] = getSinCos(theta)
    return matrix([
        [c, 0, s, tx],
        [0, 1, 0, ty],
        [-s, 0, c, tz],
        [0, 0, 0, 1],
    ])
}

function tRotZmatrix(theta, tx = 0, ty = 0, tz = 0) {
    const [s, c] = getSinCos(theta)
    return matrix([
        [c, -s, 0, tx],
        [s, c, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1],
    ])
}

const cross = (a, b) => {
    const x = a.y * b.z - a.z * b.y
    const y = a.z * b.x - a.x * b.z
    const z = a.x * b.y - a.y * b.x
    return new Vector(x, y, z)
}

const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z

const vectorFromTo = (a, b) => new Vector(b.x - a.x, b.y - a.y, b.z - a.z)

const scaleVector = (v, d) => new Vector(d * v.x, d * v.y, d * v.z)

const vectorLength = v => Math.sqrt(dot(v, v))

const getNormalofThreePoints = (a, b, c) => {
    const ab = vectorFromTo(a, b)
    const ac = vectorFromTo(a, c)
    const n = cross(ab, ac)
    const len_n = vectorLength(n)
    const unit_n = scaleVector(n, 1 / len_n)

    return unit_n
}

const skew = p =>
    matrix([
        [0, -p.z, p.y],
        [p.z, 0, -p.x],
        [-p.y, p.x, 0],
    ])

// https://math.stackexchange.com/questions/180418/
// calculate-rotation-matrix-to-align-vector-a-to-vector-b-in-3d
const matrixToAlignVectorAtoB = (a, b) => {
    const v = cross(a, b)
    const s = vectorLength(v)
    // When angle between a and b is zero or 180 degrees
    // cross product is 0, R = I
    if (s === 0) {
        return identity(4)
    }

    const c = dot(a, b)
    const vx = skew(v)
    const d = (1 - c) / (s * s)
    const vx2 = multiply(vx, vx)
    const dvx2 = dotMultiply(vx2, multiply(ones(3, 3), d))
    const r = add(add(identity(3), vx), dvx2)
    const r_ = concat(r, [[0, 0, 0]], 0)
    const transformMatrix = concat(r_, transpose([[0, 0, 0, 1]]), 1)
    return transformMatrix
}

export {
    tRotXmatrix,
    tRotYmatrix,
    tRotZmatrix,
    matrixToAlignVectorAtoB,
    dot,
    cross,
    skew,
    getNormalofThreePoints,
    scaleVector,
    vectorFromTo,
    vectorLength,
    Vector,
}