export class AbstractScreen {
    constructor() {
        if (new.target === AbstractScreen) {
            throw new Error('Cannot instantiate abstract class')
        }
    }

    setup() { }

    draw() {
        throw new Error('Method draw() must be implemented')
    }

    mousePressed() { }
    keyPressed() { }
}