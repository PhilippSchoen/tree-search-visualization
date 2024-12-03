import {SearchProblem} from "../search-problem";
import {EightPuzzleState} from "./eight-puzzle-state";
import {EightPuzzleNode} from "./eight-puzzle-node";

export class EightPuzzleProblem extends SearchProblem<EightPuzzleState, EightPuzzleNode>{
    constructor(public initialState: EightPuzzleState, public goalState: EightPuzzleState) {
        super();
    }

    createNode(state: EightPuzzleState, goalState: EightPuzzleState = undefined, parent?: EightPuzzleNode): EightPuzzleNode {
        return new EightPuzzleNode(state, goalState, parent);
    }
}