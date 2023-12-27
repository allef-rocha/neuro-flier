const gameSettings = {
    scale: 1,
    width: 960,
    height: 540,

    playerPositionX: 100,
    playerRadius: 20,
    playerJumpForce: 500,
    playerJumpRecovery: 0.3,
    playerTerminalVelocity: 1000,
    gravity: 30,
    firstObstaclePosition: 100,
    obstacleQuantity: 4,
    obstacleDistance: 400,
    obstacleWidth: 50,
    obstacleGapMinPos: 140,
    obstacleGapMaxPos: 400,
    obstacleGapSize: 130,
    obstacleSpeedX: 200,
    obstacleLeftLimit: -600,
    animationStepFrames: 60
}

const keyCodes = {
    space: 32
}

function updateScale() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const newScale = Math.min(screenWidth / gameSettings.width, screenHeight / gameSettings.height)
    gameSettings.scale = newScale
}

export {
    gameSettings,
    keyCodes,
    updateScale
}