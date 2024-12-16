import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";
import {CoordinateSystemComponent} from './coordinate-system/coordinate-system.component';
import {SearchAgent} from '../../../../tree-search/search-agent';
import {MazeComponent} from './maze/maze.component';
import {Problem} from "./entities/problem";
import {SearchProblem} from "../../../../problems/search-problem";
import {PathfindingProblem} from "../../../../problems/pathfinding-problem/pathfinding-problem";
import {Position} from "../../../../problems/pathfinding-problem/position";
import {MazeProblem} from "../../../../problems/maze-problem/maze-problem";
import {MazeState} from "../../../../problems/maze-problem/maze-state";
import {SearchState} from "../../../../tree-search/search-state";
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-search-problem',
  imports: [NgFor, NgIf, CoordinateSystemComponent, MazeComponent],
  templateUrl: './search-problem.component.html',
  styleUrl: './search-problem.component.scss'
})
export class SearchProblemComponent implements AfterViewInit, OnDestroy {
  @ViewChild('problemTab', {static: false}) problemTab: ElementRef;
  @Input() selectedAlgorithm!: SearchAgent<any, any>;
  @Input() selectedProblem!: SearchProblem<any, any>;
  @Input() searchQueue!: SearchState<any>[];
  @Output() problemChange = new EventEmitter<SearchProblem<any, any>>();

  @Input() set searchState(obs: Observable<SearchState<any>>) {
    this.searchState$ = obs;
  }

  searchState$: Observable<SearchState<any>>;

  private searchSubscription: Subscription;

  searchProblems: Record<Problem, SearchProblem<any, any>> = {
    [Problem.Pathfinding]: new PathfindingProblem(new Position(0, 0), new Position(4, 4)),
    [Problem.Maze]: new MazeProblem(new MazeState(1, 1)),
  }

  ngAfterViewInit() {
    const tabButtons = this.problemTab.nativeElement.querySelectorAll('button');

    tabButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        this.handleTabChange(event);
      });
    });
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }

  handleTabChange(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const selectedTabId = target.getAttribute('aria-controls');

    this.selectedProblem = this.searchProblems[selectedTabId as Problem];
    this.problemChange.emit(this.selectedProblem);
  }

  get searchProblemValues() {
    return Object.values(Problem);
  }
}
