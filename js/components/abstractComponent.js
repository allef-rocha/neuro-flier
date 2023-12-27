export class AbstractComponent {
    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error('Cannot instantiate abstract class')
        }
    }

    draw() {
        throw new Error('Method draw() must be implemented')
    }

    checkClick() { }
}