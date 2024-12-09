import { Component } from '@angular/core';
import {NgFor} from "@angular/common";
import {CoordinateSystemComponent} from './coordinate-system/coordinate-system.component';

@Component({
  selector: 'app-search-problem',
  imports: [NgFor, CoordinateSystemComponent],
  templateUrl: './search-problem.component.html',
  styleUrl: './search-problem.component.scss'
})
export class SearchProblemComponent {
  searchProblems: string[] = ['Pathfinding', 'Flight-Route', 'Eight-Puzzle', 'Maze'];
}
