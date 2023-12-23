import { keyCodes, gameSettings as settings } from '../modules/settings.js'

import { AbstractScreen } from "./abstractScreen.js"
import { Player } from "../modules/player.js"
import { Obstacle } from "../modules/obstacle.js"
import { checkCollisionPlayerObstacle } from "../modules/utils.js"
import { Menu } from "./menu.js"
import { TextComponent } from "../components/text.js"
import { ButtonComponent } from "../components/button.js"
import { RectComponent } from '../components/rect.js'

export class Game extends AbstractScreen {
    constructor(screenManager) {
        super()
        this.screenManager = screenManager
        this.startGame()
    }

    gameRunning() {
        return this.countDown === 0
    }

    startGame() {
        this.components = []

        this.player = new Player()
        this.obstacles = []

        let pos = settings.firstObstaclePosition
        for (let i = 0; i < settings.obstacleQuantity; i++) {
            pos += settings.obstacleDistance
            this.obstacles.push(new Obstacle(pos))
        }

        this.obstacleIndex = 0

        this.lastTime = performance.now()

        this.points = 0

        this.animationCounter = 0
        this.countDown = 3

        this.isGameOver = false

        this.countdownComponent = new TextComponent(
            this.countDown,
            settings.width / 2,
            settings.height / 2,
            64,
            "#fff"
        )

        this.blurComponent = new RectComponent(
            settings.width / 2,
            settings.height / 2,
            settings.width,
            settings.height,
            [0, 0, 0, 100]
        )
    }

    gameOver() {
        this.isGameOver = true

        const gameOverText = new TextComponent(
            "GAME OVER",
            settings.width * .5,
            settings.height * .4,
            64,
            "#fff"
        )
        this.components.push(gameOverText)

        const finalScoreText = new TextComponent(
            "SCORE: " + this.points,
            settings.width * .5,
            settings.height * .55,
            32,
            "#fff"
        )
        this.components.push(finalScoreText)

        const btnPlayAgain = new ButtonComponent(
            330,
            400,
            200,
            60,
            "Play\nAgain", "#fff", "#000")
        btnPlayAgain.onClick = () => this.startGame()
        this.components.push(btnPlayAgain)

        const btnMenu = new ButtonComponent(
            630,
            400,
            200,
            60,
            "Menu", "#000", "#fff")
        btnMenu.onClick = () => this.screenManager.changeScreen(new Menu(this.screenManager))
        this.components.push(btnMenu)

    }

    displayGameOver() {
        this.blurComponent.draw()
        for (let comp of this.components) {
            comp.draw()
        }
    }

    updateGame() {
        if (checkCollisionPlayerObstacle(this.player, this.obstacles[this.obstacleIndex])) {
            if(!this.isGameOver){
                this.gameOver()
            }
            return
        }

        const currentTime = performance.now()
        let deltaTime = (currentTime - this.lastTime) / 1000
        this.lastTime = currentTime

        this.player.update(deltaTime)
        for (let obstacle of this.obstacles) {
            obstacle.update(deltaTime)
        }

        if (this.obstacles[this.obstacleIndex].x < settings.playerPositionX - settings.obstacleWidth / 2 - settings.playerRadius) {
            this.obstacleIndex = (this.obstacleIndex + 1) % settings.obstacleQuantity
            this.points++
        }
    }

    displayGame() {
        background(76)

        fill(0)
        this.player.display()
        for (let obstacle of this.obstacles) {
            obstacle.display()
        }
    }

    displayCountdown() {
        this.blurComponent.draw()
        this.countdownComponent.text = this.countDown
        this.countdownComponent.draw()

        if (++this.animationCounter % settings.animationStepFrames === 0) {
            this.countDown--
        }
    }

    draw() {
        if (this.gameRunning()) {
            this.updateGame()
        }

        this.displayGame()

        if (this.isGameOver) {
            this.displayGameOver()
            return
        }

        if (!this.gameRunning()) {
            this.lastTime = performance.now()
            this.player.stop()
            this.displayCountdown()
        }
    }

    keyPressed() {
        switch (keyCode) {
            case keyCodes.space:
                this.player.jump()
                break
            default:
                break
        }
    }

    mousePressed() {
        for (let comp of this.components) {
            comp.checkClick(mouseX, mouseY)
        }
        this.player.jump()
    }
}