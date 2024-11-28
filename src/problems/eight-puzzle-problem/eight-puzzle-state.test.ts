import {EightPuzzleState} from "./eight-puzzle-state";

describe('EightPuzzleState', () => {
    test('Creating a new state should mix up the board to something other than a completed board', () => {
        const state = new EightPuzzleState();
        const completedBoard = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        expect(state.board).not.toEqual(completedBoard);
    });

    test('Creating multiple states should result in different boards', () => {
        const state1 = new EightPuzzleState();
        const state2 = new EightPuzzleState();
        const state3 = new EightPuzzleState();
        expect(state1.board).not.toEqual(state2.board);
    });
});