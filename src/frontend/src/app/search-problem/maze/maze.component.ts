import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Maze} from '../../../../../problems/maze-problem/maze';
import {MazeBlock} from '../../../../../problems/maze-problem/maze-block';
import {MazeProblem} from '../../../../../problems/maze-problem/maze-problem';
import {MazeState} from '../../../../../problems/maze-problem/maze-state';
import {SearchAgent} from "../../../../../tree-search/search-agent";
import {SearchProblem} from "../../../../../problems/search-problem";

@Component({
  selector: 'app-maze',
  imports: [NgFor, NgIf],
  templateUrl: './maze.component.html',
  styleUrl: './maze.component.scss'
})
export class MazeComponent implements AfterViewInit, OnChanges {
  @Input() selectedAlgorithm!: SearchAgent<any, any>;
  @Input() selectedProblem!: SearchProblem<any, any>;

  width = innerWidth / 2.1;
  height = innerHeight / 1.2;

  squares: { x: number, y: number, color: string }[] = [];

  showGrid = true;

  gridLines;

  ngAfterViewInit() {

    if(this.selectedProblem instanceof MazeProblem) {
      this.squares = [];

      this.gridLines = this.generateGridLines();

      for(let i = 0; i < this.selectedProblem.initialState.maze.size; i++) {
        for(let j = 0; j < this.selectedProblem.initialState.maze.size; j++) {
          if(this.selectedProblem.initialState.maze.blocks[j][i] === MazeBlock.Barrier) {
            this.squares.push({x: i, y: j, color: '#000000'});
          }
        }
      }

      let state = this.selectedAlgorithm.startStepSearch(this.selectedProblem);
      while(!state.solution) {
        state = this.selectedAlgorithm.searchStep();
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

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedProblem instanceof MazeProblem) {
      this.squares = [];

      this.gridLines = this.generateGridLines();
      if(this.selectedProblem instanceof MazeProblem) {
        for(let i = 0; i < this.selectedProblem.initialState.maze.size; i++) {
          for(let j = 0; j < this.selectedProblem.initialState.maze.size; j++) {
            if(this.selectedProblem.initialState.maze.blocks[j][i] === MazeBlock.Barrier) {
              this.squares.push({x: i, y: j, color: '#000000'});
            }
          }
        }
      }

      let state = this.selectedAlgorithm.startStepSearch(this.selectedProblem);
      while(!state.solution) {
        state = this.selectedAlgorithm.searchStep();
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


  }

  generateVisualization() {

  }
}
