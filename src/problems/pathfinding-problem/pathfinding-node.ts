import {Position} from "./position";
import {Node} from "../../tree-search/node";

export class PathfindingNode extends Node<Position> {

    constructor(public position: Position, public goalState: Position, public parent?: PathfindingNode, public cost: number = 0, public heuristic: number = 0) {
        super(position, goalState, parent, cost, heuristic);
        this.heuristic = this.calculateHeuristic();
    }

    expand(): PathfindingNode[] {
        const up = new Position(this.position.x, this.position.y - 1);
        const down = new Position(this.position.x, this.position.y + 1);
        const left = new Position(this.position.x - 1, this.position.y);
        const right = new Position(this.position.x + 1, this.position.y);
        return [
            new PathfindingNode(up, this.goalState, this), new PathfindingNode(down, this.goalState, this),
            new PathfindingNode(left, this.goalState, this), new PathfindingNode(right, this.goalState, this)
        ];
    }

    isGoalState(): boolean {
        return this.position.equals(this.goalState);
    }

    printSolution(): void {
        const positions = this.solution.map(position => `(${position.x}, ${position.y})`);
        console.log(this.constructor.name + " solution: ", positions.join(" -> "), "\n");
    }

    private calculateHeuristic(): number {
        return Math.abs(this.position.x - this.goalState?.x) + Math.abs(this.position.y - this.goalState?.y);
    }
}