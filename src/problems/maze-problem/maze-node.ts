import {Node} from "../../tree-search/node";
import {MazeState} from "./maze-state";
import {MazeBlock} from "./maze-block";

export class MazeNode extends Node<MazeState> {

    constructor(public override state: MazeState, public override goalState: MazeState = undefined, public override parent?: MazeNode, public override cost: number = 1) {
        super(state, goalState, parent, cost);

        if(!goalState) {
            for(let i = 0; i < state.maze.blocks.length; i++) {
                for(let j = 0; j < state.maze.blocks[i].length; j++) {
                    if(state.maze.blocks[j][i] === MazeBlock.Goal) {
                        this.goalState = new MazeState(i, j, state.maze);
                        break;
                    }
                }
                if(this.goalState) break;
            }
        }

        this.heuristic = this.calculateHeuristic();
    }

    expand(): Node<MazeState>[] {
        const up = new MazeState(this.state.x, this.state.y - 1, this.state.maze);
        const down = new MazeState(this.state.x, this.state.y + 1, this.state.maze);
        const left = new MazeState(this.state.x - 1, this.state.y, this.state.maze);
        const right = new MazeState(this.state.x + 1, this.state.y, this.state.maze);
        const children: MazeNode[] = [];

        if(this.state.maze.blocks[this.state.y][this.state.x - 1] !== MazeBlock.Barrier) {
            children.push(new MazeNode(left, this.goalState, this));
        }
        if(this.state.maze.blocks[this.state.y][this.state.x + 1] !== MazeBlock.Barrier) {
            children.push(new MazeNode(right, this.goalState, this));
        }
        if(this.state.maze.blocks[this.state.y - 1][this.state.x] !== MazeBlock.Barrier) {
            children.push(new MazeNode(up, this.goalState, this));
        }
        if(this.state.maze.blocks[this.state.y + 1][this.state.x] !== MazeBlock.Barrier) {
            children.push(new MazeNode(down, this.goalState, this));
        }

        return children;
    }

    isGoalState(): boolean {
        return this.state.equals(this.goalState);
    }

    printSolution(): void {
        console.log("Imagine a maze here...");
    }

    private calculateHeuristic(): number {
        return Math.abs(this.state.x - this.goalState.x) + Math.abs(this.state.y - this.goalState.y);
    }

}