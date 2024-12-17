import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Position} from '../../../../../problems/pathfinding-problem/position';
import {PathfindingProblem} from '../../../../../problems/pathfinding-problem/pathfinding-problem';
import {SearchState} from '../../../../../tree-search/search-state';
import {SearchAgent} from '../../../../../tree-search/search-agent';
import {SearchProblem} from "../../../../../problems/search-problem";
import {Node} from "../../../../../tree-search/node";
import {Observable, Subscription} from 'rxjs';
import {colors} from '../../../shared/colors';
import {FormsModule, NgModel} from '@angular/forms';

@Component({
  selector: 'app-coordinate-system',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './coordinate-system.component.html',
  styleUrl: './coordinate-system.component.scss'
})
export class CoordinateSystemComponent {
  @Input() selectedProblem!: SearchProblem<any, any>;

  @Input() set searchState(obs: Observable<SearchState<any>>) {
    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchSubscription = obs.subscribe({
        next: (state) => {
            this.generateVisualization(state);
        },
        complete: () => {
          console.log("Search ended");
        },
    });
  }

  @Output() problemChange = new EventEmitter<SearchProblem<any, any>>();

  private searchSubscription: Subscription;

  width = innerWidth / 2.1;
  height = innerHeight / 1.2;

  showGrid = true; // Toggle to show/hide grid
  xCenter = this.width / 2;
  yCenter = this.height / 2;

  gridLines = this.generateGridLines();
  squares: {position: Position, color: string}[] = [];

  goalX: number = 0; // Initial goal row position
  goalY: number = 0; // Initial goal column position

  updateProblem() {
    this.selectedProblem = new PathfindingProblem(new Position(0, 0), new Position(this.goalX, this.goalY));
    this.problemChange.emit(this.selectedProblem);
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

  generateVisualization(state: SearchState<any>) {
    if(state) {
      this.squares = [];
      for(let position of state.explored) {
        this.squares.push({position, color: colors.explored});
      }
      for(let node of state.frontier) {
        this.squares.push({position: node.state as Position, color: colors.frontier});
      }

      let solution = state.solution;
        const solutionNodes: Node<unknown>[] = [];
        while(solution) {
            solutionNodes.push(solution);
            solution = solution.parent;
        }
        for(let node of solutionNodes) {
          this.squares.push({position: node.state as Position, color: colors.solution});
        }
    }
  }
}
