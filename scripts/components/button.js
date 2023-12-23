import { gameSettings as settings } from '../modules/settings.js'

import { AbstractComponent } from './abstractComponent.js'

export class ButtonComponent extends AbstractComponent {
    constructor(x, y, w, h, txt, fillColor, strokeColor) {
        super()
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.txt = txt
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.textSize = h * .4
    }

    getScale() {
        return [this.x * settings.scale,
        this.y * settings.scale,
        this.w * settings.scale,
        this.h * settings.scale]
    }

    draw() {
        const hover = this.isHovered(mouseX, mouseY)
        if (hover) {
            stroke(this.fillColor)
            fill(this.strokeColor)
        } else {
            stroke(this.strokeColor)
            fill(this.fillColor)
        }
        const [x, y, w, h] = this.getScale()
        rect(x, y, w, h, h)

        noStroke()
        hover ? fill(this.fillColor) : fill(this.strokeColor)
        textSize(this.textSize * settings.scale)
        text(this.txt, x, y)
    }

    isHovered(mx, my) {
        const [x, y, w, h] = this.getScale()
        return (
            mx >= x - w / 2 &&
            mx <= x + w / 2 &&
            my >= y - h / 2 &&
            my <= y + h / 2
        )
    }

    checkClick(mx, my) {
        if (this.isHovered(mx, my)) {
            this.onClick()
        }
    }
}