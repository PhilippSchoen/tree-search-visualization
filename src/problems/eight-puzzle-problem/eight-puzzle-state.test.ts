import {EightPuzzleState} from "./eight-puzzle-state";
import {EightPuzzlePiece} from "./eight-puzzle-piece";

describe('EightPuzzleState', () => {
    test('Creating a new state should mix up the board to something other than a completed board', () => {
        const state = new EightPuzzleState();
        const completedBoard: EightPuzzlePiece[] = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        expect(state.board).not.toEqual(completedBoard);
    });

    test('Creating multiple states should result in different boards', () => {
        const state1 = new EightPuzzleState();
        const state2 = new EightPuzzleState();
        expect(state1.board).not.toEqual(state2.board);
    });

    test('equals should return true if board is goal', () => {
        const state = new EightPuzzleState();
        state.board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        const completedBoard: EightPuzzlePiece[] = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        expect(state.equals({board: completedBoard} as EightPuzzleState)).toBe(true);
    });

    test('equals should return false if board is not goal', () => {
        const state = new EightPuzzleState();
        state.board = [5, 4, 6, 2, 1, 3, 0, 7, 8];
        const completedBoard: EightPuzzlePiece[] = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        expect(state.equals({board: completedBoard} as EightPuzzleState)).toBe(false);
    });

    test('equals should return false if goal state is undefined', () => {
       const state = new EightPuzzleState();
       state.board = [5, 4, 6, 2, 1, 3, 0, 7, 8];
       expect(state.equals(undefined)).toBe(false);
    });
});