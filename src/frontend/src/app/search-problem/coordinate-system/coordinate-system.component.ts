import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Position} from '../../../../../problems/pathfinding-problem/position';
import {PathfindingProblem} from '../../../../../problems/pathfinding-problem/pathfinding-problem';
import {SearchState} from '../../../../../tree-search/search-state';
import {SearchAgent} from '../../../../../tree-search/search-agent';
import {SearchProblem} from "../../../../../problems/search-problem";

@Component({
  selector: 'app-coordinate-system',
  imports: [NgFor, NgIf],
  templateUrl: './coordinate-system.component.html',
  styleUrl: './coordinate-system.component.scss'
})
export class CoordinateSystemComponent implements OnChanges {
  @Input() selectedAlgorithm!: SearchAgent<any, any>;
  @Input() selectedProblem!: SearchProblem<any, any>;

  width = innerWidth / 2.1;
  height = innerHeight / 1.2;

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
  }

  generateVisualization(state: SearchState<any>) {
    for(let position of state.explored) {
      this.squares.push({position, color: '#00FF00'});
    }

    for(let node of state.frontier) {
      this.squares.push({position: node.state as Position, color: '#0000FF'});
    }
  }

  squares: {position: Position, color: string}[] = [
  ];

  counter = 0;

  ngOnChanges(changes:SimpleChanges) {
      this.squares = [];

      let state = this.selectedAlgorithm.startStepSearch(this.selectedProblem);
      while(!state.solution) {
        state = this.selectedAlgorithm.searchStep();
        this.generateVisualization(state);
      }
      let node = state.solution;
      while(node) {
        this.squares.push({position: node.state as Position, color: '#FF0000'});
        node = node.parent;
      }

  }
}
