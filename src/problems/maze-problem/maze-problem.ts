import {SearchProblem} from "../search-problem";
import {MazeState} from "./maze-state";
import {MazeNode} from "./maze-node";
import {MazeBlock} from "./maze-block";

export class MazeProblem extends SearchProblem<MazeState, MazeNode> {

    constructor(public initialState: MazeState, public goalState: MazeState = undefined) {
        super();

        if(!goalState) {
            for(let i = 0; i < initialState.maze.blocks.length; i++) {
                for(let j = 0; j < initialState.maze.blocks[i].length; j++) {
                    if(initialState.maze.blocks[j][i] === MazeBlock.Goal) {
                        this.goalState = new MazeState(i, j, initialState.maze);
                        break;
                    }
                }
                if(this.goalState) break;
            }
        }
    }

    createNode(state: MazeState, goalState: MazeState, parent: MazeNode): MazeNode {
        return new MazeNode(state, goalState, parent);
    }
}