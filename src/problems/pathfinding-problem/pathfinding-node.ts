import {Position} from "./position";
import {Node} from "../../tree-search/node";

export class PathfindingNode extends Node<Position> {

    constructor(public position: Position, public parent?: PathfindingNode, public cost: number = 0) {
        super(position, parent, cost);
    }

    expand(): PathfindingNode[] {
        const up = new Position(this.position.x, this.position.y - 1);
        const down = new Position(this.position.x, this.position.y + 1);
        const left = new Position(this.position.x - 1, this.position.y);
        const right = new Position(this.position.x + 1, this.position.y);
        return [
            new PathfindingNode(up, this), new PathfindingNode(down, this),
            new PathfindingNode(left, this), new PathfindingNode(right, this)
        ];
    }

    isGoalState(goal: Position): boolean {
        return this.position.equals(goal);
    }

    printSolution(): void {
        const positions = this.solution.map(position => `(${position.x}, ${position.y})`);
        console.log(this.constructor.name + " solution: ", positions.join(" -> "), "\n");
    }
}