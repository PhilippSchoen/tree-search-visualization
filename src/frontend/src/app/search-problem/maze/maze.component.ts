import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgFor} from '@angular/common';
import {MazeBlock} from '../../../../../problems/maze-problem/maze-block';
import {MazeProblem} from '../../../../../problems/maze-problem/maze-problem';
import {MazeState} from '../../../../../problems/maze-problem/maze-state';
import {SearchAgent} from "../../../../../tree-search/search-agent";
import {SearchProblem} from "../../../../../problems/search-problem";
import {Node} from "../../../../../tree-search/node";
import {SearchState} from "../../../../../tree-search/search-state";
import {Observable, Subscription} from "rxjs";
import {Position} from "../../../../../problems/pathfinding-problem/position";

@Component({
  selector: 'app-maze',
  imports: [NgFor],
  templateUrl: './maze.component.html',
  styleUrl: './maze.component.scss'
})
export class MazeComponent {
  @Input() selectedProblem!: SearchProblem<any, any>;

  @Input() set searchState(obs: Observable<SearchState<any>>) {
    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchSubscription = obs.subscribe({
      next: (state) => {
        console.log("Rendering pathfinding... ", state);
        this.generateVisualization(state);
      },
      complete: () => {
        console.log("Search ended pathfinding");
      },
    });
  }

  private searchSubscription: Subscription;

  width = innerWidth / 2.1;
  height = innerHeight / 1.2;

  squares: { x: number, y: number, color: string }[] = [];
  gridLines = this.generateGridLines();

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

  generateVisualization(state: SearchState<any>) {
    this.squares = [];

    if(state) {
      this.renderWalls();

      for(let position of state.explored) {
          this.squares.push({x: (position as MazeState).x, y: (position as MazeState).y, color: '#00FF00'});
      }

      for(let node of state.frontier) {
        this.squares.push({x: (node.state as MazeState).x, y: (node.state as MazeState).y, color: '#0000FF'});
      }

      let solution = state.solution;
      const solutionNodes: Node<unknown>[] = [];
      while(solution) {
        solutionNodes.push(solution);
        solution = solution.parent;
      }
      for(let node of solutionNodes) {
        this.squares.push({x: (node.state as MazeState).x, y: (node.state as MazeState).y, color: '#FF0000'});
      }
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
}


