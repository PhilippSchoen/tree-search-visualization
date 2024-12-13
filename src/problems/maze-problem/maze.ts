import {MazeBlock} from "./maze-block";

export class Maze {

    constructor(public size: number = 21) {
        this.blocks = this.generateMaze(size, size);
    }

    blocks: MazeBlock[][];

    generateMaze(width: number, height: number): MazeBlock[][] {

        // Ensure dimensions are odd for proper generation
        width = (width % 2 === 0) ? width + 1 : width;
        height = (height % 2 === 0) ? height + 1 : height;

        // Ensure maze is at least 5x5
        width = Math.max(width, 5);
        height = Math.max(height, 5);

        const maze: MazeBlock[][] = Array.from({ length: height }, () => Array(width).fill(MazeBlock.Barrier));

        function carvePassages(x: number, y: number): void {
            // Define movement directions
            const directions = [
                [0, -2], // North
                [2, 0],  // East
                [0, 2],  // South
                [-2, 0]  // West
            ];

            // Shuffle directions to randomize the path
            for (let i = directions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [directions[i], directions[j]] = [directions[j], directions[i]];
            }

            directions.forEach(([dx, dy]) => {
                const nx = x + dx;
                const ny = y + dy;

                if (ny > 0 && ny < height && nx > 0 && nx < width && maze[ny][nx] === MazeBlock.Barrier) {
                    maze[y + dy / 2][x + dx / 2] = MazeBlock.Empty;
                    maze[ny][nx] = MazeBlock.Empty;
                    carvePassages(nx, ny);
                }
            });
        }

        // Start carving from (1,1)
        maze[1][1] = MazeBlock.Start;
        carvePassages(1, 1);

        // Mark the goal at the bottom-right corner
        maze[height - 2][width - 2] = MazeBlock.Goal;

        return maze;
    }
}