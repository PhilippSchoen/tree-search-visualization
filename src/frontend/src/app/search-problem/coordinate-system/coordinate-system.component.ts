import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Position} from '../../../../../problems/pathfinding-problem/position';
import {PathfindingProblem} from '../../../../../problems/pathfinding-problem/pathfinding-problem';
import {SearchState} from '../../../../../tree-search/search-state';
import {SearchAgent} from '../../../../../tree-search/search-agent';
import {SearchProblem} from "../../../../../problems/search-problem";
import {Node} from "../../../../../tree-search/node";
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-coordinate-system',
  imports: [NgFor, NgIf],
  templateUrl: './coordinate-system.component.html',
  styleUrl: './coordinate-system.component.scss'
})
export class CoordinateSystemComponent implements OnChanges {
  @Input() selectedAlgorithm!: SearchAgent<any, any>;
  @Input() selectedProblem!: SearchProblem<any, any>;
  @Input() searchQueue!: SearchState<any>[];

  @Input() set searchState(obs: Observable<SearchState<any>>) {
    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchSubscription = obs.subscribe((state) => {
      console.log("Rendering... ", state);
    });
  }

  private searchSubscription: Subscription;

  width = innerWidth / 2.1;
  height = innerHeight / 1.2;

  showGrid = true; // Toggle to show/hide grid
  xCenter = this.width / 2;
  yCenter = this.height / 2;

  gridLines = this.generateGridLines();
  squares: {position: Position, color: string}[] = [];

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

  generateVisualization() {
    const state = this.searchQueue?.shift();

    if(state) {
      this.squares = [];
      for(let position of state.explored) {
        this.squares.push({position, color: '#00FF00'});
      }

      this.drawFrontierAsync(state.frontier).then(() => {
        let solution = state.solution;
        const solutionNodes: Node<unknown>[] = [];
        while(solution) {
            solutionNodes.push(solution);
            solution = solution.parent;
        }
        if(solutionNodes.length > 0) {
          this.drawSolutionAsync(solutionNodes.reverse()).then(() => {
            if(this.searchQueue.length > 0) {
              this.generateVisualization();
            }
          });
        } else {
            if(this.searchQueue.length > 0) {
                this.generateVisualization();
            }
        }
      });

    }
  }

  private async drawFrontierAsync(nodes: Node<unknown>[]) {
    const node = nodes.shift();
    this.squares.push({position: node.state as Position, color: '#0000FF'});

    if(nodes.length > 0) {
      await this.drawFrontierAsync(nodes);
    }
  }

  private async drawSolutionAsync(nodes: Node<unknown>[]) {
    const node = nodes.shift();
    this.squares.push({position: node.state as Position, color: '#FF0000'});
    await this.sleep(50);

    if(nodes.length > 0) {
      await this.drawSolutionAsync(nodes);
    }
  }

  ngOnChanges(changes:SimpleChanges) {
    if(this.selectedProblem instanceof PathfindingProblem) {
      this.generateVisualization();
    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
