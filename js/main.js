import { updateScale, gameSettings as settings } from './modules/settings.js'
import { Menu } from './screens/menuScreen.js'
import { ScreenManager } from './screens/screenManager.js'

let screenManager
let menuScreen

let font

function preload() {
    font = loadFont('../assets/fonts/PressStart2P.ttf')
}

function setup() {
    frameRate(60)
    textFont(font)
    let canvas = createCanvas(settings.width * settings.scale, settings.height * settings.scale)
    canvas.parent('canvas-container')

    rectMode(CENTER)
    textAlign(CENTER, CENTER)

    window.addEventListener("orientationchange", checkOrientationAndResize)
    window.addEventListener('resize', checkOrientationAndResize)
    checkOrientationAndResize()

    screenManager = new ScreenManager()
    menuScreen = new Menu(screenManager)
    screenManager.changeScreen(menuScreen)
}

function draw() {
    screenManager.draw()
}

function mousePressed() {
    screenManager.mousePressed()
}

function keyPressed() {
    screenManager.keyPressed()
}

function checkOrientationAndResize() {
    updateScale()
    resizeCanvas(settings.width * settings.scale, settings.height * settings.scale)
    switch (screen.orientation.type) {
        case "landscape-primary":
        case "landscape-secondary":
            showRotateDeviceMessage(false)
            break
        case "portrait-secondary":
        case "portrait-primary":
            showRotateDeviceMessage(true)
            break
        default:
            console.log("The orientation API isn't supported in this browser :(")
    }

    function showRotateDeviceMessage(show) {
        if (show) {
            document.getElementById("rotate-device-message").style.display = "flex"
            document.getElementById("canvas-container").style.display = "none"
        } else {
            document.getElementById("rotate-device-message").style.display = "none"
            document.getElementById("canvas-container").style.display = "block"
        }
    }
}

window.preload = preload
window.setup = setup
window.draw = draw
window.mousePressed = mousePressed
window.keyPressed = keyPressed