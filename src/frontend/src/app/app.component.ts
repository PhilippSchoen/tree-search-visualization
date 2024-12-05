import {Component, OnInit} from '@angular/core';
import {AStarSearch} from '../../../tree-search/a-star-search/a-star-search';
import {PathfindingProblem} from '../../../problems/pathfinding-problem/pathfinding-problem';
import {Position} from '../../../problems/pathfinding-problem/position';
import {SearchProblemComponent} from './search-problem/search-problem.component';
import {SearchTreeComponent} from './search-tree/search-tree.component';

@Component({
  selector: 'app-root',
  imports: [SearchProblemComponent, SearchTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const aStarSearch = new AStarSearch();
    const problem = new PathfindingProblem(new Position(0, 0), new Position(3, 3));
    const solution = aStarSearch.search(problem);
    solution.printSolution();
  }
}
