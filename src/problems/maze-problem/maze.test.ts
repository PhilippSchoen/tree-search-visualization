import {Maze} from "./maze";
import {MazeBlock} from "./maze-block";
import {MazeProblem} from "./maze-problem";
import {MazeState} from "./maze-state";

describe('Maze', () => {
    test('Maze is generated when constructing', () => {
        const maze = new Maze();
        expect(maze.blocks).toBeDefined();
    });

    test('Maze has the correct size', () => {
       const maze = new Maze(11);
       expect(maze.blocks.length).toBe(11);
       expect(maze.blocks[0].length).toBe(11);

       const maze3 = new Maze();
       expect(maze3.blocks.length).toBe(21);
       expect(maze3.blocks[0].length).toBe(21);
    });

    test('Generated maze should be solvable', () => {
        const maze = new Maze(11);

        expect(isMazeSolvable(maze.blocks)).toBe(true);
        const maze2 = new Maze(5);

        expect(isMazeSolvable(maze2.blocks)).toBe(true);
    });

    test('Faulty maze size is corrected properly', () => {
        const maze = new Maze(10);
        expect(maze.blocks.length).toBe(11);
        expect(maze.blocks[0].length).toBe(11);
        const maze2 = new Maze(4);
        expect(maze2.blocks.length).toBe(5);
        expect(maze2.blocks[0].length).toBe(5);
    });

    test('Tree search should find a solution', () => {
        const maze = new Maze(5);
       const problem = new MazeProblem(new MazeState(1, 1, new Maze(5)));
    });
});

function isMazeSolvable(maze: MazeBlock[][]): boolean {
    const height = maze.length;
    const width = maze[0].length;

    // Find the start position
    let startX = -1, startY = -1;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (maze[y][x] === MazeBlock.Start) {
                startX = x;
                startY = y;
                break;
            }
        }
        if (startX !== -1) break;
    }

    // Use a matrix to track visited cells
    const visited = Array.from({ length: height }, () => Array(width).fill(false));

    // Define the DFS function
    function dfs(x: number, y: number): boolean {
        if (x < 0 || x >= width || y < 0 || y >= height) {
            return false; // Out of bounds
        }

        if (visited[y][x] || maze[y][x] === MazeBlock.Barrier) {
            return false; // Already visited or wall
        }

        if (maze[y][x] === MazeBlock.Goal) {
            return true; // Reached the goal
        }

        // Mark this cell as visited
        visited[y][x] = true;

        // Explore adjacent cells using DFS (up, right, down, left)
        return dfs(x, y - 1) ||
            dfs(x + 1, y) ||
            dfs(x, y + 1) ||
            dfs(x - 1, y);
    }

    // Start DFS from the start position
    return startX !== -1 && startY !== -1 && dfs(startX, startY);
}

