import { gameSettings } from '../modules/settings.js'

import { AbstractScreen } from './abstractScreen.js'
import { ButtonComponent } from '../components/button.js'
import { Game } from './game.js'
import { AI } from './ai.js'

export class Menu extends AbstractScreen {
    constructor(screenManager) {
        super()
        this.screenManager = screenManager

        this.components = []

        const btnJogar = new ButtonComponent(
            300,
            400,
            210,
            100,
            "Play", "#fff", "#000")

        btnJogar.onClick = () => this.screenManager.changeScreen(new Game(screenManager))
        this.components.push(btnJogar)

        const btnAI = new ButtonComponent(
            660,
            400,
            210,
            100,
            "AI", "#000", "#fff")

        btnAI.onClick = () => this.screenManager.changeScreen(new AI(screenManager))
        this.components.push(btnAI)
    }

    draw() {
        background(0)
        for (let comp of this.components) {
            comp.draw()
        }
    }

    mousePressed() {
        for (let comp of this.components) {
            comp.checkClick(mouseX, mouseY)
        }
    }
}