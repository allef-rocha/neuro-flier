import { gameSettings as settings } from './settings.js'

import { Rectangle } from "./utils.js"

export class Obstacle {
    constructor(x) {
        const gap = random(settings.obstacleGapMinPos, settings.obstacleGapMaxPos)
        this.x = x
        this.upperObstacle = new Rectangle(
            x - settings.obstacleWidth / 2,
            0,
            x + settings.obstacleWidth / 2,
            gap - settings.obstacleGapSize / 2
        )
        this.lowerObstacle = new Rectangle(
            x - settings.obstacleWidth / 2,
            gap + settings.obstacleGapSize / 2,
            x + settings.obstacleWidth / 2,
            settings.height
        )
    }

    update(dt) {
        let delta

        if (this.x < settings.obstacleLeftLimit) {
            delta = settings.obstacleQuantity * settings.obstacleDistance
            this.x += delta
            this.upperObstacle.move(delta)
            this.lowerObstacle.move(delta)

        }
        delta = dt * settings.obstacleSpeedX
        this.x -= delta
        this.upperObstacle.move(-delta)
        this.lowerObstacle.move(-delta)

    }

    display() {
        this.upperObstacle.display()
        this.lowerObstacle.display()
    }

}