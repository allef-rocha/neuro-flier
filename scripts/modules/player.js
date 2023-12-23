import { gameSettings as settings } from './settings.js'

export class Player {
    constructor() {
        this.x = settings.playerPositionX
        this.y = settings.height / 2
        this.r = settings.playerRadius
        this.speed = 0
    }

    stop() {
        this.speed = 0
    }

    jump() {
        if (this.speed < -settings.playerJumpForce * settings.playerJumpRecovery) {
            return
        }
        this.speed = -settings.playerJumpForce
    }

    update(dt) {
        this.y += dt * this.speed

        if (this.y + settings.playerRadius > settings.height) {
            this.y = settings.height - settings.playerRadius
            this.speed = 0
        } else if (this.y - settings.playerRadius < 0) {
            this.y = settings.playerRadius
            this.speed = 0
        }

        let speed = this.speed + settings.gravity
        if (speed > settings.playerTerminalVelocity) {
            speed = settings.playerTerminalVelocity
        } else if (speed < -settings.playerTerminalVelocity) {
            speed = -settings.playerTerminalVelocity
        }
        this.speed = speed
    }

    display() {
        circle(this.x * settings.scale, this.y * settings.scale, 2 * this.r * settings.scale)
    }

}