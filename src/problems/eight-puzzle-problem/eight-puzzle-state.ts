import {EightPuzzlePiece} from "./eight-puzzle-piece";

export class EightPuzzleState {
    board: EightPuzzlePiece[] = [];

    constructor() {
        const pieces: EightPuzzlePiece[] = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        while(pieces === [1, 2, 3, 4, 5, 6, 7, 8, 0]) {
            pieces.sort(() => Math.random() - 0.5);
        }
        this.board = pieces;
    }
}