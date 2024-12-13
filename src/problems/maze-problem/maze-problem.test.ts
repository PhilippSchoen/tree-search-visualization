import {Maze} from "./maze";
import {MazeNode} from "./maze-node";
import {MazeState} from "./maze-state";
import {MazeProblem} from "./maze-problem";

describe('MazeProblem', () => {
    test('MazeProblem should automatically set the goal state if not provided', () => {
        const blocks = [[2, 1, 1], [1, 1, 1], [1, 1, 3]];
        const maze = new Maze(5);
        maze.blocks = blocks;
        const problem = new MazeProblem(new MazeState(0, 0, maze));
        expect(problem.goalState.x).toEqual(2);
        expect(problem.goalState.y).toEqual(2);
    });
});