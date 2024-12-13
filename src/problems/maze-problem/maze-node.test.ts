import {Maze} from "./maze";
import {MazeNode} from "./maze-node";
import {MazeState} from "./maze-state";
import {MazeBlock} from "./maze-block";

describe('MazeNode', () => {
   test('MazeNode should automatically set the goal state if not provided', () => {
       const blocks = [[2, 1, 1], [1, 1, 1], [1, 1, 3]];
       const maze = new Maze(5);
       maze.blocks = blocks;
       const node = new MazeNode(new MazeState(0, 0, maze));
       expect(node.goalState.x).toEqual(2);
       expect(node.goalState.y).toEqual(2);
    });

   test('isGoalState should return true if the state is the goal state', () => {
       const blocks = [[2, 1, 1], [1, 1, 1], [1, 1, 3]];
       const maze = new Maze(5);
       maze.blocks = blocks;
       const state = new MazeState(2, 2, maze);
       expect(new MazeNode(state).isGoalState()).toBeTruthy();
   });

   test('isGoalState should return false if the state is not the goal state', () => {
       const blocks = [[2, 1, 1], [1, 1, 1], [1, 1, 3]];
       const maze = new Maze(5);
       maze.blocks = blocks;
       const state = new MazeState(1, 2, maze);
       expect(new MazeNode(state).isGoalState()).toBeFalsy();
   });

   test('Expand should return 4 children if the state has no surrounding walls', () => {
       const blocks = [[MazeBlock.Start, MazeBlock.Empty, MazeBlock.Empty], [MazeBlock.Empty, MazeBlock.Empty, MazeBlock.Empty], [MazeBlock.Empty, MazeBlock.Empty, MazeBlock.Goal]];
       const maze = new Maze(5);
       maze.blocks = blocks;
       const state = new MazeState(1, 1, maze);
       const children = new MazeNode(state).expand();

       expect(children.length).toBe(4);

       const up = children.find(child => child.state.x === 1 && child.state.y === 0);
       expect(up).toBeDefined();
       const down = children.find(child => child.state.x === 1 && child.state.y === 2);
       expect(down).toBeDefined();
       const left = children.find(child => child.state.x === 0 && child.state.y === 1);
       expect(left).toBeDefined();
       const right = children.find(child => child.state.x === 2 && child.state.y === 1);
       expect(right).toBeDefined();
   });

   test('Expand should return no children if the state is surrounded by walls', () => {
       const blocks = [[MazeBlock.Goal, MazeBlock.Barrier, MazeBlock.Barrier], [MazeBlock.Barrier, MazeBlock.Start, MazeBlock.Barrier], [MazeBlock.Barrier, MazeBlock.Barrier, MazeBlock.Empty]];
       const maze = new Maze(5);
       maze.blocks = blocks;
       const state = new MazeState(1, 1, maze);

       const children = new MazeNode(state).expand();
       expect(children.length).toBe(0);
   });

   test('Expand should return 2 children if the state has walls on the top and bottom', () => {
       const blocks = [[MazeBlock.Empty, MazeBlock.Barrier, MazeBlock.Barrier], [MazeBlock.Empty, MazeBlock.Start, MazeBlock.Goal], [MazeBlock.Barrier, MazeBlock.Barrier, MazeBlock.Empty]];
       const maze = new Maze(5);
       maze.blocks = blocks;
       const state = new MazeState(1, 1, maze);
       const children = new MazeNode(state).expand();

       expect(children.length).toBe(2);
       const left = children.find(child => child.state.x === 0 && child.state.y === 1);
       expect(left).toBeDefined();
       const right = children.find(child => child.state.x === 2 && child.state.y === 1);
       expect(right).toBeDefined();
   });

   test('Expand should return 1 children if the state has a wall everywhere but the bottom', () => {
       const blocks = [[MazeBlock.Start, MazeBlock.Barrier, MazeBlock.Barrier], [MazeBlock.Barrier, MazeBlock.Empty, MazeBlock.Barrier], [MazeBlock.Empty, MazeBlock.Empty, MazeBlock.Goal]];
       const maze = new Maze(5);
       maze.blocks = blocks;
       const state = new MazeState(1, 1, maze);
       const children = new MazeNode(state).expand();
       expect(children.length).toBe(1);
       const down = children.find(child => child.state.x === 1 && child.state.y === 2);
       expect(down).toBeDefined();
   });

   test('Expand should work on larger mazes', () => {
      const blocks = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 2, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 1, 0],
        [0, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 3, 1, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ];
       const maze = new Maze(8);
       maze.blocks = blocks;
       const state = new MazeState(1, 3, maze);
       const children = new MazeNode(state).expand();
       expect(children.length).toBe(2);
       const up = children.find(child => child.state.x === 1 && child.state.y === 2);
       expect(up).toBeDefined();
       const down = children.find(child => child.state.x === 1 && child.state.y === 4);
       expect(down).toBeDefined();
   });

   test('Expand should work on children nodes', () => {
       const blocks = [
           [0, 0, 0, 0, 0, 0, 0],
           [0, 2, 1, 1, 1, 1, 0],
           [0, 1, 0, 0, 1, 1, 0],
           [0, 1, 0, 1, 1, 1, 0],
           [0, 1, 1, 1, 3, 1, 0],
           [0, 1, 1, 0, 1, 1, 0],
           [0, 0, 0, 0, 0, 0, 0]
       ];
       const maze = new Maze(8);
       maze.blocks = blocks;
       const state = new MazeState(1, 3, maze);
       const children = new MazeNode(state).expand();
       const up = children.find(child => child.state.x === 1 && child.state.y === 2);
       const upChildren = up.expand();
       expect(upChildren.length).toBe(2);
       const upUp = upChildren.find(child => child.state.x === 1 && child.state.y === 1);
       expect(upUp).toBeDefined();
       const upDown = upChildren.find(child => child.state.x === 1 && child.state.y === 3);
       expect(upDown).toBeDefined();
   });
});