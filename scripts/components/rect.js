import { gameSettings as settings } from '../modules/settings.js'

import { AbstractComponent } from './abstractComponent.js'

export class RectComponent extends AbstractComponent {
    constructor(x, y, w, h, color) {
        super()
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }

    getScale() {
        return [
            this.x * settings.scale,
            this.y * settings.scale,
            this.w * settings.scale,
            this.h * settings.scale,
        ]
    }

    draw() {
        const [x, y, w, h] = this.getScale()
        noStroke()
        fill(this.color)
        rect(x, y, w, h)
    }
}