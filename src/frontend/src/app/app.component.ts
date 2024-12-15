import {Component, OnInit} from '@angular/core';
import {SearchProblemComponent} from './search-problem/search-problem.component';
import {SearchTreeComponent} from './search-tree/search-tree.component';
import {SearchAgent} from '../../../tree-search/search-agent';
import {AStarSearch} from '../../../tree-search/a-star-search/a-star-search';
import {BreadthFirstSearch} from '../../../tree-search/breadth-first-search/breadth-first-search';
import {SearchProblem} from "../../../problems/search-problem";
import {PathfindingProblem} from "../../../problems/pathfinding-problem/pathfinding-problem";
import {Position} from "../../../problems/pathfinding-problem/position";
import {SearchState} from "../../../tree-search/search-state";
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  imports: [SearchProblemComponent, SearchTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  selectedProblem: SearchProblem<any, any>;
  selectedAlgorithm: SearchAgent<any, any>;

  searchQueue: SearchState<any>[] = [];

  constructor() {
    this.selectedAlgorithm = new BreadthFirstSearch();
    this.selectedProblem = new PathfindingProblem(new Position(0, 0), new Position(4, 4));
  }

  ngOnInit() {
    this.search();
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
    let state = this.selectedAlgorithm.startStepSearch(this.selectedProblem);
    this.searchQueue.push(_.cloneDeep(state))
    while(!state.solution) {
      state = this.selectedAlgorithm.searchStep();
      this.searchQueue.push(_.cloneDeep(state));
    }
  }
}
