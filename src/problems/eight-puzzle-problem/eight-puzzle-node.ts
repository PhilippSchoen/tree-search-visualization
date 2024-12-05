import {EightPuzzleState} from "./eight-puzzle-state";
import {Node} from "../../tree-search/node";

export class EightPuzzleNode extends Node<EightPuzzleState> {

    constructor(public override state: EightPuzzleState, public override goalState: EightPuzzleState = undefined, public override parent?: EightPuzzleNode, public override cost: number = 1) {
        super(state, goalState, parent, cost);

        if(!goalState) {
            this.goalState = new EightPuzzleState();
            this.goalState.board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        }

        this.heuristic = this.calculateHeuristic();
    }

    expand(): EightPuzzleNode[] {
        const zeroIndex = this.state.board.indexOf(0);
        const childNodes: EightPuzzleNode[] = [];
        const actionIndices = [zeroIndex - 1, zeroIndex + 1, zeroIndex - 3, zeroIndex + 3];
        for(const actionIndex of actionIndices) {
            if(zeroIndex % 3 === 0 && actionIndex === zeroIndex - 1) continue;
            if((zeroIndex + 1) % 3 === 0 && actionIndex === zeroIndex + 1) continue;
            if(actionIndex >= 0 && actionIndex < 9) {
                const newState = new EightPuzzleState();
                newState.board = [...this.state.board];
                newState.board[zeroIndex] = newState.board[actionIndex];
                newState.board[actionIndex] = 0;
                childNodes.push(new EightPuzzleNode(newState, this.goalState, this));
            }
        }
        return childNodes;
    }

    isGoalState(): boolean {
        return this.state.equals(this.goalState);
    }

    printSolution() {
        for(let i = 0; i < this.solution.length; i++) {
            process.stdout.write("_______" + "     ");
        }
        process.stdout.write("\n");

        for(let i = 0; i < this.solution.length; i++) {
            const board = this.solution[i].board;
            process.stdout.write("|" + board[0] + "|" + board[1] + "|" + board[2] + "|" + "     ");
        }
        process.stdout.write("\n");

        for(let i = 0; i < this.solution.length; i++) {
            const board = this.solution[i].board;
            process.stdout.write("|" + board[3] + "|" + board[4] + "|" + board[5] + "|");
            if(i === this.solution.length - 1) {
                process.stdout.write("     ");
            } else {
                process.stdout.write(" --> ");
            }
        }
        process.stdout.write("\n");

        for(let i = 0; i < this.solution.length; i++) {
            const board = this.solution[i].board;
            process.stdout.write("|" + board[6] + "|" + board[7] + "|" + board[8] + "|" + "     ");
        }
        process.stdout.write("\n");

        for(let i = 0; i < this.solution.length; i++) {
            process.stdout.write("-------" + "     ");
        }
        process.stdout.write("\n");

    }

    private calculateHeuristic(): number {
        let heuristic = 0;
        for(let i = 0; i < this.state.board.length; i++) {
            if(this.state.board[i] !== this.goalState.board[i]) {
                heuristic++;
            }
        }
        return heuristic;
    }

}