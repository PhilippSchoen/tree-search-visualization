import {State} from "../../tree-search/state";

export class Position implements State {
    constructor(public x: number, public y: number) {
    }

    equals(state: Position): boolean {
        return (this.x === state?.x && this.y === state?.y);
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}