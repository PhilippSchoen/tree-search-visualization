import {State} from "../../tree-search/state";
import {Maze} from "./maze";

export class MazeState implements State {

    maze: Maze;

    constructor(public x: number, public y: number, maze?: Maze) {
        this.maze = maze ?? new Maze();
    }

    equals(state: MazeState): boolean {
        return this.x === state.x && this.y === state.y;
    }
}