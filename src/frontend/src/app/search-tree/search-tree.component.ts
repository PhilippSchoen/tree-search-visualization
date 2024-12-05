import { Component } from '@angular/core';
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-search-tree',
  imports: [NgFor],
  templateUrl: './search-tree.component.html',
  styleUrl: './search-tree.component.scss'
})
export class SearchTreeComponent {
  searchAlgorithms: string[] = [
      'Breadth-First-Search', 'Depth-First-Search', 'Depth-Limited-Search', 'Uniform-Cost-Search', 'Bidirectional-Search', 'Greedy-Best-First-Search', 'A-Star-Search'
  ];
}
