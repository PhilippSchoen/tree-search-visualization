import {AfterViewInit, Component} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Maze} from '../../../../../problems/maze-problem/maze';
import {MazeBlock} from '../../../../../problems/maze-problem/maze-block';
import {MazeProblem} from '../../../../../problems/maze-problem/maze-problem';
import {MazeState} from '../../../../../problems/maze-problem/maze-state';
import {BreadthFirstSearch} from '../../../../../tree-search/breadth-first-search/breadth-first-search';
import {DepthFirstSearch} from '../../../../../tree-search/depth-first-search/depth-first-search';
import {BidirectionalSearch} from '../../../../../tree-search/bidirectional-search/bidirectional-search';
import {UniformCostSearch} from '../../../../../tree-search/uniform-cost-search/uniform-cost-search';

@Component({
  selector: 'app-maze',
  imports: [NgFor, NgIf],
  templateUrl: './maze.component.html',
  styleUrl: './maze.component.scss'
})
export class MazeComponent implements AfterViewInit {
  width = innerWidth / 2.1;
  height = innerHeight / 1.2;

  squares: { x: number, y: number, color: string }[] = [];

  showGrid = true;

  gridLines;

  ngAfterViewInit() {
    this.gridLines = this.generateGridLines();
    const maze = new Maze(61);
    for(let i = 0; i < maze.size; i++) {
      for(let j = 0; j < maze.size; j++) {
        if(maze.blocks[j][i] === MazeBlock.Barrier) {
          this.squares.push({x: i, y: j, color: '#000000'});
        }
      }
    }

    const problem = new MazeProblem(new MazeState(1, 1, maze));
    const agent = new UniformCostSearch();
    let state = agent.startStepSearch(problem);
    while(!state.solution) {
      state = agent.searchStep();
    }

    for(let position of state.explored) {
      this.squares.push({x: (position as MazeState).x, y: (position as MazeState).y, color: '#00FF00'});
    }
    for(let node of state.frontier) {
      this.squares.push({x: (node.state as MazeState).x, y: (node.state as MazeState).y, color: '#0000FF'});
    }
    let solution = state.solution;
    while(solution) {
      this.squares.push({x: (solution.state as MazeState).x, y: (solution.state as MazeState).y, color: '#FF0000'});
      solution = solution.parent;
    }
  }

  generateGridLines() {
    const lines: { x1: number, y1: number, x2: number, y2: number }[] = [];
    const step = 25; // Distance between grid lines

    for (let x = 0; x <= this.width; x += step) {
      lines.push({ x1: x, y1: 0, x2: x, y2: this.height });
    }
    for (let y = 0; y <= this.height; y += step) {
      lines.push({ x1: 0, y1: y, x2: this.width, y2: y });
    }
    return lines;
  }

  generateVisualization() {

  }
}
