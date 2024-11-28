import {EightPuzzleState} from "./eight-puzzle-state";
import {Node} from "../../tree-search/node";

export class EightPuzzleNode extends Node<EightPuzzleState> {

    constructor(public state: EightPuzzleState, public parent?: EightPuzzleNode, public cost: number = 0) {
        super(state, parent, cost);
    }

    expand(): EightPuzzleNode[] {
        return [];
    }

    isGoalState(goal: EightPuzzleState): boolean {
        return this.state.board === goal?.board;
    }

    printSolution() {
    }

}