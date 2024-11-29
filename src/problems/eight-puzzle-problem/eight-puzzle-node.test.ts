import {EightPuzzleState} from "./eight-puzzle-state";
import {EightPuzzlePiece} from "./eight-puzzle-piece";
import {EightPuzzleNode} from "./eight-puzzle-node";

describe('EightPuzzleNode', () => {
    test('isGoalState should return true if board is goal', () => {
        const state = new EightPuzzleState();
        state.board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        const node = new EightPuzzleNode(state);
        expect(node.isGoalState()).toBe(true);
    });

    test('isGoalState should return false if board is not goal', () => {
        const state = new EightPuzzleState();
        state.board = [4, 7, 5, 3, 1, 8, 2, 6, 0];
        const node = new EightPuzzleNode(state);
        expect(node.isGoalState()).toBe(false);
    });

    test('isGoalState should return false if goal state is undefined', () => {
        const state = new EightPuzzleState();
        state.board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        const node = new EightPuzzleNode(state);
        node.goalState = undefined;
        expect(node.isGoalState()).toBe(false);
    });

    test('Expanding while 0 is in the center should return the correct 4 nodes', () => {
        const state = new EightPuzzleState();
        state.board = [1, 2, 3, 4, 0, 5, 6, 7, 8];
        const node = new EightPuzzleNode(state);
        const childNodes = node.expand();
        expect(childNodes.length).toBe(4);

        const resultingStates = setupStates([
            [1, 0, 3, 4, 2, 5, 6, 7, 8],
            [1, 2, 3, 0, 4, 5, 6, 7, 8],
            [1, 2, 3, 4, 5, 0, 6, 7, 8],
            [1, 2, 3, 4, 7, 5, 6, 0, 8],
        ]);

        let childNode = childNodes.find(node => node.state.equals(resultingStates[0]));
        expect(childNode).toBeDefined();
        childNode = childNodes.find(node => node.state.equals(resultingStates[1]));
        expect(childNode).toBeDefined();
        childNode = childNodes.find(node => node.state.equals(resultingStates[2]));
        expect(childNode).toBeDefined();
        childNode = childNodes.find(node => node.state.equals(resultingStates[3]));
        expect(childNode).toBeDefined();
    });

    test('Expanding while 0 is in the top left corner should return the correct 2 nodes', () => {
        const state = new EightPuzzleState();
        state.board = [0, 1, 3, 4, 2, 5, 6, 7, 8];
        const node = new EightPuzzleNode(state);
        const childNodes = node.expand();

        const resultingStates = setupStates([
            [1, 0, 3, 4, 2, 5, 6, 7, 8],
            [4, 1, 3, 0, 2, 5, 6, 7, 8],
        ]);

        expect(childNodes.length).toBe(2);
        let childNode = childNodes.find(node => node.state.equals(resultingStates[0]));
        expect(childNode).toBeDefined();
        childNode = childNodes.find(node => node.state.equals(resultingStates[1]));
        expect(childNode).toBeDefined();
    });

    test('Expanding while 0 is in the middle right should return the correct 3 nodes', () => {
        const state = new EightPuzzleState();
        state.board = [1, 2, 3, 4, 5, 0, 6, 7, 8];
        const node = new EightPuzzleNode(state);
        const childNodes = node.expand();

        const resultingStates = setupStates([
            [1, 2, 3, 4, 5, 8, 6, 7, 0],
            [1, 2, 3, 4, 0, 5, 6, 7, 8],
            [1, 2, 0, 4, 5, 3, 6, 7, 8],
        ]);

        expect(childNodes.length).toBe(3);
        let childNode = childNodes.find(node => node.state.equals(resultingStates[0]));
        expect(childNode).toBeDefined();
        childNode = childNodes.find(node => node.state.equals(resultingStates[1]));
        expect(childNode).toBeDefined();
        childNode = childNodes.find(node => node.state.equals(resultingStates[2]));
        expect(childNode).toBeDefined();
    });
});

function setupStates(boards: EightPuzzlePiece[][]): EightPuzzleState[] {
    const states: EightPuzzleState[] = [];
    for(let i = 0; i < boards.length; i++) {
        const state = new EightPuzzleState();
        state.board = boards[i];
        states.push(state);
    }
    return states;
}