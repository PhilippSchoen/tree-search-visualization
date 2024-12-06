import {EightPuzzlePiece} from "./eight-puzzle-piece";
import {State} from "../../tree-search/state";

export class EightPuzzleState implements State {
    board: EightPuzzlePiece[] = [];

    constructor() {
        this.board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        const goal: EightPuzzleState = {board: [1, 2, 3, 4, 5, 6, 7, 8, 0]} as EightPuzzleState;

        // TODO: Unsolvable boards exist, fix
        while(this.equals(goal) || !this.isSolvable()) {
            this.board.sort(() => Math.random() - 0.5);
        }
    }

    equals(state: EightPuzzleState): boolean {
        let matches = 0;
        for(let i = 0; i < this.board.length; i++) {
            if(state?.board[i] === this.board[i]) {
                matches++;
            }
        }
        return matches === state?.board.length;
    }

    toString(): string {
        let str = "";
        for(let i = 0; i < this.board.length; i++) {
            str += this.board[i];
        }
        return str;
    }

    private isSolvable(): boolean {
        let inversionCount = 0;

        for (let i = 0; i < this.board.length; i++) {
            for (let j = i + 1; j < this.board.length; j++) {
                if (this.board[i] !== 0 && this.board[j] !== 0 && this.board[i] > this.board[j]) {
                    inversionCount++;
                }
            }
        }

        // A board is solvable if the number of inversions is even
        return inversionCount % 2 === 0;
    }

}