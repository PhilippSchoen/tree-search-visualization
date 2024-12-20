import {SearchProblem} from "../search-problem";
import {Position} from "./position";
import {PathfindingNode} from "./pathfinding-node";

export class PathfindingProblem extends SearchProblem<Position, PathfindingNode> {
    constructor(public initialState: Position, public goalState: Position) {
        super();
    }

    createNode(state: Position, goalState: Position, parent?: PathfindingNode): PathfindingNode {
        return new PathfindingNode(state, goalState, parent);
    }
}