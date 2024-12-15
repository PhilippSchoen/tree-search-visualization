import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MazeBlock} from '../../../../../problems/maze-problem/maze-block';
import {MazeProblem} from '../../../../../problems/maze-problem/maze-problem';
import {MazeState} from '../../../../../problems/maze-problem/maze-state';
import {SearchAgent} from "../../../../../tree-search/search-agent";
import {SearchProblem} from "../../../../../problems/search-problem";
import {Node} from "../../../../../tree-search/node";
import {SearchState} from "../../../../../tree-search/search-state";
import * as _ from "lodash";

@Component({
  selector: 'app-maze',
  imports: [NgFor],
  templateUrl: './maze.component.html',
  styleUrl: './maze.component.scss'
})
export class MazeComponent implements OnChanges {
  @Input() selectedAlgorithm!: SearchAgent<any, any>;
  @Input() selectedProblem!: SearchProblem<any, any>;

  width = innerWidth / 2.1;
  height = innerHeight / 1.2;

  squares: { x: number, y: number, color: string }[] = [];
  gridLines = this.generateGridLines();

  stateQueue: SearchState<MazeState>[] = [];

  private generateGridLines() {
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

      let state = this.selectedAlgorithm.startStepSearch(this.selectedProblem);
      this.stateQueue.push(state);
      this.generateVisualization();
      while(!state.solution) {
        console.log("Continuing search");
        state = this.selectedAlgorithm.searchStep();
        this.stateQueue.push(_.cloneDeep(state));
      }
    }
  }

  // TODO: Switch to Observables for cancellation
  generateVisualization() {
    this.squares = [];
    const state = this.stateQueue.shift();

    if(state) {
      this.renderWalls();

      for(let position of state.explored) {
          this.squares.push({x: (position as MazeState).x, y: (position as MazeState).y, color: '#00FF00'});
      }

      this.drawFrontierAsync(state.frontier).then(() => {

        let solution = state.solution;
        const solutionNodes: Node<unknown>[] = [];
        while(solution) {
          solutionNodes.push(solution);
          solution = solution.parent;
        }
        this.drawSolutionAsync(solutionNodes.reverse()).then(() => {
          if(this.stateQueue.length > 0) {
            this.generateVisualization();
          }
        });
      });
    }
  }

  private renderWalls() {
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
  }

  private async drawFrontierAsync(nodes: Node<unknown>[]) {
    await this.sleep(1);
    const node = nodes.shift();
    this.squares.push({x: (node.state as MazeState).x, y: (node.state as MazeState).y, color: '#0000FF'});
    await this.sleep(50);

    if(nodes.length > 0) {
      await this.drawFrontierAsync(nodes);
    }
  }

  private async drawSolutionAsync(solution: Node<unknown>[]) {
    if(solution.length > 0) {
      const node = solution.shift();
      this.squares.push({x: (node.state as MazeState).x, y: (node.state as MazeState).y, color: '#FF0000'});
      await this.sleep(50);
      if(solution.length > 0) {
        await this.drawSolutionAsync(solution);
      }
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}


