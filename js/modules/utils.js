import { gameSettings as settings } from './settings.js'


export class Rectangle {
    constructor(x1, y1, x2, y2) {
        this.x = (x1 + x2) / 2
        this.y = (y1 + y2) / 2
        this.w = abs(x2 - x1)
        this.h = abs(y2 - y1)
    }

    move(delta) {
        this.x += delta
    }

    display() {
        rect(
            this.x * settings.scale,
            this.y * settings.scale,
            this.w * settings.scale,
            this.h * settings.scale,
        )
    }
}

export function checkCollisionPlayerObstacle(player, obstacle) {
    return circleUpperRectCollision(player, obstacle.upperObstacle)
        || circleLowerRectCollision(player, obstacle.lowerObstacle)
}

function commonCircleRectCollision(circle, rect) {
    let distX = abs(circle.x - rect.x)
    let distY = abs(circle.y - rect.y)

    if (distX >= circle.r + rect.w / 2) return false
    if (distY >= circle.r + rect.h / 2) return false

    if (distX < rect.w / 2) return true
    if (distY < rect.h / 2) return true

    return null
}

function distanceSq(p1, p2) {
    let deltaX = p1.x - p2.x
    let deltaY = p1.y - p2.y
    return deltaX * deltaX + deltaY * deltaY
}

function circlePointCollision(circle, point) {
    return distanceSq(circle, point) < circle.r * circle.r
}

function circleUpperRectCollision(circle, rect) {
    let simpleCollision = commonCircleRectCollision(circle, rect)
    if (simpleCollision !== null) {
        return simpleCollision
    }

    let leftCorner = {
        x: rect.x - rect.w / 2,
        y: rect.y + rect.h / 2,
    }
    let rightCorner = {
        x: rect.x + rect.w / 2,
        y: rect.y + rect.h / 2,
    }
    return circlePointCollision(circle, leftCorner)
        || circlePointCollision(circle, rightCorner)
}

function circleLowerRectCollision(circle, rect) {
    let simpleCollision = commonCircleRectCollision(circle, rect)
    if (simpleCollision !== null) {
        return simpleCollision
    }

    let leftCorner = {
        x: rect.x - rect.w / 2,
        y: rect.y - rect.h / 2,
    }
    let rightCorner = {
        x: rect.x + rect.w / 2,
        y: rect.y - rect.h / 2,
    }
    return circlePointCollision(circle, leftCorner)
        || circlePointCollision(circle, rightCorner)
}