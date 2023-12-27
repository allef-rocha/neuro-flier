import { gameSettings as settings } from '../modules/settings.js'

import { AbstractComponent } from './abstractComponent.js'

export class TextComponent extends AbstractComponent {
    constructor(text, x, y, size, color) {
        super()
        this.text = text
        this.x = x
        this.y = y
        this.size = size
        this.color = color
    }

    getScale() {
        return [
            this.x * settings.scale,
            this.y * settings.scale,
            this.size * settings.scale,
        ]
    }

    draw() {
        const [x, y, size] = this.getScale()
        noStroke()
        fill(this.color)
        textSize(size)
        text(this.text, x, y)
    }
}