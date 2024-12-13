import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";
import {CoordinateSystemComponent} from './coordinate-system/coordinate-system.component';
import {SearchAgent} from '../../../../tree-search/search-agent';
import {MazeComponent} from './maze/maze.component';

@Component({
  selector: 'app-search-problem',
  imports: [NgFor, NgIf, CoordinateSystemComponent, MazeComponent],
  templateUrl: './search-problem.component.html',
  styleUrl: './search-problem.component.scss'
})
export class SearchProblemComponent implements AfterViewInit {
  @ViewChild('problemTab', {static: false}) problemTab: ElementRef;
  @Input() selectedAlgorithm!: SearchAgent<any, any>;
  @Input() selectedProblem!: string;
  @Output() problemChange = new EventEmitter<string>();

  searchProblems: string[] = ['Pathfinding', 'Maze'];

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
      case 'Maze':
        this.problemChange.emit('Maze');
        break;
    }

  }
}
