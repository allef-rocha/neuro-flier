import * as Constant from '../modules/settings.js'
import { AbstractScreen } from './abstractScreen.js'

export class AI extends AbstractScreen {
    constructor() {
        super()
    }

    draw() {
        background(0)
        fill(255)
        textSize(20)
        text('Nome do Jogo', Constant.SCREEN_WIDTH_SCALED / 2, Constant.SCREEN_HEIGHT_SCALED / 2)
    }
}