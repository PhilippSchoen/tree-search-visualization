import {Component, OnInit} from '@angular/core';
import {SearchProblemComponent} from './search-problem/search-problem.component';
import {SearchTreeComponent} from './search-tree/search-tree.component';

@Component({
  selector: 'app-root',
  imports: [SearchProblemComponent, SearchTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  selectedProblem: string;
  selectedAlgorithm: string;

  ngOnInit() {
  }

  onAlgorithmChange(newAlgorithm: string) {
    this.selectedAlgorithm = newAlgorithm;
  }

  onProblemChange(newProblem: string) {
    this.selectedProblem = newProblem;
  }
}
