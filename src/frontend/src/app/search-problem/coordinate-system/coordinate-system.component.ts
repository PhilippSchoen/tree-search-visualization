import { Component } from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Position} from '../../../../../problems/pathfinding-problem/position';
import {DepthLimitedSearch} from '../../../../../tree-search/depth-limited-search/depth-limited-search';
import {PathfindingProblem} from '../../../../../problems/pathfinding-problem/pathfinding-problem';
import {SearchState} from '../../../../../tree-search/search-state';
import {BreadthFirstSearch} from '../../../../../tree-search/breadth-first-search/breadth-first-search';

@Component({
  selector: 'app-coordinate-system',
  imports: [NgFor, NgIf],
  templateUrl: './coordinate-system.component.html',
  styleUrl: './coordinate-system.component.scss'
})
export class CoordinateSystemComponent {
  width = 500;
  height = 500;

  showGrid = true; // Toggle to show/hide grid
  xCenter = this.width / 2;
  yCenter = this.height / 2;

  gridLines = this.generateGridLines();

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

  constructor() {
    const agent = new BreadthFirstSearch();
    const problem = new PathfindingProblem(new Position(0, 0), new Position(3, 3));
    let state = agent.startStepSearch(problem);
    while(!state.solution) {
      state = agent.searchStep();
      this.generateVisualization(state);
    }
    let node = state.solution;
    while(node) {
      this.squares.push({position: node.state as Position, color: '#FF0000'});
      node = node.parent;
    }
  }

  frontier: Position[] = [];
  explored: Position[] = [];

  generateVisualization(state: SearchState<any>) {
    this.explored = [];
    this.frontier = [];
    this.explored.push(...state.explored.map(node => node.state as Position));
    this.frontier.push(...state.frontier.map(node => node.state as Position));



    for(let position of state.explored) {
      this.squares.push({position, color: '#00FF00'});
    }

    for(let node of state.frontier) {
      this.squares.push({position: node.state as Position, color: '#0000FF'});

    }
  }

  squares: {position: Position, color: string}[] = [
    // {position: new Position(0, 0), color: '#ff0000'},
    // {position: new Position(0, 1), color: '#ff0000'},
    // {position: new Position(0, 2), color: '#ff0000'},
    // {position: new Position(1, 0), color: '#00ff00'},
    // {position: new Position(2, 0), color: '#0000ff'},
    // {position: new Position(0, -1), color: '#00ff00'},
    // {position: new Position(-1, 0), color: '#00ff00'},
  ];
}
