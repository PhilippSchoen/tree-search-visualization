import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgFor} from "@angular/common";
import {CoordinateSystemComponent} from './coordinate-system/coordinate-system.component';
import {BreadthFirstSearch} from '../../../../tree-search/breadth-first-search/breadth-first-search';
import {AStarSearch} from '../../../../tree-search/a-star-search/a-star-search';
import {UniformCostSearch} from '../../../../tree-search/uniform-cost-search/uniform-cost-search';
import {GreedyBestFirstSearch} from '../../../../tree-search/greedy-best-first-search/greedy-best-first-search';
import {DepthLimitedSearch} from '../../../../tree-search/depth-limited-search/depth-limited-search';
import {DepthFirstSearch} from '../../../../tree-search/depth-first-search/depth-first-search';
import {BidirectionalSearch} from '../../../../tree-search/bidirectional-search/bidirectional-search';
import {PathfindingProblem} from '../../../../problems/pathfinding-problem/pathfinding-problem';
import {Position} from '../../../../problems/pathfinding-problem/position';

@Component({
  selector: 'app-search-problem',
  imports: [NgFor, CoordinateSystemComponent],
  templateUrl: './search-problem.component.html',
  styleUrl: './search-problem.component.scss'
})
export class SearchProblemComponent implements AfterViewInit {
  @ViewChild('problemTab', {static: false}) problemTab: ElementRef;
  @Input() selectedAlgorithm!: string;
  @Input() selectedProblem!: string;
  @Output() problemChange = new EventEmitter<string>();

  searchProblems: string[] = ['Pathfinding', 'Flight-Route', 'Eight-Puzzle', 'Maze'];

  ngAfterViewInit() {
    const tabButtons = this.problemTab.nativeElement.querySelectorAll('button');

    tabButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        this.handleTabChange(event);
      });
    });
  }

  handleTabChange(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const selectedTabId = target.getAttribute('aria-controls');

    switch(selectedTabId) {
      case 'Pathfinding':
        this.problemChange.emit('Pathfinding');
        break;
      case 'Flight-Route':
        this.problemChange.emit('Flight-Route');
        break;
      case 'Eight-Puzzle':
        this.problemChange.emit('Eight-Puzzle');
        break;
      case 'Maze':
        this.problemChange.emit('Maze');
        break;
    }

  }
}
