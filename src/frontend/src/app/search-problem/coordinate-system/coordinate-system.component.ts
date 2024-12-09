import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Position} from '../../../../../problems/pathfinding-problem/position';
import {DepthLimitedSearch} from '../../../../../tree-search/depth-limited-search/depth-limited-search';
import {PathfindingProblem} from '../../../../../problems/pathfinding-problem/pathfinding-problem';
import {SearchState} from '../../../../../tree-search/search-state';
import {BreadthFirstSearch} from '../../../../../tree-search/breadth-first-search/breadth-first-search';
import {GreedyBestFirstSearch} from '../../../../../tree-search/greedy-best-first-search/greedy-best-first-search';
import {SearchAgent} from '../../../../../tree-search/search-agent';
import {AStarSearch} from '../../../../../tree-search/a-star-search/a-star-search';
import {UniformCostSearch} from '../../../../../tree-search/uniform-cost-search/uniform-cost-search';
import {DepthFirstSearch} from '../../../../../tree-search/depth-first-search/depth-first-search';
import {BidirectionalSearch} from '../../../../../tree-search/bidirectional-search/bidirectional-search';

@Component({
  selector: 'app-coordinate-system',
  imports: [NgFor, NgIf],
  templateUrl: './coordinate-system.component.html',
  styleUrl: './coordinate-system.component.scss'
})
export class CoordinateSystemComponent implements OnInit, OnChanges {
  @Input() selectedAlgorithm!: string;

  width = innerWidth / 2.1;
  height = innerHeight / 1.2;

  showGrid = true; // Toggle to show/hide grid
  xCenter = this.width / 2;
  yCenter = this.height / 2;

  gridLines = this.generateGridLines();

  agent: SearchAgent<any, any>;

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
    // {position: new Position(0, 0), color: '#ff0000'},
    // {position: new Position(0, 1), color: '#ff0000'},
    // {position: new Position(0, 2), color: '#ff0000'},
    // {position: new Position(1, 0), color: '#00ff00'},
    // {position: new Position(2, 0), color: '#0000ff'},
    // {position: new Position(0, -1), color: '#00ff00'},
    // {position: new Position(-1, 0), color: '#00ff00'},
  ];

  ngOnInit(): void {
    switch(this.selectedAlgorithm) {
      case 'Depth-Limited-Search':
        this.agent = new DepthLimitedSearch(10);
        break;
      case 'Breadth-First-Search':
        this.agent = new BreadthFirstSearch();
        break;
      case 'Greedy-Best-First-Search':
        this.agent = new GreedyBestFirstSearch();
        break;
      default:
        this.agent = new BreadthFirstSearch();
    }

    const problem = new PathfindingProblem(new Position(0, 0), new Position(4, 4));
    let state = this.agent.startStepSearch(problem);
    while(!state.solution) {
      state = this.agent.searchStep();
      this.generateVisualization(state);
    }
    let node = state.solution;
    while(node) {
      this.squares.push({position: node.state as Position, color: '#FF0000'});
      node = node.parent;
    }
  }

  counter = 0;

  ngOnChanges(changes:SimpleChanges) {
    if(changes['selectedAlgorithm']) {

      switch(this.selectedAlgorithm) {
        case 'Depth-Limited-Search':
          this.agent = new DepthLimitedSearch(10);
          break;
        case 'Breadth-First-Search':
          this.agent = new BreadthFirstSearch();
          break;
        case 'Greedy-Best-First-Search':
          this.agent = new GreedyBestFirstSearch();
          break;
        case 'A-Star-Search':
          this.agent = new AStarSearch();
          break;
        case 'Uniform-Cost-Search':
          this.agent = new UniformCostSearch();
          break;
        case 'Depth-First-Search':
          this.agent = new DepthFirstSearch();
          break;
        case 'Bidirectional-Search':
          this.agent = new BidirectionalSearch();
          break;
        default:
          this.agent = new BreadthFirstSearch();
      }

      this.squares = [];

      const problem = new PathfindingProblem(new Position(0, 0), new Position(4, 4));
      let state = this.agent.startStepSearch(problem);
      while(!state.solution) {
        state = this.agent.searchStep();
        this.generateVisualization(state);
      }
      let node = state.solution;
      while(node) {
        this.squares.push({position: node.state as Position, color: '#FF0000'});
        node = node.parent;
      }
    }



  }
}
