import {Component, OnInit} from '@angular/core';
import {SearchProblemComponent} from './search-problem/search-problem.component';
import {SearchTreeComponent} from './search-tree/search-tree.component';
import {SearchAgent} from '../../../tree-search/search-agent';
import {AStarSearch} from '../../../tree-search/a-star-search/a-star-search';
import {BreadthFirstSearch} from '../../../tree-search/breadth-first-search/breadth-first-search';

@Component({
  selector: 'app-root',
  imports: [SearchProblemComponent, SearchTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  selectedProblem: string;
  selectedAlgorithm: SearchAgent<any, any>;

  constructor() {
    this.selectedAlgorithm = new BreadthFirstSearch();
  }

  ngOnInit() {
  }

  onAlgorithmChange(newAlgorithm: SearchAgent<any, any>) {
    this.selectedAlgorithm = newAlgorithm;
  }

  onProblemChange(newProblem: string) {
    this.selectedProblem = newProblem;
  }
}
