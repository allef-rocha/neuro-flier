export class ScreenManager {
    constructor() {
        this.currentScreen = null
    }

    changeScreen(newScreen) {
        this.currentScreen = newScreen
    }

    draw() {
        this.currentScreen.draw()
    }

    mousePressed() {
        this.currentScreen.mousePressed()
    }

    keyPressed() {
        this.currentScreen.keyPressed()
    }
}