import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchProblemComponent} from './search-problem/search-problem.component';
import {SearchTreeComponent} from './search-tree/search-tree.component';
import {SearchAgent} from '../../../tree-search/search-agent';
import {BreadthFirstSearch} from '../../../tree-search/breadth-first-search/breadth-first-search';
import {SearchProblem} from "../../../problems/search-problem";
import {PathfindingProblem} from "../../../problems/pathfinding-problem/pathfinding-problem";
import {Position} from "../../../problems/pathfinding-problem/position";
import {SearchState} from "../../../tree-search/search-state";
import * as _ from "lodash";
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [SearchProblemComponent, SearchTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  selectedProblem: SearchProblem<any, any>;
  selectedAlgorithm: SearchAgent<any, any>;

  searchQueue: SearchState<any>[] = [];

  searchStateSubject = new Subject<SearchState<any>>();
  searchState = this.searchStateSubject.asObservable();

  constructor() {
    this.selectedAlgorithm = new BreadthFirstSearch();
    this.selectedProblem = new PathfindingProblem(new Position(0, 0), new Position(8, 8));
  }

  ngOnInit() {
    this.search();
  }

  ngOnDestroy() {
    this.searchStateSubject.complete();
  }

  onAlgorithmChange(newAlgorithm: SearchAgent<any, any>) {
    this.selectedAlgorithm = newAlgorithm;
    this.search();
  }

  onProblemChange(newProblem: SearchProblem<any, any>) {
    this.selectedProblem = newProblem;
    this.search();
  }

  search() {
    this.searchStateSubject = new Subject<SearchState<any>>();
    this.searchState = this.searchStateSubject.asObservable();
    this.performSearch();
  }

  private performSearch() {
    setTimeout(() => {
      let state = this.selectedAlgorithm.startStepSearch(this.selectedProblem);
      this.searchStateSubject.next(_.cloneDeep(state));
      while (!state.solution) {
        state = this.selectedAlgorithm.searchStep();
        console.log("Sending data: ", state);
        this.searchStateSubject.next(_.cloneDeep(state));
      }
      this.searchStateSubject.complete();
    }, 0);
  }

}
